<template>
  <v-app class="background-color description">
    <AdminNav @triggerLogoutModal="openLogoutModal" />
    <v-main>
      <v-container fluid>
        <v-row class="mt-5">
          <v-col cols="12" class="text-center">
            <h1 class="text-white align-center text-center font-weight-black d-inline">
              {{ courseDetails?.course_name || '...' }}
              <v-btn class="ml-2" icon @click="openCourseEditModal" color="#dd660d">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </h1>
          </v-col>
          <v-row class="align-center justify-center">
            <v-col cols="auto" class="text-center">
              <h1 class="text-white font-weight-black d-inline">
                {{ courseDetails?.description || '......' }}
              </h1>
            </v-col>
          </v-row>
        </v-row>
      </v-container>

      <!-- Edit Modal -->
      <v-dialog v-model="isModalOpen" persistent max-width="500px">
        <v-card>
          <v-card-title>Edit Course Details</v-card-title>
          <v-card-text>
            <v-text-field
              label="Course Name"
              v-model="editableCourseName"
              rounded="lg"
              style="width: 100%; background-color: #faeed1"
              class="text-black font-weight-black"
            ></v-text-field>
            <v-textarea
              label="Description"
              v-model="editableDescription"
              rounded="lg"
              style="width: 100%; background-color: #faeed1"
              class="text-black font-weight-black"
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn color="b35100" @click="saveCourseDetails">Save</v-btn>
            <v-btn color="#FAEED1" @click="closeCourseEditModal">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
              @click="successModal = false"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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

      <v-row class="justify-center mt-2 mb-0">
        <v-btn class="ma-1" color="#dd660d" @click="openDeleteDialog">
          <h4>
            Delete {{ courseDetails?.course_name || '...' }}
            <v-icon>mdi-delete</v-icon>
          </h4>
        </v-btn>

        <v-btn class="ma-1" color="#dd660d" @click="openAddModal">
          <h4>
            Add Topic
            <v-icon>mdi-plus</v-icon>
          </h4>
        </v-btn>
      </v-row>
      <v-row class="mx-2">
        <v-col>
          <h2 class="text-white"><v-icon class="mr-2"> mdi-lightbulb-on </v-icon>Topics List</h2>
        </v-col>
      </v-row>

      <v-row class="justify-center mt-0 mb-4">
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
            <v-card class="mb-1 hover-zoom  pb-2" color="#FAEED1" dark elevation="10">
              <!-- Topic Title -->
              <v-card-title class="text-center font-weight-black">
                {{ topic.topic_title }}
              </v-card-title>

              <!-- Topic Description -->
              <v-card-subtitle class="text-center">
                {{ topic.description }}
              </v-card-subtitle>

              <v-card-actions class="mx-2">
                <v-row class="d-flex justify-space-between">
                  <v-col cols="6" md="3">
                    <v-btn
                      elevation="10"
                      color="white"
                      style="background-color: #803d3b"
                      block
                      @click="openVideoDialog(topic.topic_title)"
                    >
                      Watch Videos
                    </v-btn>
                  </v-col>

                  <!--  Open PDF button if pdf_url exists -->
                  <v-col v-if="topic.pdf_url" cols="6" md="3">
                    <v-btn
                      elevation="10"
                      color="white"
                      style="background-color: #803d3b"
                      block
                      @click="showPdf(topic.pdf_url)"
                    >
                      Open PDF
                    </v-btn>
                  </v-col>

                  <!-- Show Add PDF button if no pdf_url exists -->
                  <v-col v-else cols="6" md="3">
                    <v-btn
                      elevation="10"
                      color="white"
                      style="background-color: #dd660d"
                      block
                      @click="openAddPdfModal(topic.id)"
                    >
                      Add PDF
                    </v-btn>
                  </v-col>

                  <v-col cols="6" md="3">
                    <v-btn
                      color="white"
                      text
                      block
                      class="confirm-btn font-weight-bold"
                      @click="openTopicDeleteDialog(topic.id)"
                      style="
                        background-color: #dd660d;
                        color: #803d3b;
                        font-family: 'Unbounded', sans-serif;
                        margin-right: 5px;
                      "
                    >
                      Delete
                    </v-btn>
                  </v-col>

                  <v-col cols="6" md="3">
                    <v-btn
                      color="white"
                      text
                      block
                      class="cancel-btn font-weight-bold"
                      @click="openEditModal(topic)"
                      style="
                        font-family: 'Unbounded', sans-serif;
                        background-color: #dd660d;
                        color: #faeed1;
                        margin-left: 5px;
                      "
                    >
                      Edit
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-dialog v-model="isAddPdfModalOpen" max-width="500" class="dialog-with-blur description">
          <v-card class="mb-2 description" color="#803D3B" elevation="10" rounded="lg">
            <v-card-title class="headline text-center"><h3>Add PDF</h3></v-card-title>
            <v-card class="ma-6 mt-2 description" color="#FAEED1" elevation="10" rounded="lg">
              <v-card-text>
                <v-text-field
                  label="PDF URL"
                  v-model="newPdfUrl"
                  prepend-inner-icon="mdi-file-pdf"
                ></v-text-field>
                <v-text-field
                  label="Description"
                  v-model="newPdfDescription"
                  prepend-inner-icon="mdi-text"
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-card>
          <div class="d-flex justify-end description">
            <v-row>
              <v-col cols="6">
                <v-btn rounded="lg" elevation="10" color="#dd660d" block @click="addPdf">
                  Save
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn rounded="lg" elevation="10" color="#FAEED1" block @click="closeAddPdfModal">
                  Cancel
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-dialog>

        <v-dialog v-model="deleteTopicDialog" max-width="500px" class="dialog-with-blur">
          <v-card class="mx-auto pa-3" elevation="15" rounded="lg" color="#FAEED1">
            <v-card-title class="font-weight-black text-center description"
              >Confirm Deletion</v-card-title
            >
            <v-card-text class="text-center text-black text-caption description">
              <h3>Are you sure you want to delete this Topic?</h3>
              <h3 class="text-red-darken-4">This action cannot be undone</h3>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-row>
                <v-btn
                  color="white"
                  text
                  class="confirm-btn font-weight-bold"
                  @click="deleteTopic(topicToDelete)"
                  style="
                    background-color: #dd660d;
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
                  @click="deleteTopicDialog = false"
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

        <!-- Edit Topic Modal -->
        <EditTopicModal
          v-if="editModalOpen"
          :isOpen="editModalOpen"
          :topic="topicToEdit"
          @update:topic="updateTopic"
          @close="closeEditModal"
        />
        <AddTopicModal
          v-if="addModalOpen"
          :isOpen="addModalOpen"
          @add-topic="addTopic"
          @close="closeAddModal"
        />
        <!-- Edit Course Details Modal -->
        <EditCourseDetails
          :isOpen="isEditModalOpen"
          :courseDetails="courseDetails"
          @close="isEditModalOpen = false"
          @save="saveCourseDetails"
        />
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
import EditTopicModal from '@/components/layout/EditTopicModal.vue'
import AddTopicModal from '@/components/layout/AddTopicModal.vue'
import EditCourseDetails from '@/components/layout/EditCourseDetails.vue'

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
const editableCourseName = ref()
const editableDescription = ref()
const successModal = ref(false)
const deleteDialog = ref(false) // Add delete confirmation dialog state
const deleteTopicDialog = ref(false) // Add delete confirmation dialog state
const topicToDelete = ref(null) // To hold the ID of the topic to delete
const addModalOpen = ref(false)
const router = useRouter() // Get router instance
const isModalOpen = ref(false)
const editModalOpen = ref(false)
const topicToEdit = ref(null)
const isEditModalOpen = ref(false)
const isAddPdfModalOpen = ref(false)
const newPdfUrl = ref('')
const selectedTopicId = ref(null) // State for selected topic ID
const newPdfDescription = ref('')
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

// Save updated course details to Supabase
const saveCourseDetails = async (updatedData) => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .update(updatedData)
      .eq('id', courseDetails.value.id)
      .select() // Return the updated data from Supabase

    if (error) {
      console.error('Error updating course details:', error)
    } else if (data && data.length) {
      // Update courseDetails with the new values to reflect changes
      courseDetails.value.course_name = data[0].course_name
      courseDetails.value.description = data[0].description
      console.log('Course details updated successfully:', data[0])
    }

    successModal.value = true // Show success modal
    isEditModalOpen.value = false // Close the edit modal
  } catch (error) {
    console.error('Failed to save changes:', error)
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

const openCourseEditModal = () => {
  isEditModalOpen.value = true
}
const closeCourseEditModal = () => {
  isModalOpen.value = false
}

const openEditModal = (topic) => {
  topicToEdit.value = topic
  editModalOpen.value = true
}

// Function to close the edit modal
const closeEditModal = () => {
  editModalOpen.value = false
  topicToEdit.value = null
}

// Function to update the topic in Supabase and locally
const updateTopic = async (updatedTopic) => {
  try {
    const { data, error } = await supabase
      .from('topics')
      .update({
        topic_title: updatedTopic.topic_title,
        description: updatedTopic.description
      })
      .eq('id', updatedTopic.id)

    if (error) throw error

    // Update the topic in the local list
    const topicIndex = topics.value.findIndex((t) => t.id === updatedTopic.id)
    if (topicIndex !== -1) {
      topics.value[topicIndex] = updatedTopic
    }
    console.log('Topic updated successfully:', data)
  } catch (error) {
    console.error('Error updating topic:', error.message)
  } finally {
    closeEditModal()
  }
}

const openTopicDeleteDialog = (topicId) => {
  topicToDelete.value = topicId // Store the topic ID to delete
  deleteTopicDialog.value = true // Open delete confirmation dialog
}

// Function to delete a topic from Supabase and locally
const deleteTopic = async (topicId) => {
  try {
    if (!topicId) throw new Error('No topic ID provided')

    const { error } = await supabase.from('topics').delete().eq('id', topicId)

    if (error) throw error

    // Remove the topic from the local list
    topics.value = topics.value.filter((topic) => topic.id !== topicId)
    deleteTopicDialog.value = false // Close delete confirmation dialog
    console.log('Topic deleted successfully')
  } catch (error) {
    console.error('Error deleting topic:', error.message)
  }
}

// Function to open the Add Topic modal
const openAddModal = () => {
  addModalOpen.value = true // Open the modal
}

// Function to close the Add Topic modal
const closeAddModal = () => {
  addModalOpen.value = false // Close the modal
}

const addTopic = async (newTopic) => {
  try {
    const { data, error } = await supabase
      .from('topics')
      .insert([
        {
          course_id: courseDetails.value.id,
          topic_title: newTopic.topic_title,
          description: newTopic.description,
          created_at: new Date().toISOString() // Optional if auto-generated
        }
      ])
      .select() // Ensure you select to return inserted data

    // Check for errors
    if (error) {
      console.error('Supabase insert error:', error)
      throw error // This will be caught in the catch block
    }

    // Ensure data is not null
    if (!data || data.length === 0) {
      throw new Error('No data returned from Supabase')
    }

    // Add the new topic to the local list
    topics.value.push(data[0]) // Assuming data[0] contains the new topic's info
    console.log('New topic added successfully:', data[0])
  } catch (error) {
    console.error('Error adding topic:', error.message)
  } finally {
    closeAddModal() // Close the modal after attempting to add the topic
  }
}
// Open the Add PDF modal
const openAddPdfModal = (topicId) => {
  selectedTopicId.value = topicId
  isAddPdfModalOpen.value = true
}

// Function to handle adding a PDF
const addPdf = async () => {
  if (!newPdfUrl.value) {
    console.error('No PDF URL provided')
    return
  }

  // Check if the selectedTopicId is valid
  if (!selectedTopicId.value) {
    console.error('No topic ID provided for the PDF')
    return
  }

  try {
    const { error } = await supabase.from('resources').insert([
      {
        topic_id: selectedTopicId.value,
        url: newPdfUrl.value,
        description: newPdfDescription.value,
        resource_type: 'pdf',
        created_at: new Date().toISOString()
      }
    ])

    if (error) throw error

    // Update the local state to reflect the newly added PDF
    const updatedTopic = topics.value.find((topic) => topic.id === selectedTopicId.value)
    if (updatedTopic) {
      updatedTopic.pdf_url = newPdfUrl.value // Update the PDF URL for the topic
    }

    console.log('PDF added successfully')
    newPdfUrl.value = '' // Reset the PDF URL
    newPdfDescription.value = '' // Reset the PDF description
  } catch (error) {
    console.error('Error adding PDF:', error.message)
  } finally {
    closeAddPdfModal() // Close the modal after adding
  }
}

// Function to close the Add PDF modal and clear the forms
const closeAddPdfModal = () => {
  newPdfUrl.value = ''
  newPdfDescription.value = ''
  isAddPdfModalOpen.value = false
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
  bottom: 20px;
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

.hover-zoom {
  transition: transform 0.3s ease; /* Smooth transition */
}

.hover-zoom:hover {
  transform: scale(1.05); /* Scale up on hover */
}
</style>
