<template>
  <v-app class="background-color description">
    <AdminNav @triggerLogoutModal="openLogoutModal" />
    <v-main>
      <v-container>
        <v-row class="mt-5 align-center justify-center">
          <v-col cols="auto" class="text-center">
            <v-row>
              <h1 class="text-white font-weight-black d-inline">
                <template v-if="!isEditingName">{{ courseDetails?.course_name || '...' }}</template>
                <div style="display: flex; align-items: center">
                  <v-text-field
                    v-if="isEditingName"
                    v-model="editableCourseName"
                    hide-details
                    rounded="lg"
                    variant="outlined"
                    density="comfortable"
                    style="width: 300px; border-radius: 10px; background-color: #faeed1"
                    class="text-black font-weight-black"
                    color="black"
                  ></v-text-field>
                  <template v-if="isEditingName">
                    <v-row class="ml-2">
                      <v-btn icon @click="saveCourseDetails('name')" color="#FFD700">
                        <v-icon>mdi-check</v-icon>
                      </v-btn>
                      <v-btn class="ml-2" icon @click="cancelEdit('name')" color="#FAEED1">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-row>
                  </template>
                </div>
              </h1>
              <template v-if="!isEditingName">
                <v-btn class="ml-2" icon @click="toggleEdit('name')" color="#FFD700">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
            </v-row>
          </v-col>
        </v-row>

        <!-- Course Description with Edit Button -->
        <v-row class="mt-5 align-center justify-center">
          <v-col cols="auto" class="text-center">
            <v-row>
              <h1 class="text-white font-weight-black d-inline">
                <template v-if="!isEditingDescription">{{
                  courseDetails?.description || '......'
                }}</template>
                <div style="display: flex; align-items: center">
                  <v-text-field
                    v-if="isEditingDescription"
                    v-model="editableDescription"
                    hide-details
                    rounded="lg"
                    variant="outlined"
                    density="comfortable"
                    style="width: 500px; border-radius: 10px; background-color: #faeed1"
                    class="text-black font-weight-black"
                    color="black"
                  ></v-text-field>
                  <template v-if="isEditingDescription">
                    <v-row class="ml-2">
                      <v-btn icon @click="saveCourseDetails('description')" color="#FFD700">
                        <v-icon>mdi-check</v-icon>
                      </v-btn>
                      <v-btn class="ml-2" icon @click="cancelEdit('description')" color="#FAEED1">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-row>
                  </template>
                </div>
              </h1>
              <template v-if="!isEditingDescription">
                <v-btn class="ml-2" icon @click="toggleEdit('description')" color="#FFD700">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
            </v-row>
          </v-col>
        </v-row>

        <!-- Success Modal -->

        <v-dialog v-model="successModal" max-width="448" class="dialog-with-blur">
          <v-card class="mx-auto pa-3" elevation="15" rounded="lg" color="#FAEED1">
            <v-card-title>
              <h3 class="font-weight-black text-center description">Success</h3>
            </v-card-title>
            <v-card-text class="text-center text-black text-caption description">
              <h3>Information Successfully Updated!</h3>
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="description"
                color="#803d3b"
                size="large"
                variant="elevated"
                elevation="15"
                block
                @click="refreshPage"
              >
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
      <!-- Search for Topics -->
      <v-row class="justify-center mt-0 mb-4 mx-auto">
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

      <v-row class="justify-center mt-2 mb-4">
        <v-btn class="ma-1" color="#FFD700" @click="openDeleteDialog">
          <h4>
            <v-icon>mdi-delete</v-icon> Delete {{ courseDetails?.course_name || '...' }}
            <v-icon>mdi-delete</v-icon>
          </h4>
        </v-btn>

        <v-dialog v-model="deleteDialog" max-width="500px" class="dialog-with-blur">
          <v-card class="mx-auto pa-3" elevation="15" rounded="lg" color="#FAEED1">
            <v-card-title class="font-weight-black text-center description"
              >Confirm Deletion</v-card-title
            >
            <v-card-text class="text-center text-black text-caption description">
              <h3>Are you sure you want to delete this course?</h3>
              <h3 class="text-red-darken-4">This action cannot be undone</h3>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-row>
                <v-btn
                  color="#FAEED1"
                  text
                  class="confirm-btn font-weight-bold"
                  @click="deleteCourse"
                  style="
                    background-color: white;
                    color: #803d3b;
                    font-family: 'Unbounded', sans-serif;
                    margin-right: 5px;
                  "
                >
                  Delete
                </v-btn>
                <v-btn
                  color="#FAEED1"
                  text
                  class="cancel-btn font-weight-bold"
                  @click="deleteDialog = false"
                  style="
                    font-family: 'Unbounded', sans-serif;
                    background-color: #803d3b;
                    color: #faeed1;
                    margin-left: 5px;
                  "
                >
                  Cancel
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
import { useRoute, useRouter } from 'vue-router' // Import useRouter
import { supabase } from '@/utils/supabase'
import LogoutModal from '@/components/auth/LogoutModal.vue'
import AdminNav from '@/components/layout/AdminNav.vue'

// Modal and star state
const logoutModalRef = ref(null)

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
const isEditingName = ref(false)
const isEditingDescription = ref(false)
const editableCourseName = ref()
const editableDescription = ref()
const successModal = ref(false)
const successMessage = ref('')
const deleteDialog = ref(false) // Add delete confirmation dialog state
const router = useRouter() // Get router instance

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
      // Initialize editable fields once course details are fetched
      editableCourseName.value = courseData.course_name
      editableDescription.value = courseData.description
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

// Toggle edit mode and save changes if editing is completed
const toggleEdit = (field) => {
  if (field === 'name') {
    if (isEditingName.value) {
      saveCourseDetails('name') // Save when editing is completed
    } else {
      editableCourseName.value = courseDetails.value.course_name // Initialize editable field
    }
    isEditingName.value = !isEditingName.value
  } else if (field === 'description') {
    if (isEditingDescription.value) {
      saveCourseDetails('description') // Save when editing is completed
    } else {
      editableDescription.value = courseDetails.value.description // Initialize editable field
    }
    isEditingDescription.value = !isEditingDescription.value
  }
}

// Cancel edit mode and reset editable field
const cancelEdit = (field) => {
  if (field === 'name') {
    editableCourseName.value = courseDetails.value.course_name // Reset to original value
    isEditingName.value = false // Close editing mode
  } else if (field === 'description') {
    editableDescription.value = courseDetails.value.description // Reset to original value
    isEditingDescription.value = false // Close editing mode
  }
}

// Save updated course details to Supabase
const saveCourseDetails = async () => {
  try {
    const updatedData = {
      course_name: editableCourseName.value,
      description: editableDescription.value
    }

    const { data, error } = await supabase
      .from('courses')
      .update(updatedData)
      .eq('id', courseDetails.value.id)

    if (error) {
      console.error('Error updating course details:', error)
      successMessage.value = 'Failed to update course details.'
    } else if (data && data.length) {
      // Update the course name and description with new data
      courseDetails.value.course_name = data[0].course_name
      courseDetails.value.description = data[0].description
      console.log('Course details updated successfully:', data[0])

      // Show success modal
      successMessage.value = 'Course details updated successfully!'
    }
  } catch (error) {
    console.error('Failed to save changes:', error)
    successMessage.value = 'An error occurred while saving changes.'
  } finally {
    // Open modal regardless of success or failure
    successModal.value = true

    // Close the editing mode after saving
    isEditingName.value = false // Close editing for name
    isEditingDescription.value = false // Close editing for description
  }
}

// Delete course function
const openDeleteDialog = () => {
  deleteDialog.value = true // Open delete confirmation dialog
}

const deleteCourse = async () => {
  try {
    const { error } = await supabase.from('courses').delete().eq('id', courseDetails.value.id)

    if (error) {
      console.error('Error deleting course:', error)
      // Optionally show an error message
    } else {
      console.log('Course deleted successfully')
      // Redirect to the admin homepage after deletion
      router.push('/adminhome')
    }
  } catch (error) {
    console.error('Failed to delete course:', error)
  } finally {
    deleteDialog.value = false // Close delete confirmation dialog
  }
}

// Refresh the page when the modal button is clicked
const refreshPage = () => {
  location.reload() // Refresh the page
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
  background-color: #FFD700;
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
