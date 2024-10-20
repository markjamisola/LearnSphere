<template>
  <v-app class="background-color">
    <!-- Your existing code for navigation, app bar, etc... -->

    <v-main>
      <v-container fluid>
        <!-- Other sections... -->
        <v-navigation-drawer
          v-if="$vuetify.display.mdAndUp"
          fixed
          clipped
          color="transparent"
          class="teal-darken-4"
          width="80"
          app
        >
          <v-list class="d-flex flex-column justify-space-between fill-height">
            <!-- Logo at the Top -->
            <v-list-item class="text-center">
              <v-img max-width="50" src="/logo6.png" alt="Logo"></v-img>
            </v-list-item>

            <v-list-item-group>
              <!-- Navigation icons with links -->
              <v-list-item @click="$router.push('/admin')" class="text-center">
                <v-list-item-icon>
                  <v-icon large :color="$route.path === '/admin' ? 'black' : 'white'"
                    >mdi-home</v-icon
                  >
                </v-list-item-icon>
              </v-list-item>
            </v-list-item-group>

            <!-- Log Out Button at the Bottom -->
            <v-list-item @click="openLogoutModal" class="text-center">
              <v-list-item-icon>
                <v-icon large color="white">mdi-logout</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <!-- Navigation Drawer for Mobile (overlay and toggleable) -->
        <v-navigation-drawer
          v-if="$vuetify.display.smAndDown"
          v-model="drawer"
          temporary
          app
          color="transparent mobile-nav-drawer"
          class="teal-darken-4"
          width="80"
        >
          <v-list class="d-flex flex-column align-center justify-center fill-height">
            <v-list-item-group>
              <!-- Centered Navigation icons with links -->
              <v-list-item @click="$router.push('/home')" class="text-center">
                <v-img max-width="50" src="/logo6.png" alt="Logo"></v-img>
              </v-list-item>

              <!-- Navigation icons with links -->
              <v-list-item @click="$router.push('/admin')" class="text-center">
                <v-list-item-icon>
                  <v-icon large :color="$route.path === '/admin' ? 'black' : 'white'"
                    >mdi-home</v-icon
                  >
                </v-list-item-icon>
              </v-list-item>

              <v-list-item @click="openLogoutModal" class="text-center">
                <v-list-item-icon>
                  <v-icon large color="white">mdi-logout</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
        <v-row class="mt-8">
          <v-col cols="12" class="text-center">
            <h1 class="text-white font-weight-black">Welcome Back Y/N!</h1>
          </v-col>
        </v-row>

        <!-- Button to Open Add Course Modal -->
        <v-row class="pt-3 justify-center">
          <v-btn
            class="mb-8 justify-center"
            color="#FAEED1"
            size="large"
            variant="elevated"
            elevation="15"
            @click="openAddCourseModal"
          >
            Add Course
          </v-btn>
        </v-row>

        <!-- Suggested Courses Section -->
        <v-row>
          <v-col>
            <h2 class="text-white">Course List</h2>
          </v-col>
        </v-row>

        <!-- Loop through the filteredCourses and display them -->
        <v-row>
          <v-col
            v-for="(course, index) in filteredCourses"
            :key="course.id"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card class="pa-4 mb-4" color="#FAEED1" elevation="10">
              <v-card-title class="text-center">{{ course.name }}</v-card-title>

              <!-- Delete Course Button -->
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon color="red" @click="confirmDelete(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Add Course Modal -->
        <v-dialog v-model="addCourseDialog" max-width="600px" persistent>
          <v-card class="pa-0" color="#803d3b" block elevation="10">
            <v-card-title>
              <h2 class="headline text-center">Add New Course</h2>
            </v-card-title>

            <v-card-text>
              <!-- Form for adding a new course -->
              <v-form>
                <!-- Course Name -->
                <v-text-field
                  v-model="newCourse.name"
                  label="Course Name"
                  prepend-inner-icon="mdi-book"
                  color="white"
                  required
                ></v-text-field>

                <!-- Course Topic -->
                <v-text-field
                  v-model="newCourse.topic"
                  label="Course Topic"
                  prepend-inner-icon="mdi-lightbulb-outline"
                  required
                ></v-text-field>

                <!-- Course Resources -->
                <v-textarea
                  v-model="newCourse.resources"
                  label="Course Resources (URLs, Documents, etc.)"
                  rows="3"
                  prepend-inner-icon="mdi-file-document-outline"
                  required
                ></v-textarea>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <!-- Cancel button -->
              <v-row class="mb-4">
                <v-btn
                  text
                  @click="addCourseDialog = false"
                  class="mx-2"
                  color="white"
                  variant="elevated"
                >
                  Cancel
                </v-btn>

                <!-- Save button -->
                <v-btn class="mx-2" color="#FAEED1" variant="elevated" @click="saveCourse">
                  Save
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Delete Confirmation Modal -->
        <v-dialog v-model="deleteDialog" max-width="500px">
          <v-card class="pa-0" color="#FAEED1" block elevation="10">
            <v-card-title class="headline font-weight-black text-center mt-2">Confirm Deletion</v-card-title>
            <v-card-text class="text-center">
              <p>Are you sure you want to delete this course?</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-row class="mb-2">
              <v-btn class="mx-2" color="#803d3b" variant="elevated" text @click="deleteDialog = false"> Cancel </v-btn>
              <v-btn class="mx-2" color="whtie" variant="elevated" text @click="deleteCourse"> Delete </v-btn>
            </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <LogoutModal ref="logoutModalRef" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import LogoutModal from '@/components/auth/LogoutModal.vue' // Adjust path as necessary

// Reference for the Logout Modal
const logoutModalRef = ref(null)
const openLogoutModal = () => {
  logoutModalRef.value.open()
}

// Drawer state for mobile
const drawer = ref(false)

// Search query (for search bar)
const searchQuery = ref('')

// Add Course Modal state
const addCourseDialog = ref(false)

// Delete Confirmation Modal state
const deleteDialog = ref(false)
let courseIndexToDelete = ref(null)

// New Course details
const newCourse = ref({
  name: '',
  topic: '',
  resources: ''
})

// Function to open the Add Course modal
const openAddCourseModal = () => {
  addCourseDialog.value = true
}

// Function to save the new course (you can extend this to handle back-end integration)
const saveCourse = () => {
  // For simplicity, just pushing the new course to the courses array
  courses.value.push({
    id: courses.value.length + 1,
    name: newCourse.value.name,
    category: 'it', // Set category based on some logic, or add a dropdown for the category
    route: '/new-course' // Placeholder route, you can change this
  })

  // Close the dialog and reset the form
  addCourseDialog.value = false
  newCourse.value = { name: '', topic: '', resources: '' }
}

// Function to confirm delete
const confirmDelete = (index) => {
  courseIndexToDelete.value = index
  deleteDialog.value = true
}

// Function to delete the course after confirmation
const deleteCourse = () => {
  if (courseIndexToDelete.value !== null) {
    courses.value.splice(courseIndexToDelete.value, 1)
    deleteDialog.value = false
    courseIndexToDelete.value = null
  }
}

// Courses data
const courses = ref([
  { id: 1, name: 'IT 109', category: 'it', route: '/it-109' },
  { id: 2, name: 'ITE 12', category: 'ite', route: '/ite12' },
  { id: 3, name: 'CSC 102', category: 'csc', route: '/csc102' },
  { id: 4, name: 'IT 108', category: 'it', route: '/it-108' },
  { id: 5, name: 'ITE 13', category: 'ite', route: '/ite13' },
  { id: 6, name: 'CSC 106', category: 'csc', route: '/csc106' }
])

// Computed property to filter courses based on the selected category and search query
const filteredCourses = computed(() => {
  let filtered = courses.value

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter((course) =>
      course.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return filtered
})
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.background-color {
  background-color: #803d3b; /* Your desired background color */
  height: 100%;
}

.mobile-nav-drawer {
  backdrop-filter: blur(15px);
}
</style>
