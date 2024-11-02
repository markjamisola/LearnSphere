<template>
  <v-app class="animated-background description">
    <div class="geometric-overlay"></div>
    <NavBar @triggerLogoutModal="openLogoutModal" />

    <v-main>
      <v-container fluid>
        <div>
          <div>
            <v-row class="mt-5">
              <v-col cols="12" class="text-center">
                <h1 class="text-white font-weight-black">
                  Time to study {{ firstName || '...' }}!
                </h1>
              </v-col>
            </v-row>

            <!-- Search Course Bar -->
            <v-row class="justify-center mb-1 mx-auto">
              <v-col cols="12" sm="8" md="6">
                <v-card class="pa-2" elevation="15" rounded="lg" color="#803d3b" variant="elevated">
                  <v-text-field
                    v-model="searchQuery"
                    :loading="loading"
                    append-inner-icon="mdi-magnify"
                    prepend-inner-icon="mdi-cast-education"
                    density="comfortable"
                    label="Search Course"
                    variant="solo"
                    hide-details
                    single-line
                    elevation="15"
                    color="deep-purple-darken-3"
                    outlined
                    @input="onSearchInput"
                  ></v-text-field>
                </v-card>
              </v-col>
            </v-row>

            <v-row class="mb-3 justify-center">
              <v-btn
                elevation="15"
                class="mx-1 mt-2"
                :color="selectedYearLevel === 0 ? '#803d3b' : '#FAEED1'"
                @click="selectYearLevel(0)"
              >
                All
              </v-btn>
              <v-btn
                elevation="15"
                class="mx-1 mt-2"
                :color="selectedYearLevel === 1 ? '#803d3b' : '#FAEED1'"
                @click="selectYearLevel(1)"
              >
                Year 1
              </v-btn>
              <v-btn
                elevation="15"
                class="mx-1 mt-2"
                :color="selectedYearLevel === 2 ? '#803d3b' : '#FAEED1'"
                @click="selectYearLevel(2)"
              >
                Year 2
              </v-btn>
              <v-btn
                elevation="15"
                class="mx-1 mt-2"
                :color="selectedYearLevel === 3 ? '#803d3b' : '#FAEED1'"
                @click="selectYearLevel(3)"
              >
                Year 3
              </v-btn>
              <v-btn
                elevation="15"
                class="mx-1 mt-2"
                :color="selectedYearLevel === 4 ? '#803d3b' : '#FAEED1'"
                @click="selectYearLevel(4)"
              >
                Year 4
              </v-btn>
            </v-row>

            <!-- Semester Buttons (only visible when a year is selected) -->
            <v-row class="mb-8 justify-center" v-if="selectedYearLevel > 0">
              <v-btn
                elevation="15"
                class="mx-1 mt-2"
                :color="selectedSemester === 0 ? '#803d3b' : '#FAEED1'"
                @click="selectSemester(0)"
              >
                All Sem
              </v-btn>
              <v-btn
                elevation="15"
                class="mx-1 mt-2"
                :color="selectedSemester === 1 ? '#803d3b' : '#FAEED1'"
                @click="selectSemester(1)"
              >
                1st Sem
              </v-btn>
              <v-btn
                elevation="15"
                class="mx-1 mt-2"
                :color="selectedSemester === 2 ? '#803d3b' : '#FAEED1'"
                @click="selectSemester(2)"
              >
                2nd Sem
              </v-btn>
            </v-row>
          </div>

          <!-- Suggested Courses Section -->
          <v-row>
            <v-col>
              <h2 class="text-white">
                <v-icon class="mr-2">
                  mdi-book-open-page-variant </v-icon
                >Course List
              </h2>
            </v-col>
            <div class="d-flex justify-end mr-3 mt-3 mb-2">
              <v-btn elevation="15" class="" color="#FAEED1" @click="openAddCourseModal">
                Request
              </v-btn>
            </div>
          </v-row>
          <RequestCourseModal
            :isOpen="isAddCourseModalOpen"
            :requestedCourses="requestedCourses"
            @add-course="handleCourseRequest"
            @close="isAddCourseModalOpen = false"
          />
          <!-- Remaining page content -->
        </div>

        <v-row>
          <v-col v-for="course in filteredCourses" :key="course.id" cols="12" sm="6" md="4">
            <v-card class="pa-3" elevation="15" color="#803d3b" variant="elevated">
              <v-btn
                class="pa-0"
                color="#FAEED1"
                block
                height="150px"
                @click="recordUserHistory(course.id)"
                :to="{ name: 'CoursePage', params: { id: course.id } }"
                elevation="10"
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
      <LogoutModal ref="logoutModalRef" />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import LogoutModal from '@/components/auth/LogoutModal.vue'
import NavBar from '@/components/layout/NavBar.vue'
import RequestCourseModal from '@/components/layout/RequestCourseModal.vue'

// Reference for the Logout Modal
const logoutModalRef = ref(null)
const openLogoutModal = () => {
  logoutModalRef.value?.open()
}

// State for user information
const firstName = ref('')
const userProgramId = ref('')
const userId = ref(null) // Store the user's ID for recording history

// Selected year level (for year level buttons)
const selectedYearLevel = ref(0) // 0 represents 'All'

// Selected semester (for semester buttons)
const selectedSemester = ref(0) // 0 represents 'All Semesters'

// Search query (for search bar)
const searchQuery = ref('')

// Courses data
const courses = ref([]) // Initialize as empty array

const isAddCourseModalOpen = ref(false)
const requestedCourses = ref([])

const openAddCourseModal = () => {
  isAddCourseModalOpen.value = true
  fetchRequestedCourses()
}

// Fetch user information on mount
onMounted(async () => {
  const user = await getUserInformation()
  if (user) {
    firstName.value = user.firstname
    userProgramId.value = user.program
    userId.value = user.id // Make sure this line is correct
    console.log('User ID set to:', userId.value) // Log the user ID
    await fetchCourses()
  } else {
    console.error('Failed to get user information.')
  }
})

// Fetch user information from Supabase
async function getUserInformation() {
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error('Error fetching user information:', error.message)
    return null // Return null if there's an error
  }

  if (data.user) {
    const { user } = data
    console.log('Fetched user data:', user) // Log the fetched user data
    return {
      id: user.id,
      firstname: user.user_metadata.firstname,
      program: user.user_metadata.program
    }
  } else {
    console.warn('No user data found.')
    return null
  }
}

// Fetch courses from Supabase based on the user's program ID
async function fetchCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('program_id', userProgramId.value)

  if (error) {
    console.error('Error fetching courses:', error.message)
    return
  }

  courses.value = data // Store the fetched courses
}

// Method to handle year level selection
function selectYearLevel(yearLevel) {
  selectedYearLevel.value = yearLevel
  selectedSemester.value = 0 // Reset semester selection when year level changes
}

// Method to handle semester selection
function selectSemester(semester) {
  selectedSemester.value = semester
}

// Method to record user history when a course is clicked
async function recordUserHistory(courseId) {
  console.log('Recording history for user:', userId.value, 'Course ID:', courseId)

  const { error } = await supabase
    .from('user_history')
    .insert([{ user_id: userId.value, course_id: courseId, viewed_at: new Date().toISOString() }])

  if (error) {
    console.error('Error recording user history:', error.message)
  } else {
    console.log('User history recorded successfully')
  }
}

// Handle adding a new course request
const handleCourseRequest = async (courseDetails) => {
  try {
    const { error } = await supabase.from('request_course').insert([
      {
        course_name: courseDetails.course_name,
        program: courseDetails.program,
        description: courseDetails.description,
        user_id: userId.value,
        status: 'pending',
        created_at: new Date().toISOString()
      }
    ])

    if (error) throw error

    // Re-fetch the requested courses to get the updated list
    await fetchRequestedCourses()
  } catch (error) {
    console.error('Error adding course request:', error)
  }
}
const fetchRequestedCourses = async () => {
  if (!userId.value) {
    console.error('User ID is not set.')
    return
  }

  try {
    const { data, error } = await supabase
      .from('request_course')
      .select('*')
      .eq('user_id', userId.value)

    if (error) throw error

    requestedCourses.value = data
    console.log('Fetched requested courses:', requestedCourses.value)
  } catch (error) {
    console.error('Error fetching requested courses:', error)
  }
}

// Fetch requested courses when the component mounts
onMounted(fetchRequestedCourses)

// Computed property to filter courses based on the selected year level, semester, and user's program
const filteredCourses = computed(() => {
  let filtered = courses.value

  // Filter by year level
  if (selectedYearLevel.value > 0) {
    // Exclude 0 (All) option
    filtered = filtered.filter((course) => course.year_level === selectedYearLevel.value)
  }

  // Filter by semester
  if (selectedSemester.value > 0) {
    // Exclude 0 (All Semesters)
    filtered = filtered.filter((course) => course.semester === selectedSemester.value)
  }

  // Filter by search query
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

  // Simulate search delay
  setTimeout(() => {
    loading.value = false
  }, 1000)
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
.geometric-overlay div:nth-child(1) { top: 10%; left: 5%; transform: rotate(15deg); }
.geometric-overlay div:nth-child(2) { top: 30%; left: 25%; transform: rotate(30deg); }
.geometric-overlay div:nth-child(3) { top: 50%; left: 60%; transform: rotate(-15deg); }
.geometric-overlay div:nth-child(4) { top: 70%; left: 75%; transform: rotate(45deg); }
.geometric-overlay div:nth-child(5) { top: 20%; left: 80%; transform: rotate(10deg); }

/* Additional distinct geometric shapes */
.geometric-overlay .shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.3); /* Background for new shapes */
  opacity: 0.5; /* Opacity for better visibility */
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
</style>
