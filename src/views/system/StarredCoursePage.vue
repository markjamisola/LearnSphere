<template>
  <v-app class="animated-background description">
    <NavBar @triggerLogoutModal="openLogoutModal" />

    <v-main>
      <v-container fluid>
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
                @click="confirmRemoveCourse(course.id)"
              >
                REMOVE <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Confirmation Dialog -->
      <v-dialog v-model="showRemoveConfirm" max-width="400" class="dialog-with-blur">
        <v-card color="#FAEED1" elevation="10" class="dialog-card">
          <v-card-title class="headline text-center mt-4 mb-0">
            <v-icon large color="#803d3b">mdi-emoticon-sad-outline</v-icon>
          </v-card-title>
          <v-card-text class="font-weight-black text-center mt-0">
            <h2
              class="text-h5 text-center font-weight-black"
              style="color: #803d3b; font-family: 'Unbounded', sans-serif"
            >
              Are you sure you want to remove this course?
            </h2>
          </v-card-text>
          <v-card-actions class="justify-center dialog-actions mb-2">
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
              Yes, Remove
            </v-btn>
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
          </v-card-actions>
        </v-card>
      </v-dialog>

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
const showRemoveConfirm = ref(false)
const courseIdToRemove = ref(null)

// Function to open logout modal
const openLogoutModal = () => {
  logoutModalRef.value?.open()
}

// Open confirmation dialog before deleting
const confirmRemoveCourse = (courseId) => {
  courseIdToRemove.value = courseId
  showRemoveConfirm.value = true
}

// Remove course function with confirmation
const removeCourse = async () => {
  try {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()
    if (userError) throw userError

    const { error: deleteError } = await supabase
      .from('starred_courses')
      .delete()
      .match({ user_id: user.id, course_id: courseIdToRemove.value })

    if (deleteError) throw deleteError

    // Update starred courses locally
    starredCourses.value = starredCourses.value.filter(
      (course) => course.id !== courseIdToRemove.value
    )
    showRemoveConfirm.value = false // Close dialog after deletion
  } catch (error) {
    console.error('Error deleting starred course:', error.message)
  }
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
  max-height: 150px;
  overflow: hidden;
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
}

.delete-button {
  z-index: 1;
  position: relative;
}

.dialog-with-blur {
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
