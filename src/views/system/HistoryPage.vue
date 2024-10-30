<template>
  <v-app class="animated-background description">
    <NavBar @triggerLogoutModal="openLogoutModal" />

    <v-main>
      <v-container fluid>
        <v-row class="mt-8">
          <v-col cols="12" class="text-center">
            <h1 class="text-white pb-8 font-weight-black">History</h1>
          </v-col>
        </v-row>

        <v-row v-if="recentCourses.length">
          <v-col>
            <h2 class="text-white font-weight-black text-center">Recently Viewed Courses</h2>
          </v-col>
        </v-row>
        <v-row v-if="!recentCourses.length">
          <v-col cols="12">
            <h2 class="text-center text-white">No recently viewed courses.</h2>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="course in recentCourses" :key="course.id" cols="12" sm="6" md="4">
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
          </v-col>
        </v-row>
      </v-container>

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
const logoutModalRef = ref(null)
const recentCourses = ref([])

// Function to open logout modal
const openLogoutModal = () => {
  logoutModalRef.value?.open()
}

// Record course view in user history

// Fetch recently viewed courses
const fetchRecentCourses = async () => {
  try {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()
    if (userError) throw userError

    // Fetch user history, limiting to the last 6 viewed courses
    const { data: userHistory, error: historyError } = await supabase
      .from('user_history')
      .select('course_id')
      .eq('user_id', user.id)
      .order('viewed_at', { ascending: false }) // Correctly orders by viewed_at descending
      .limit(6)

    if (historyError) throw historyError

    if (userHistory.length) {
      const courseIds = userHistory.map((item) => item.course_id)
      const { data: courses, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .in('id', courseIds)

      if (courseError) throw courseError

      // Create a mapping to maintain the order based on userHistory
      const courseMap = {}
      courses.forEach((course) => {
        courseMap[course.id] = course
      })

      // Map the userHistory array to retrieve courses in the correct order
      recentCourses.value = userHistory.map((item) => courseMap[item.course_id])
    } else {
      recentCourses.value = []
    }
  } catch (error) {
    console.error('Error fetching recent courses:', error.message)
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

.v-btn {
  max-height: 150px; /* Adjust as needed */
  overflow: hidden; /* Hide overflow */
}

.text-center {
  padding: 10px; /* Add some padding to ensure text is not cramped */
}
.course-description {
  display: -webkit-box; /* Use the flexible box layout model */
  -webkit-box-orient: vertical; /* Set the box orientation to vertical */
  overflow: hidden; /* Hide overflow text */
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  line-height: 1.2em; /* Adjust line height */
  max-height: 2.4em; /* Maximum height for 2 lines */
  text-overflow: ellipsis; /* Add ellipsis for overflowing text */
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
</style>
