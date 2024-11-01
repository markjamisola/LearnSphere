<template>
  <v-app class="background-color description">
    <NavBar @triggerLogoutModal="openLogoutModal" />

    <v-main>
      <v-container fluid>
        <!-- Course Header -->
        <v-row class="mt-5">
          <v-col cols="12" class="text-center">
            <h1 class="text-white font-weight-black">
              {{ courseDetails?.course_name || '...' }}
              <v-btn
                icon
                class="ma-2"
                :color="isStarred ? '#FFD700' : '#FAEED1'"
                @click="toggleStar(courseDetails.id)"
                v-if="courseDetails"
              >
                <v-icon>{{ isStarred ? 'mdi-star-check' : 'mdi-star-plus-outline' }}</v-icon>
              </v-btn>
            </h1>
          </v-col>
        </v-row>
        <h3 class="text-white text-center">
          {{ courseDetails?.description || '......' }}
        </h3>
      </v-container>

      <!-- Search for Topics -->
      <v-row class="justify-center mb-4 mx-auto">
        <v-col cols="12" sm="8" md="6">
          <v-card class="pa-2" elevation="15" color="#803d3b">
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
          </v-card>
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
                <v-row>
                  <v-col cols="6">
                    <v-btn
                      elevation="10"
                      color="#803D3B"
                      block
                      @click="openVideoDialog(topic.topic_title)"
                    >
                      Watch Videos
                    </v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-btn elevation="10" color="#803D3B" block @click="showPdf(topic.pdf_url)">
                      Open PDF
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Video Dialog -->
        <v-dialog
          v-model="dialog"
          max-width="1400px"
          rounded="lg"
          overlay="true"
          class="dialog-with-blur"
        >
          <div class="d-flex justify-start mb-2 description">
            <v-card color="#FAEED1" elevation="10">
              <v-card-title class="headline text-center topic-title">
                <h4>Related Videos for {{ selectedTopic }}</h4>
              </v-card-title>
            </v-card>
          </div>
          <v-card class="mb-2 description" color="#803D3B" elevation="10" rounded="lg">
            <v-card-text color="#803D3B">
              <v-list class="colorist" rounded="lg">
                <v-list-item v-for="video in videos" :key="video.id.videoId" color="#803D3B">
                  <v-list-item-content class="video-content">
                    <div class="text-white mb-2">
                      <v-list-item-title
                        ><h4>{{ video.snippet.title }}</h4></v-list-item-title
                      >
                      <v-list-item-subtitle>{{ video.snippet.description }}</v-list-item-subtitle>
                    </div>
                    <!-- Embedded YouTube video player -->
                    <iframe
                      :src="'https://www.youtube.com/embed/' + video.id.videoId"
                      width="100%"
                      height="315"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
          <div class="d-flex justify-end description">
            <v-card color="#FAEED1" elevation="10">
              <v-btn color="#FAEED1" size="large" @click="dialog = false"><h5>Close</h5></v-btn>
            </v-card>
          </div>
        </v-dialog>
      </v-container>

      <!-- Logout Modal -->
      <LogoutModal ref="logoutModalRef" />

      <!-- Floating Back Button -->
      <v-btn class="back-button" icon @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/utils/supabase'
import LogoutModal from '@/components/auth/LogoutModal.vue'
import NavBar from '@/components/layout/NavBar.vue'

// Modal and star state
const logoutModalRef = ref(null)
const isStarred = ref(false)

// Function to open the logout modal
const openLogoutModal = () => {
  logoutModalRef.value?.open()
}

// Reactive variables
const courseDetails = ref(null)
const topics = ref([])
const loading = ref(false)
const searchQuery = ref('')
const dialog = ref(false)
const videos = ref([])
const selectedTopic = ref('')
const youtubeApiKey = 'AIzaSyBIkYvO2Coqq4wy6UDRvI-xFi3mHmAYOlQ'

// Use Vue Router's route object
const route = useRoute()

// Filtered topics based on the search query
const filteredTopics = computed(() => {
  return topics.value.filter((topic) =>
    topic.topic_title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Fetch course data, related topics, and resources
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

      // Check if course is starred by user
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser()
      if (userError) throw userError

      if (user) {
        const { data: starredData, error: starredError } = await supabase
          .from('starred_courses')
          .select('*')
          .eq('user_id', user.id)
          .eq('course_id', courseId)
        if (starredError) throw starredError

        isStarred.value = starredData.length > 0
      }

      // Fetch topics associated with the course
      const { data: topicsData, error: topicsError } = await supabase
        .from('topics')
        .select('*')
        .eq('course_id', courseId)
      if (topicsError) throw topicsError

      const { data: resourcesData, error: resourcesError } = await supabase
        .from('resources')
        .select('*')
        .in(
          'topic_id',
          topicsData.map((topic) => topic.id)
        )

      if (resourcesError) throw resourcesError

      // Combine topics with their resources
      topics.value = topicsData.map((topic) => {
        const topicResources = resourcesData.filter((resource) => resource.topic_id === topic.id)
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

// Toggle star status for the course
async function toggleStar(courseId) {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser()
  if (userError) {
    console.error('Error fetching user:', userError.message)
    return
  }
  if (!user) {
    console.error('User is not authenticated')
    return
  }
  const userId = user.id

  if (isStarred.value) {
    const { error } = await supabase
      .from('starred_courses')
      .delete()
      .eq('user_id', userId)
      .eq('course_id', courseId)
    if (error) {
      console.error('Error removing starred course:', error.message)
    } else {
      isStarred.value = false
    }
  } else {
    const { error } = await supabase
      .from('starred_courses')
      .insert([{ user_id: userId, course_id: courseId, created_at: new Date().toISOString() }])
    if (error) {
      console.error('Error starring course:', error.message)
    } else {
      isStarred.value = true
    }
  }
}

// Open video dialog and fetch related YouTube videos
const openVideoDialog = (topicTitle) => {
  selectedTopic.value = topicTitle
  dialog.value = true
  fetchRelatedVideos(topicTitle)
}

// Fetch related YouTube videos based on topic title
const fetchRelatedVideos = async (topicTitle) => {
  if (!topicTitle) {
    console.error('Topic title is undefined or empty.')
    return
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(
        topicTitle
      )}&type=video&key=${youtubeApiKey}`
    )

    if (!response.ok)
      throw new Error(`YouTube API error: ${response.status} ${response.statusText}`)

    const data = await response.json()
    videos.value = data.items || []
    if (videos.value.length === 0) {
      console.warn('No related videos found.')
    }
  } catch (error) {
    console.error('Error fetching YouTube videos:', error.message)
  }
}

// Show PDF in a new tab
const showPdf = (pdfUrl) => {
  window.open(pdfUrl, '_blank')
}
</script>

<style scoped>
.background-color {
  background-color: #683130;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-card {
  border-radius: 12px;
}

.description {
  font-family: 'Unbounded', sans-serif;
}

.back-button {
  position: fixed;
  bottom: 18px;
  left: 18px;
  z-index: 2000;
  background-color: #faeed1;
  color: #000000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.colorist {
  background-color: #803d3b;
}

.topic-title {
  display: block;
  overflow-wrap: break-word;
  white-space: normal;
  line-height: 1.4;
  color: #803d3b;
}

.dialog-with-blur {
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
