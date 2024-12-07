<template>
  <!-- Main application wrapper -->
  <v-app class="background-color description">
    <div class="geometric-overlay"></div>
    <!-- Navigation bar with logout modal trigger -->
    <NavBar @triggerLogoutModal="openLogoutModal" />

    <v-main>
      <v-container fluid>
        <!-- Course Header -->
        <v-row class="mt-5">
          <v-col cols="12" class="text-center">
            <!-- Display course name with star icon toggle -->
            <h1 class="text-white font-weight-black">
              {{ courseDetails?.course_name || '...' }}
              <v-btn
                icon
                class="ma-2 hover-zoom"
                :color="isStarred ? '#dd660d' : '#FAEED1'"
                @click="toggleStar(courseDetails.id)"
                v-if="courseDetails"
              >
                <!-- Conditional icon based on starred status -->
                <v-icon>{{ isStarred ? 'mdi-star-check' : 'mdi-star-plus-outline' }}</v-icon>
              </v-btn>
            </h1>
          </v-col>
        </v-row>
        <!-- Display course description -->
        <h3 class="text-white text-center">
          {{ courseDetails?.description || '......' }}
        </h3>
      </v-container>

      <!-- Search for Topics -->
      <v-row class="justify-center mb-1 mx-auto">
        <v-col cols="12" sm="8" md="6">
          <v-card class="pa-2" elevation="15" rounded="lg" color="#FAEED1">
            <v-text-field
              v-model="searchQuery"
              :loading="loading"
              append-inner-icon="mdi-magnify"
              prepend-inner-icon="mdi-lightbulb-on"
              density="comfortable"
              label="Search Topics"
              outlined
              variant="outlined"
              hide-details
              elevation="15"
              single-line
              color="#803d3b"
              @input="onSearchInput"
            ></v-text-field>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mx-2 align-center">
        <v-col cols="4" xs="12">
          <h2 class="text-white"><v-icon class="mr-2">mdi-lightbulb-on</v-icon>Topics</h2>
        </v-col>

        <!-- Centered Buttons Column -->
        <v-col class="d-flex justify-center" cols="4" xs="6">
          <v-btn
            v-if="previousCourseId"
            @click="goToCourse(previousCourseId)"
            color="#FAEED1"
            elevation="15"
            class="mr-2 hover-zoom"
            icon
          >
            <v-icon>mdi-chevron-double-left </v-icon>
          </v-btn>
          <v-btn
            v-if="nextCourseId"
            @click="goToCourse(nextCourseId)"
            color="#FAEED1"
            elevation="15"
            class="ml-2 hover-zoom"
            icon
          >
            <v-icon>mdi-chevron-double-right</v-icon>
          </v-btn>
        </v-col>

        <!-- Request Button Column -->
        <v-col class="d-flex justify-end" cols="4" xs="6">
          <v-btn elevation="15" class="hover-zoom" color="#FAEED1" @click="openTopicRequestModal">
            Request
          </v-btn>
        </v-col>
      </v-row>

      <RequestTopicModal
        :isOpen="isTopicModalOpen"
        :requestedTopics="requestedTopics"
        @add-topic="handleAddTopic"
        @delete-topic="handleDeleteTopic"
        @close="closeTopicRequestModal"
      />

      <!-- Topics Display (Videos and PDFs) -->
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="6" v-for="topic in filteredTopics" :key="topic.topic_title">
            <v-card class="mb-1 hover-zoom" color="#FAEED1" dark elevation="10">
              <v-card-title class="text-center font-weight-black topic-title">
                {{ topic.topic_title }}
              </v-card-title>
              <v-card-subtitle class="text-center">{{ topic.description }}</v-card-subtitle>
              <v-card-text>
                <v-row>
                  <!-- Watch Videos button -->
                  <v-col :cols="topic.resources && topic.resources.length > 0 ? 6 : 12">
                    <v-btn
                      elevation="10"
                      color="#803D3B"
                      block
                      @click="openVideoDialog(topic.topic_title)"
                    >
                      Watch Videos
                    </v-btn>
                  </v-col>

                  <!-- Open PDF button for the modal -->
                  <v-col v-if="topic.resources && topic.resources.length > 0" cols="6">
                    <v-btn
                      elevation="10"
                      color="#803D3B"
                      block
                      @click="openPdfDialog(topic.resources, topic.topic_title)"
                    >
                      View PDF
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-dialog v-model="pdfDialog" max-width="600">
          <div class="d-flex justify-start mb-2 description">
            <v-card color="#FAEED1" elevation="10">
              <v-card-title class="headline text-center topic-title">
                <h4>{{ pdfTitle }}</h4>
              </v-card-title>
            </v-card>
          </div>
          <v-card class="mb-2 description" color="#803D3B" elevation="10" rounded="lg">
            <v-card-text>
              <div v-if="pdfResources.length > 0">
                <h4 class="text-center mb-2">Available PDF</h4>
                <v-card class="ma-1 mt-2 description" color="#FAEED1" elevation="10" rounded="lg">
                  <ul>
                    <li class="mt-3" v-for="resource in pdfResources" :key="resource.id">
                      <v-row class="d-flex justify-start ma-1">
                        <v-col cols="8">
                          <p>{{ resource.description }}</p>
                        </v-col>
                        <v-col cols="4" class="text-right">
                          <v-btn :href="resource.url" target="_blank" color="#803D3B">Open</v-btn>
                        </v-col>
                      </v-row>
                    </li>
                  </ul>
                </v-card>
              </div>
              <div v-else>
                <p>No PDFs are available for this topic.</p>
              </div>
            </v-card-text>
          </v-card>
          <div class="d-flex justify-end description">
            <v-card color="#FAEED1" elevation="10">
              <v-btn color="#FAEED1" size="large" @click="pdfDialog = false"><h5>Close</h5></v-btn>
            </v-card>
          </div>
        </v-dialog>

        <!-- Video Dialog for related videos display -->
        <v-dialog
          v-model="dialog"
          max-width="1400px"
          rounded="lg"
          overlay="true"
          class="dialog-with-blur"
        >
          <!-- Header for the video dialog -->
          <div class="d-flex justify-start mb-2 description">
            <v-card color="#FAEED1" elevation="10">
              <v-card-title class="headline text-center topic-title">
                <h4>Related Videos for {{ selectedTopic }}</h4>
              </v-card-title>
            </v-card>
          </div>

          <!-- List of videos displayed in the dialog -->
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

          <!-- Close button for the video dialog -->
          <div class="d-flex justify-end description">
            <v-card color="#FAEED1" elevation="10">
              <v-btn color="#FAEED1" size="large" @click="dialog = false"><h5>Close</h5></v-btn>
            </v-card>
          </div>
        </v-dialog>
      </v-container>

      <!-- Logout Modal component -->
      <LogoutModal ref="logoutModalRef" />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'
import LogoutModal from '@/components/auth/LogoutModal.vue'
import NavBar from '@/components/layout/NavBar.vue'
import RequestTopicModal from '@/components/layout/RequestTopicModal.vue'

// Reference for logout modal component
const logoutModalRef = ref(null)

// State to track if course is starred
const isStarred = ref(false)

// Function to open the logout modal
const openLogoutModal = () => {
  logoutModalRef.value?.open()
}

// Reactive variables for course and topic data
const courseDetails = ref(null)
const topics = ref([])
const loading = ref(false)
const searchQuery = ref('')
const dialog = ref(false)
const videos = ref([])
const selectedTopic = ref('')
const youtubeApiKey = 'AIzaSyBIkYvO2Coqq4wy6UDRvI-xFi3mHmAYOlQ' // YouTube API key
const isTopicModalOpen = ref(false)
const requestedTopics = ref([])
// Using Vue Router to access route parameters
const route = useRoute()

const courses = ref([]) // Add this line to store all courses
const router = useRouter() // Initialize the router here
const currentCourseIndex = ref(-1) // To keep track of the current course index

const pdfDialog = ref(false)
const pdfResources = ref([]) // Add this line to define pdfResources
const pdfTitle = ref('')

// Method to open PDF dialog

// Computed property to filter topics based on search query
const filteredTopics = computed(() => {
  return topics.value.filter((topic) =>
    topic.topic_title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Fetch course data and related topics when component is mounted
const fetchCourseData = async (courseId) => {
  if (courseId) {
    try {
      loading.value = true

      // Fetch course details from database
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

      // Fetch resources linked to the topics
      const { data: resourcesData, error: resourcesError } = await supabase
        .from('resources')
        .select('*')
        .in(
          'topic_id',
          topicsData.map((topic) => topic.id)
        )

      if (resourcesError) throw resourcesError

      console.log('Fetched resources:', resourcesData)
      // Attach resources (e.g., PDFs) to corresponding topics
      topics.value = topicsData.map((topic) => {
        const topicResources = resourcesData.filter((resource) => resource.topic_id === topic.id)
        topic.resources = topicResources // Ensure the resources are attached to the topic
        topic.pdf_url =
          topicResources.find((resource) => resource.resource_type === 'pdf')?.url || null
        return topic
      })

      // Update current course index
      currentCourseIndex.value = courses.value.findIndex((course) => course.id === courseId)
    } catch (error) {
      console.error('Error fetching course data:', error.message)
    } finally {
      loading.value = false
    }
  } else {
    console.error('Course ID is undefined')
  }
}
console.log(topics.value)

console.log(selectedTopic.value.resources)

function openPdfDialog(resources, title) {
  pdfResources.value = resources // Set the resources
  console.log('Opening PDF dialog with resources:', resources) // Debug output
  pdfTitle.value = title // Set the title
  pdfDialog.value = true // Open the dialog
}

watch(
  () => route.params.id,
  (newCourseId) => {
    fetchCourseData(newCourseId)
  }
)

// Fetch all courses on component mount
onMounted(async () => {
  try {
    const { data: allCourses, error: allCoursesError } = await supabase.from('courses').select('*')

    if (allCoursesError) throw allCoursesError

    courses.value = allCourses // Store all courses
    const courseId = route.params.id
    await fetchCourseData(courseId) // Fetch data for the initial course
  } catch (error) {
    console.error('Error fetching all courses:', error.message)
  }
})

const previousCourseId = computed(() => {
  const index = currentCourseIndex.value
  return index > 0 ? courses.value[index - 1].id : null
})

const nextCourseId = computed(() => {
  const index = currentCourseIndex.value
  return index < courses.value.length - 1 ? courses.value[index + 1].id : null
})

const goToCourse = (courseId) => {
  if (courseId) {
    // Navigate to the course page
    router.push({ name: 'CoursePage', params: { id: courseId } })
  }
}
// Toggle course starred status for the user
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

const openTopicRequestModal = () => {
  isTopicModalOpen.value = true
}

const closeTopicRequestModal = () => {
  isTopicModalOpen.value = false
}
const fetchRequestedTopics = async (courseId) => {
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

  try {
    const { data, error } = await supabase
      .from('request_topic')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId) // Only fetch topics for the current course

    if (error) throw error

    requestedTopics.value = data
    console.log('Fetched requested topics:', requestedTopics.value)
  } catch (error) {
    console.error('Error fetching requested topics:', error)
  }
}

// Handle adding a new topic request
const handleAddTopic = async (topicDetails) => {
  const courseId = route.params.id
  try {
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

    const { error } = await supabase.from('request_topic').insert([
      {
        topic_name: topicDetails.topic_name,
        description: topicDetails.description,
        course_id: courseId, // Current course ID
        user_id: userId,
        status: 'pending',
        created_at: new Date().toISOString()
      }
    ])

    if (error) throw error

    // Re-fetch the requested topics to get the updated list
    await fetchRequestedTopics(courseId)
  } catch (error) {
    console.error('Error adding topic request:', error)
  }
}

onMounted(() => {
  const courseId = route.params.id
  if (courseId) {
    fetchRequestedTopics(courseId)
  } else {
    console.error('Course ID is undefined')
  }
})

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

const handleDeleteTopic = async (topicId) => {
  try {
    // Delete the topic from the Supabase table
    const { error } = await supabase
      .from('request_topic') // Ensure this matches your Supabase table name
      .delete()
      .eq('id', topicId)

    if (error) throw error // Handle any error from the deletion

    // Remove the topic from the local requestedTopics array
    const index = requestedTopics.value.findIndex((topic) => topic.id === topicId)
    if (index !== -1) {
      requestedTopics.value.splice(index, 1) // Update the local array
    }

    console.log('Topic deleted successfully')
  } catch (error) {
    console.error('Error deleting topic:', error.message)
  }
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

.colorist {
  background-color: #803d3b;
}

.topic-title {
  display: block;
  overflow-wrap: break-word;
  white-space: normal;
  line-height: 1.4;
  color: black;
}

/* Geometric overlay styles */
.geometric-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Ensure clicks go through this overlay */
  z-index: 0; /* Ensure this is behind other content */
}

/* Adding multiple geometric shapes with improved visibility */
.geometric-overlay::before,
.geometric-overlay::after {
  content: '';
  position: absolute;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background: rgba(255, 255, 255, 0.15); /* Slightly higher opacity for better clarity */
  clip-path: polygon(20% 0%, 0% 20%, 20% 100%, 100% 20%, 80% 0%); /* First shape */
  opacity: 0.5; /* Increased opacity for better visibility */
}

/* Layering different shapes with clarity */
.geometric-overlay::after {
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%); /* Second shape */
  opacity: 0.4; /* Slightly more transparent */
}

/* Additional smaller geometric shapes */
.geometric-overlay div {
  position: absolute;
  width: 20%; /* Increased size for better visibility */
  height: 20%; /* Increased size for better visibility */
  background: rgba(255, 255, 255, 0.25); /* Higher opacity for clearer visibility */
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%); /* Triangle shape */
  opacity: 0.6; /* Increased opacity for clarity */
}

/* Random positioning for aesthetic */
.geometric-overlay div:nth-child(1) {
  top: 10%;
  left: 5%;
  transform: rotate(15deg);
}
.geometric-overlay div:nth-child(2) {
  top: 30%;
  left: 25%;
  transform: rotate(30deg);
}
.geometric-overlay div:nth-child(3) {
  top: 50%;
  left: 60%;
  transform: rotate(-15deg);
}
.geometric-overlay div:nth-child(4) {
  top: 70%;
  left: 75%;
  transform: rotate(45deg);
}
.geometric-overlay div:nth-child(5) {
  top: 20%;
  left: 80%;
  transform: rotate(10deg);
}

/* Additional distinct geometric shapes */
.geometric-overlay .shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.3); /* Background for new shapes */
  opacity: 0.5; /* Opacity for better visibility */
}

.dialog-with-blur {
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.3);
}

.hover-zoom {
  transition: transform 0.3s ease; /* Smooth transition */
}

.hover-zoom:hover {
  transform: scale(1.05); /* Scale up on hover */
}
</style>
