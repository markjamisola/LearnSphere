<template>
  <v-app class="animated-background description">
    <NavBar @triggerLogoutModal="openLogoutModal" />

    <v-main>
      <v-container fluid>
        <v-row class="mt-8">
          <v-col cols="12" class="text-center">
            <h1 class="text-white pb-8 font-weight-black">Starred Courses</h1>
          </v-col>
        </v-row>

        <v-row>
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
              <v-btn
                class="mb-1 mt-3 delete-button"
                color="#FAEED1"
                size="large"
                variant="elevated"
                elevation="15"
                block
                @click="deleteStarredCourse(course.id)"
              >
                REMOVE<v-icon>mdi-delete</v-icon>
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
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import LogoutModal from '@/components/auth/LogoutModal.vue'
import NavBar from '@/components/layout/NavBar.vue'

// References
const logoutModalRef = ref(null)
const starredCourses = ref([])

// Function to open logout modal
const openLogoutModal = () => {
  logoutModalRef.value?.open()
}

// Fetch starred courses from Supabase
const fetchStarredCourses = async () => {
  try {
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

      starredCourses.value = courses
    } else {
      starredCourses.value = []
    }
  } catch (error) {
    console.error('Error fetching starred courses:', error.message)
  }
}

// Delete a starred course
const deleteStarredCourse = async (courseId) => {
  try {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()
    if (userError) throw userError

    // Remove the course from starred_courses
    const { error: deleteError } = await supabase
      .from('starred_courses')
      .delete()
      .match({ user_id: user.id, course_id: courseId })

    if (deleteError) throw deleteError

    // Remove the course from local starredCourses array
    starredCourses.value = starredCourses.value.filter((course) => course.id !== courseId)
  } catch (error) {
    console.error('Error deleting starred course:', error.message)
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
  display: block;
  overflow-wrap: break-word; /* Allow long words to wrap within the container */
  white-space: normal; /* Enable text to break onto new lines */
  line-height: 1.4; /* Adjust line height for readability */
  color: #803d3b;
}

.animated-background {
  background: linear-gradient(270deg, #803d3b, #c7b793, #aa7154, #b54646);
  background-size: 800% 800%;
  animation: gradientBackground 15s ease infinite;
}

/* Style for the delete button */
.delete-button {
  z-index: 1; /* Ensure button is on top */
  position: relative;
}
</style>
