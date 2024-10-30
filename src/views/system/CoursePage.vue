
<template>
  <v-app class="background-color">
    <NavBar @triggerLogoutModal="openLogoutModal" />

    <v-main>
      <v-container fluid>
        <!-- Course Header -->
        <v-row class="mt-8">
          <v-col cols="12" class="text-center">
            <h1 class="text-white font-weight-black">
              {{ courseDetails?.course_name || '...' }}
            </h1>
          </v-col>
        </v-row>
        <h3 class="text-white text-center">
          {{ courseDetails?.description || '......' }}
        </h3>
      </v-container>

      <!-- Search for Topics -->
      <v-row class="justify-center mb-8 mx-auto">
        <v-col cols="12" sm="8" md="6">
          <v-text-field
            v-model="searchQuery"
            :loading="loading"
            append-inner-icon="mdi-magnify"
            prepend-inner-icon="mdi-lightbulb-on"
            density="comfortable"
            label="Search Topics"
            variant="solo"
            hide-details
            single-line
            elevation="10"
            color="deep-purple-darken-3"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Topics Display (Videos and PDFs) -->
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="6" v-for="topic in filteredTopics" :key="topic.topic_title">
            <v-card class="mb-5" color="#FAEED1" dark elevation="10">
              <v-card-title class="text-center font-weight-black">
                {{ topic.topic_title }}
              </v-card-title>
              <v-card-subtitle class="text-center">{{ topic.description }}</v-card-subtitle>
              <v-card-text>
                <v-btn
                  v-if="topic.video_url"
                  elevation="10"
                  color="#803D3B"
                  block
                  @click="showVideo(topic.video_url)"
                  >Watch Video</v-btn
                >
                <v-btn
                  v-if="topic.pdf_url"
                  elevation="10"
                  color="#803D3B"
                  block
                  @click="showPdf(topic.pdf_url)"
                  >Open PDF</v-btn
                >
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Logout Modal -->
      <LogoutModal ref="logoutModalRef" />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/utils/supabase'
import LogoutModal from '@/components/auth/LogoutModal.vue'
import NavBar from '@/components/layout/NavBar.vue'

const logoutModalRef = ref(null)

// Function to open logout modal
const openLogoutModal = () => {
  logoutModalRef.value?.open()
}

// Define reactive references
const courseDetails = ref(null)
const topics = ref([])
const loading = ref(false)
const searchQuery = ref('')

// Use the route object
const route = useRoute()

// Fetch course data and related topics
onMounted(async () => {
  const courseId = route.params.id
  if (courseId) {
    try {
      loading.value = true

      // Fetch course details
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single()

      if (courseError) throw courseError
      courseDetails.value = courseData

      // Fetch related topics
      const { data: topicsData, error: topicsError } = await supabase
        .from('topics')
        .select('*')
        .eq('course_id', courseId)

      if (topicsError) throw topicsError

      // Fetch related resources
      const { data: resourcesData, error: resourcesError } = await supabase
        .from('resources')
        .select('*')
        .in('topic_id', topicsData.map((topic) => topic.id))

      if (resourcesError) throw resourcesError

      // Combine topics with their resources
      topics.value = topicsData.map((topic) => {
        const topicResources = resourcesData.filter(
          (resource) => resource.topic_id === topic.id
        )
        topic.video_url =
          topicResources.find((resource) => resource.resource_type === 'video')?.url || null
        topic.pdf_url =
          topicResources.find((resource) => resource.resource_type === 'pdf')?.url || null
        return topic
      })
    } catch (error) {
      console.error('Error fetching course data:', error.message)
    } finally {
      loading.value = false
    }
  } else {
    console.error('Course ID is undefined')
  }
})


// Computed property for filtered topics
const filteredTopics = computed(() => {
  return topics.value.filter((topic) =>
    topic.topic_title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Function to open PDF
const showPdf = (pdfUrl) => {
  window.open(pdfUrl, '_blank')
}
</script>


<style scoped>
.background-color {
  background-color: #803d3b;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-card {
  border-radius: 12px;
}
</style>
