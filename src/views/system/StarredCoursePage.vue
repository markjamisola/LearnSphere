<template>
  <v-app class="animated-background description">
    <!-- Navbar component with logout functionality -->
    <NavBar @triggerLogoutModal="openLogoutModal" />

    <v-main>
      <v-container fluid>
        <!-- Display header for starred courses or a message if none exist -->
        <v-row class="mt-8 d-flex" v-if="starredCourses.length">
          <v-col cols="12" class="text-center">
            <h1 class="text-white font-weight-black align-items-center justify-center">
              <v-icon large :color="textColor" > mdi-star </v-icon>
              Starred Courses
            </h1>
          </v-col>
        </v-row>

        <v-row class="mt-8  d-flex" v-else>
          <v-col cols="12" class="text-center">
            <h1 class="text-white font-weight-black align-items-center justify-center">
              <v-icon large :color="textColor">
                mdi-alert-circle-outline
              </v-icon>
              You have no Starred Courses
            </h1>
          </v-col>
        </v-row>

        <v-row>
          <!-- Loop through starred courses and display each one -->
          <v-col v-for="course in starredCourses" :key="course.id" cols="12" sm="6" md="4">
            <v-card class="pa-3 position-relative" elevation="15" color="#803d3b">
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

              <!-- Remove Button Box -->
              <div
                class="remove-button-box position-absolute"
                style="top: -10px; right: -10px; background-color: #803d3b; border-radius: 50%; padding: 5px;"
              >
                <v-btn
                  icon
                  @click.stop="confirmRemoveCourse(course.id)"
                  style="background: none; color: #fff;"
                >
                  <v-icon>mdi-close</v-icon> <!-- Close icon for remove button -->
                </v-btn>
              </div>
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
            <h3 style="color: #803d3b">Please confirm your decision.</h3>
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
                  background-color: #803d3b;
                  color: #faeed1;
                  font-family: 'Unbounded', sans-serif;
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
const logoutModalRef = ref(null) // Reference to open the logout modal
const starredCourses = ref([]) // Holds list of starred courses
const showRemoveConfirm = ref(false) // Controls display of removal confirmation dialog
const courseIdToRemove = ref(null) // Stores course ID to be removed

// Function to open logout modal
const openLogoutModal = () => {
  logoutModalRef.value?.open()
}

// Open confirmation dialog before deleting a course
const confirmRemoveCourse = (courseId) => {
  courseIdToRemove.value = courseId // Set the course ID to remove
  showRemoveConfirm.value = true // Display the remove confirmation dialog
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
    showRemoveConfirm.value = false // Close confirmation dialog
  } catch (error) {
    console.error('Error deleting starred course:', error.message)
  }
}

// Fetch starred courses from Supabase when the component mounts
const fetchStarredCourses = async () => {
  try {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()
    if (userError) throw userError

    const { data: starred, error: starredError } = await supabase
      .from('starred_courses')
      .select('course_id')
      .eq('user_id', user.id)

    if (starredError) throw starredError

    if (starred.length) {
      const courseIds = starred.map((item) => item.course_id)

      const { data: courses, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .in('id', courseIds)

      if (courseError) throw courseError

      starredCourses.value = courses // Set the fetched courses to starredCourses
    } else {
      starredCourses.value = [] // Set to empty if no starred courses
    }
  } catch (error) {
    console.error('Error fetching starred courses:', error.message)
  }
}

// Fetch starred courses when component mounts
onMounted(() => {
  fetchStarredCourses() // Trigger fetch on component mount
})
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/unbounded');

/* Global height setting for full viewport */
.fill-height {
  height: 100vh;
}

/* Blur effect for mobile navigation drawer */
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

/* Font family for description texts */
.description {
  font-family: 'Unbounded', sans-serif;
}

/* Button height restriction and overflow */
.v-btn {
  max-height: 150px;
  overflow: hidden;
}

/* Center text padding */
.text-center {
  padding: 10px;
}

/* Styling for course description */
.course-description {
  display: block;
  overflow-wrap: break-word;
  white-space: normal;
  line-height: 1.4;
  color: #803d3b;
}

/* Animated gradient background */
.animated-background {
  background: linear-gradient(270deg, #803d3b, #c7b793, #aa7154, #b54646);
  background-size: 800% 800%;
  animation: gradientBackground 15s ease infinite;
}

/* Stack order and positioning for delete button */
.delete-button {
  z-index: 1;
  position: relative;
}

/* Blur effect for dialog background */
.dialog-with-blur {
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
