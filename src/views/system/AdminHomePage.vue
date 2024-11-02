<template>
  <v-app class="animated-background description">
    <AdminNav @triggerLogoutModal="openLogoutModal" />
    <v-main>
      <v-container fluid>
        <div>
          <v-row class="mt-5">
            <v-col cols="12" class="text-center">
              <h1 class="text-white font-weight-black">
                Welcome Back Admin {{ firstName || '...' }}!
              </h1>
            </v-col>
          </v-row>

          <!-- Search Course Bar -->
          <v-row class="justify-center mb-1 mx-auto">
            <v-col cols="12" sm="8" md="6">
              <v-card class="pa-2" elevation="15" rounded="lg" color="#803d3b">
                <v-text-field
                  v-model="searchQuery"
                  :loading="loading"
                  append-inner-icon="mdi-magnify"
                  prepend-inner-icon="mdi-cast-education"
                  density="comfortable"
                  label="Search Course"
                  hide-details
                  rounded="lg"
                  variant="solo"
                  elevation="15"
                  single-line
                  outlined
                  @input="onSearchInput"
                ></v-text-field>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="justify-center mt-3 mb-4">
            <v-btn class="ma-1" color="#dd660d" @click="openAddCourseModal">
              <h4><v-icon>mdi-plus</v-icon> Add New Course</h4>
            </v-btn>
            <v-btn class="ma-1" color="#dd660d" @click="openAddTopicModal">
              <h4><v-icon>mdi-plus</v-icon> Add New Topic</h4>
            </v-btn>
          </v-row>

          <!-- Program Filter Buttons -->
          <v-row class="justify-center mb-4">
            <v-btn
              :color="selectedProgramId === null ? '#803D3B' : '#FAEED1'"
              class="mx-1"
              @click="setSelectedProgram(null)"
            >
              <h3
                :class="{
                  'text-white': selectedProgramId === null,
                  'text-black': selectedProgramId !== null
                }"
              >
                All
              </h3>
            </v-btn>
            <v-btn
              v-for="program in programs"
              :key="program.id"
              @click="setSelectedProgram(program.id)"
              :color="selectedProgramId === program.id ? '#803D3B' : '#FAEED1'"
              class="mx-1"
            >
              <h3
                :class="{
                  'text-white': selectedProgramId === program.id,
                  'text-black': selectedProgramId !== program.id
                }"
              >
                {{ program.program_name }}
              </h3>
            </v-btn>
          </v-row>

          <v-row>
            <v-col>
              <h2 class="text-white">
                <v-icon class="mr-2"> mdi-book-open-page-variant </v-icon>Course List
              </h2>
            </v-col>
          </v-row>
        </div>

        <!-- Filtered Courses List -->
        <v-row>
          <v-col v-for="course in filteredCourses" :key="course.id" cols="12" sm="6" md="4">
            <v-card class="pa-3" elevation="15" color="#803d3b">
              <v-btn
                class="pa-0"
                color="#FAEED1"
                block
                height="150px"
                :to="{ name: 'admincoursepage', params: { id: course.id } }"
              >
                <div class="text-center">
                  <h1 class="mb-2">{{ course.course_name }}</h1>
                  <v-card class="pa-3" color="#803d3b" variant="outlined">
                    <h5 class="course-description">{{ course.description }}</h5>
                  </v-card>
                </div>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-dialog
        v-model="addCourseModalVisible"
        max-width="600px"
        persistent
        class="dialog-with-blur"
      >
        <v-card class="mb-2 description" color="#803D3B" elevation="10" rounded="lg">
          <v-card-title class="headline text-center"><h3>Add New Course</h3></v-card-title>
          <v-card class="ma-6 mt-2 description" color="#FAEED1" elevation="10" rounded="lg">
            <v-card-text>
              <v-form ref="addCourseForm">
                <v-select
                  v-model="newCourse.program_id"
                  :items="programs"
                  item-value="id"
                  item-title="program_name"
                  label="Select Program"
                  required
                  prepend-inner-icon="mdi-laptop"
                ></v-select>
                <v-text-field
                  v-model="newCourse.course_name"
                  label="Course Name"
                  required
                  prepend-inner-icon="mdi-cast-education"
                ></v-text-field>
                <v-textarea
                  v-model="newCourse.description"
                  label="Description"
                  required
                  prepend-inner-icon="mdi-text-box-edit-outline"
                ></v-textarea>
                <v-select
                  v-model="newCourse.year_level"
                  :items="[1, 2, 3, 4]"
                  label="Year Level"
                  required
                  prepend-inner-icon="mdi-calendar-account"
                ></v-select>
                <v-select
                  v-model="newCourse.semester"
                  :items="[1, 2]"
                  label="Semester"
                  required
                  prepend-inner-icon="mdi-account-school-outline"
                ></v-select>
              </v-form>
            </v-card-text>
          </v-card>
        </v-card>
        <div class="d-flex justify-end description">
          <v-row>
            <v-col cols="6">
              <v-btn rounded="lg" elevation="10" color="#FAEED1" block @click="addCourse">
                Save
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                rounded="lg"
                elevation="10"
                color="#FAEED1"
                block
                @click="addCourseModalVisible = false"
              >
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-dialog>

      <v-dialog v-model="addTopicDialog" max-width="600px" persistent class="dialog-with-blur">
        <v-card class="mb-2 description" color="#803D3B" elevation="10" rounded="lg">
          <v-card-title class="headline text-center"><h3>Add New Topic</h3> </v-card-title>
          <v-card class="ma-6 mt-2 description" color="#FAEED1" elevation="10" rounded="lg">
            <v-card-text>
              <v-form ref="addTopicForm">
                <!-- Program selection -->
                <v-select
                  v-model="selectedProgramId"
                  :items="programs"
                  item-title="program_name"
                  item-value="id"
                  label="Program"
                  prepend-inner-icon="mdi-laptop"
                  @change="fetchCoursesByProgram"
                  required
                ></v-select>
                <!-- Course selection -->
                <v-select
                  v-model="newTopic.course_id"
                  :items="filteredCourses"
                  item-title="course_name"
                  item-value="id"
                  label="Course"
                  prepend-inner-icon="mdi-book-open-page-variant"
                  required
                ></v-select>
                <!-- Topic title and description -->
                <v-text-field
                  v-model="newTopic.title"
                  prepend-inner-icon="mdi-tag-edit"
                  label="Topic Title"
                  required
                ></v-text-field>
                <v-textarea
                  v-model="newTopic.description"
                  label="Description"
                  required
                  prepend-inner-icon="mdi-text-box-edit-outline"
                ></v-textarea>
              </v-form>
            </v-card-text>
          </v-card>
        </v-card>
        <div class="d-flex justify-end description">
          <v-row>
            <v-col cols="6">
              <v-btn rounded="lg" elevation="10" color="#FAEED1" block @click="saveTopic">
                Save
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                rounded="lg"
                elevation="10"
                color="#FAEED1"
                block
                @click="addTopicDialog = false"
              >
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-dialog>

      <!-- Success dialog for adding course -->

      <v-dialog
        v-model="successDialogVisible"
        max-width="400px"
        persistent
        class="dialog-with-blur"
      >
        <v-card class="mb-2 description" color="#803D3B" elevation="10" rounded="lg">
          <v-card-title class="text-center"><h4>Success!</h4></v-card-title>
          <v-card-text class="text-center"> Course has been successfully added.</v-card-text>
          <v-card-actions class="justify-center mb-2">
            <v-col cols="12" color="#FAEED1">
              <v-card color="#FAEED1">
                <v-btn rounded="lg" elevation="10" block @click="refreshPage"> OK </v-btn>
              </v-card>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="successTopicDialogVisible"
        max-width="400px"
        persistent
        class="dialog-with-blur"
      >
        <v-card class="mb-2 description" color="#803D3B" elevation="10" rounded="lg">
          <v-card-title class="text-center"><h4>Success!</h4></v-card-title>
          <v-card-text class="text-center"> Topic has been successfully added. </v-card-text>
          <v-card-actions class="justify-center mb-2">
            <v-col cols="12" color="#FAEED1">
              <v-card color="#FAEED1">
                <v-btn rounded="lg" elevation="10" block @click="refreshPage"> OK </v-btn>
              </v-card>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <LogoutModal ref="logoutModalRef" />
    </v-main>
  </v-app>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import LogoutModal from '@/components/auth/LogoutModal.vue'
import AdminNav from '@/components/layout/AdminNav.vue'

// State for user information, modals, and dialogs
const logoutModalRef = ref(null)
const openLogoutModal = () => {
  logoutModalRef.value?.open()
}

const firstName = ref('')
const programs = ref([])
const selectedProgramId = ref(null)
const searchQuery = ref('')
const courses = ref([])
const addCourseModalVisible = ref(false)
const successDialogVisible = ref(false)
const successTopicDialogVisible = ref(false)
const addTopicDialog = ref(false) // New: Dialog for adding a topic

// New course data
const newCourse = ref({
  program_id: null,
  course_name: '',
  description: '',
  year_level: null,
  semester: null,
  created_at: new Date().toISOString()
})

// New: New topic data
const newTopic = ref({
  program_id: null, // Program filter
  course_id: null,
  title: '',
  description: ''
})

// Fetch user information on mount
onMounted(async () => {
  const user = await getUserInformation()
  if (user) {
    firstName.value = user.firstname
    await fetchPrograms()
    await fetchCourses()
  } else {
    console.error('Failed to get user information.')
  }
})

// Functions for Add Course Modal
const openAddTopicModal = () => {
  addTopicDialog.value = true
}

const openAddCourseModal = () => {
  addCourseModalVisible.value = true
}
const addCourse = async () => {
  // Log the new course data being inserted
  console.log('Attempting to add course:', newCourse.value)

  // Save the new course to Supabase
  const { data, error } = await supabase.from('courses').insert({
    program_id: newCourse.value.program_id,
    course_name: newCourse.value.course_name,
    description: newCourse.value.description,
    year_level: newCourse.value.year_level,
    semester: newCourse.value.semester,
    created_at: new Date().toISOString()
  })

  // Handle error case
  if (error) {
    console.error('Error adding course:', error.message)
  } else {
    // Log the successful addition of the course
    console.log('Course added:', data)

    // Close the add course modal
    addCourseModalVisible.value = false

    // Reset course form
    newCourse.value = {
      program_id: null,
      course_name: '',
      description: '',
      year_level: null,
      semester: null,
      created_at: new Date().toISOString()
    }

    // Show success dialog
    successDialogVisible.value = true
  }
}

// Filter function for courses by selected program
const setSelectedProgram = (programId) => {
  selectedProgramId.value = programId
  newTopic.value.course_id = null // Reset course when program changes
}

// Function to save new topic
const saveTopic = async () => {
  const { data, error } = await supabase.from('topics').insert({
    course_id: newTopic.value.course_id,
    description: newTopic.value.description,
    topic_title: newTopic.value.title,
    created_at: new Date().toISOString()
  })

  if (error) {
    console.error('Error adding topic:', error.message)
  } else {
    console.log('Topic added:', data)
    addTopicDialog.value = false
    // Reset topic form
    newTopic.value = {
      program_id: null,
      course_id: null,
      topic_title: '',
      description: ''
    }
    addTopicDialog.value = false // Close the dialog
    successTopicDialogVisible.value = true // Show success dialog
  }
}

// Fetch programs and courses
async function getUserInformation() {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error fetching user information:', error.message)
    return null
  }
  return data.user
    ? {
        id: data.user.id,
        firstname: data.user.user_metadata.firstname
      }
    : null
}

const fetchPrograms = async () => {
  const { data, error } = await supabase.from('programs').select('*')
  if (error) console.error('Error fetching programs:', error)
  programs.value = data
}

const fetchCourses = async () => {
  const { data, error } = await supabase.from('courses').select('*')
  if (error) console.error('Error fetching courses:', error)
  courses.value = data
}

// Computed property to filter courses by program and search query
const filteredCourses = computed(() => {
  let filtered = courses.value

  if (selectedProgramId.value) {
    filtered = filtered.filter((course) => course.program_id === selectedProgramId.value)
  }

  if (searchQuery.value) {
    filtered = filtered.filter((course) =>
      course.course_name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return filtered
})

// Loading state for the search field
const loading = ref(false)
const onSearchInput = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
}

const refreshPage = () => {
  location.reload() // Refresh the page
}
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/unbounded');
.fill-height {
  height: 100vh;
}

.mobile-nav-drawer {
  backdrop-filter: blur(15px);
}

/* Background animation */
@keyframes gradientBackground {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.description {
  font-family: 'Unbounded', sans-serif;
}

.text-center {
  padding: 10px;
}
.course-description {
  display: block;
  overflow-wrap: break-word;
  white-space: normal;
  line-height: 1.4;
  color: #803d3b;
}
.animated-background {
  background: linear-gradient(270deg, #803d3b, #c7b793, #aa7154, #b54646);
  background-size: 800% 800%;
  animation: gradientBackground 15s ease infinite;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Floating Icon Styles */
.anim-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.anim-element {
  position: absolute;
  color: rgba(255, 255, 255, 0.5);
  animation: float infinite;
}

.dialog-with-blur {
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
