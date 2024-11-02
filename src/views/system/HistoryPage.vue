<template>
  <v-app class="animated-background description">
    <div class="geometric-overlay"></div>
    <!-- Navigation Bar -->
    <NavBar @triggerLogoutModal="openLogoutModal" />

    <v-main>
      <v-container fluid>
        <v-row class="mt-8">
          <v-col cols="12" class="text-center">
            <h1 class="text-white font-weight-black d-flex align-items-center justify-center">
              <!-- Icon for history -->
              <v-icon large :color="textColor" style="margin-right: 10px;">
                mdi-history
              </v-icon>
              History
            </h1>
          </v-col>
        </v-row>

        <!-- Display recent courses if available -->
        <v-row v-if="recentCourses.length">
          <v-col>
            <h2 class="text-white font-weight-black text-center">Recently Viewed Courses</h2>
          </v-col>
        </v-row>

        <!-- Message when no recent courses are found -->
        <v-row v-if="!recentCourses.length">
          <v-col cols="12">
            <h2 class="text-center text-white">No recently viewed courses.</h2>
          </v-col>
        </v-row>

        <v-row>
          <!-- Loop through each recent course -->
          <v-col v-for="course in recentCourses" :key="course.id" cols="12" sm="6" md="4">
            <v-card class="pa-3 position-relative" elevation="15" color="#803d3b" variant="elevated">
              <!-- Course button linking to CoursePage -->
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
                  @click.stop="removeCourseFromHistory(course.id)"
                  style="background: none; color: #fff;" 
                >
                  <v-icon>mdi-close</v-icon> <!-- Close icon for remove button -->
                </v-btn>
              </div>
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
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import LogoutModal from '@/components/auth/LogoutModal.vue'
import NavBar from '@/components/layout/NavBar.vue'

// References
const logoutModalRef = ref(null) // Reference to the logout modal
const recentCourses = ref([]) // Holds the recent courses data

// Function to open logout modal
const openLogoutModal = () => {
  logoutModalRef.value?.open()
}

// Fetch recent courses viewed by the user
const fetchRecentCourses = async () => {
  try {
    // Get current user
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()
    if (userError) throw userError

    // Fetch user history and order by viewed_at
    const { data: userHistory, error: historyError } = await supabase
      .from('user_history')
      .select('course_id, viewed_at')
      .eq('user_id', user.id)
      .order('viewed_at', { ascending: false })

    if (historyError) throw historyError

    if (userHistory.length) {
      // Filter out duplicate course_ids, keeping only the most recent entry
      const uniqueCourses = []
      const seenCourseIds = new Set()
      for (const item of userHistory) {
        if (!seenCourseIds.has(item.course_id)) {
          uniqueCourses.push(item)
          seenCourseIds.add(item.course_id)
        }
      }

      // Map unique course_ids to fetch course details
      const courseIds = uniqueCourses.map((item) => item.course_id)
      const { data: courses, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .in('id', courseIds)

      if (courseError) throw courseError

      // Create a mapping to maintain the order based on uniqueCourses
      const courseMap = {}
      courses.forEach((course) => {
        courseMap[course.id] = course
      })

      // Map the uniqueCourses array to retrieve courses in the correct order
      recentCourses.value = uniqueCourses.map((item) => courseMap[item.course_id])
    } else {
      recentCourses.value = [] // No recent courses found
    }
  } catch (error) {
    console.error('Error fetching recent courses:', error.message)
  }
}

// Function to remove a specific course from history
const removeCourseFromHistory = async (courseId) => {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError

    // Delete course from user history
    const { error: deleteError } = await supabase
      .from('user_history')
      .delete()
      .eq('user_id', user.id)
      .eq('course_id', courseId)

    if (deleteError) throw deleteError

    // Refresh the recent courses after deletion
    await fetchRecentCourses()
  } catch (error) {
    console.error('Error removing course from history:', error.message)
  }
}

// Fetch recent courses when component mounts
onMounted(() => {
  fetchRecentCourses()
})
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/unbounded');
.fill-height {
  height: 100vh; /* Full viewport height */
}

.mobile-nav-drawer {
  backdrop-filter: blur(15px); /* Blur effect for mobile nav drawer */
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
  font-family: 'Unbounded', sans-serif; /* Custom font for description */
}

.text-center {
  padding: 10px; /* Padding for centered text */
}

.course-description {
  display: block; /* Block display for course description */
  overflow-wrap: break-word; /* Word break handling */
  white-space: normal; /* Allow normal whitespace handling */
  line-height: 1.4; /* Line height for readability */
  color: #803d3b; /* Color for course description */
}

.animated-background {
  background: linear-gradient(270deg, #803d3b, #c7b793, #aa7154, #b54646); /* Background gradient */
  background-size: 800% 800%; /* Background size for animation */
  animation: gradientBackground 15s ease infinite; /* Animation properties */
  height: 100%; /* Full height */
  overflow: hidden; /* Hide overflow */
  display: flex; /* Flexbox for centering content */
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
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

</style>
