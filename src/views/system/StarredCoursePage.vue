<template>
  <v-app class="animated-background description">
    <!-- Navbar component with logout functionality -->
    <NavBar @triggerLogoutModal="openLogoutModal" />

    <v-main>
      <v-container fluid>
        <!-- Display header for starred courses or a message if none exist -->
        <v-row class="mt-8" v-if="starredCourses.length">
          <v-col cols="12" class="text-center">
            <h1 class="text-white font-weight-black">Starred Courses</h1>
          </v-col>
        </v-row>
        <v-row class="mt-8" v-if="!starredCourses.length">
          <v-col cols="12" class="text-center">
            <h1 class="text-white font-weight-black">You have no Starred Courses</h1>
          </v-col>
        </v-row>

        <v-row>
          <!-- Loop through starred courses and display each one -->
          <v-col v-for="course in starredCourses" :key="course.id" cols="12" sm="6" md="4">
            <v-card class="pa-3" elevation="15" color="#803d3b" variant="elevated">
              <v-btn
                class="pa-0"
                color="#FAEED1"
                block
                height="150px"
                :to="{ name: 'CoursePage', params: { id: course.id } }"
                elevation="15"
              >
                <div class="text-center">
                  <h1 class="text-center">{{ course.course_name }}</h1>
                  <v-card class="pa-3" color="#803d3b" variant="outlined">
                    <h5 class="course-description">{{ course.description }}</h5>
                  </v-card>
                </div>
              </v-btn>
              <!-- Button to remove the course with confirmation -->
              <v-btn
                class="mb-1 mt-3 delete-button"
                color="#FAEED1"
                size="large"
                variant="elevated"
                elevation="15"
                block
                @click="confirmRemoveCourse(course.id)"
              >
                REMOVE <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Confirmation Dialog for course removal -->
      <v-dialog v-model="showRemoveConfirm" max-width="500px" class="dialog-with-blur">
        <v-card class="mx-auto pa-3" elevation="15" rounded="lg" color="#FAEED1">
          <v-card-title class="font-weight-black text-center description">
            Confirm Removal
          </v-card-title>
          <v-card-text class="text-center text-black text-caption description">
            <h3>Are you sure you want to remove this course?</h3>
            <h3 class="text-red-darken-4">Please confirm your decision.</h3>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-row>
              <!-- Button to confirm the removal of the course -->
              <v-btn
                color="#FAEED1"
                text
                class="confirm-btn font-weight-bold"
                @click="removeCourse"
                style="
                  background-color: white;
                  color: #803d3b;
                  font-family: 'Unbounded', sans-serif;
                  margin-right: 5px;
                "
              >
                Remove
              </v-btn>
              <!-- Button to cancel the removal -->
              <v-btn
                color="#FAEED1"
                text
                class="cancel-btn font-weight-bold"
                @click="showRemoveConfirm = false"
                style="
                  font-family: 'Unbounded', sans-serif;
                  background-color: #803d3b;
                  color: #faeed1;
                  margin-left: 5px;
                "
              >
                No
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Logout modal component -->
      <LogoutModal ref="logoutModalRef" />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import LogoutModal from '@/components/auth/LogoutModal.vue'
import NavBar from '@/components/layout/NavBar.vue'

// References for state management
const logoutModalRef = ref(null)  // Reference for logout modal
const starredCourses = ref([])     // Array to hold starred courses
const showRemoveConfirm = ref(false) // Control for confirmation dialog
const courseIdToRemove = ref(null)   // Store the ID of the course to remove

// Function to open logout modal
const openLogoutModal = () => {
  logoutModalRef.value?.open()
}

// Open confirmation dialog before deleting a course
const confirmRemoveCourse = (courseId) => {
  courseIdToRemove.value = courseId // Set the course ID to remove
  showRemoveConfirm.value = true // Show confirmation dialog
}

// Remove course function with confirmation
const removeCourse = async () => {
  try {
    // Get the currently authenticated user
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()
    if (userError) throw userError

    // Remove the course from the starred_courses table
    const { error: deleteError } = await supabase
      .from('starred_courses')
      .delete()
      .match({ user_id: user.id, course_id: courseIdToRemove.value })

    if (deleteError) throw deleteError

    // Update starred courses locally after successful deletion
    starredCourses.value = starredCourses.value.filter(
      (course) => course.id !== courseIdToRemove.value
    )
    showRemoveConfirm.value = false // Close dialog after deletion
  } catch (error) {
    console.error('Error deleting starred course:', error.message)
  }
}

// Fetch starred courses from Supabase when the component mounts
const fetchStarredCourses = async () => {
  try {
    // Get the currently authenticated user
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()
    if (userError) throw userError

    // Fetch starred courses for the logged-in user
    const { data: starred, error: starredError } = await supabase
      .from('starred_courses')
      .select('course_id')
      .eq('user_id', user.id)

    if (starredError) throw starredError

    if (starred.length) {
      // Extract unique course IDs from the starred courses
      const courseIds = starred.map((item) => item.course_id)

      // Fetch course details for the starred courses
      const { data: courses, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .in('id', courseIds)

      if (courseError) throw courseError

      starredCourses.value = courses // Update starred courses with fetched data
    } else {
      starredCourses.value = [] // No starred courses found
    }
  } catch (error) {
    console.error('Error fetching starred courses:', error.message)
  }
}

// Fetch starred courses when component mounts
onMounted(() => {
  fetchStarredCourses()
})
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/unbounded');

.fill-height {
  height: 100vh; /* Full viewport height */
}

.mobile-nav-drawer {
  backdrop-filter: blur(15px); /* Blur effect for mobile navigation */
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
  font-family: 'Unbounded', sans-serif; /* Font family for description */
}

.v-btn {
  max-height: 150px; /* Limit button height */
  overflow: hidden; /* Hide overflow content */
}

.text-center {
  padding: 10px; /* Padding for center text */
}

.course-description {
  display: block;
  overflow-wrap: break-word; /* Break words to prevent overflow */
  white-space: normal; /* Allow normal text wrapping */
  line-height: 1.4; /* Line height for readability */
  color: #803d3b; /* Text color for course descriptions */
}

.animated-background {
  background: linear-gradient(270deg, #803d3b, #c7b793, #aa7154, #b54646); /* Animated gradient background */
  background-size: 800% 800%; /* Background size for animation */
  animation: gradientBackground 15s ease infinite; /* Animation properties */
}

.delete-button {
  z-index: 1; /* Stack order for delete button */
  position: relative; /* Relative positioning */
}

.dialog-with-blur {
  backdrop-filter: blur(10px); /* Blur effect for the dialog background */
  background-color: rgba(0, 0, 0, 0.3); /* Semi-transparent background color */
}
</style>
