<template>
  <v-app class="background-color">
    <!-- Transparent Navigation Drawer for Mobile and Desktop -->
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
          <v-list-item @click="$router.push('/home')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/home' ? 'black' : 'white'"
                >mdi-home</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/profile')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/profile' ? 'black' : 'white'"
                >mdi-account</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/history')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/history' ? 'black' : 'white'"
                >mdi-history</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/about')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/about' ? 'black' : 'white'"
                >mdi-information</v-icon
              >
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>

        <!-- Log Out Button at the Bottom -->
        <v-list-item @click="$router.push('/logout')" class="text-center">
          <v-list-item-icon>
            <v-icon large :color="$route.path === '/logout' ? 'black' : 'white'"
              >mdi-logout</v-icon
            >
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
          <v-list-item @click="$router.push('/home')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/home' ? 'black' : 'white'"
                >mdi-home</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/profile')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/profile' ? 'black' : 'white'"
                >mdi-account</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/history')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/history' ? 'black' : 'white'"
                >mdi-history</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/about')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/about' ? 'black' : 'white'"
                >mdi-information</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/logout')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/logout' ? 'black' : 'white'"
                >mdi-logout</v-icon
              >
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- App bar with toggle button only for mobile screens -->
    <v-app-bar v-if="$vuetify.display.smAndDown" app color="transparent" class="mobile-nav-drawer">
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-white font-weight-black">LearnSphere</v-toolbar-title>
    </v-app-bar>

    <!-- Main content area -->
    <v-main>
      <!-- Content -->
      <v-container fluid>
        <v-row class="mt-8">
          <v-col cols="12" class="text-center">
            <h1 class="text-white font-weight-black">Time to STUDY! Y/N!</h1>
          </v-col>
        </v-row>

        <!-- Search Course Bar -->
        <v-row class="justify-center mb-8 mx-auto">
          <v-col cols="12" sm="8" md="6">
            <v-text-field
              :loading="loading"
              append-inner-icon="mdi-magnify"
              prepend-inner-icon="mdi-cast-education"
              density="comfortable"
              label="Search Course"
              variant="solo"
              hide-details
              single-line
              elevation="10"
              color="deep-purple-darken-3"
              outlined
              @click:append-inner="onClick"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="mb-8 justify-center">
          <v-btn class="mx-1 mt-2"
            :color="selectedCategory === 'all' ? 'white' : '#FAEED1'"
            @click="selectedCategory = 'all'"
          >
            All
          </v-btn>
          <v-btn class="mx-1 mt-2"
            :color="selectedCategory === 'it' ? 'white' : '#FAEED1'"
            @click="selectedCategory = 'it'"
          >
            IT Courses
          </v-btn>
          <v-btn class="mx-1 mt-2"
            :color="selectedCategory === 'ite' ? 'white' : '#FAEED1'"
            @click="selectedCategory = 'ite'"
          >
            ITE Courses
          </v-btn>
          <v-btn class="mx-1 mt-2"
            :color="selectedCategory === 'csc' ? 'white' : '#FAEED1'"
            @click="selectedCategory = 'csc'"
          >
            CSC Courses
          </v-btn>
        </v-row>

        <!-- Suggested Courses Section -->
        <v-row>
          <v-col>
            <h2 class="text-white">Suggested Course</h2>
          </v-col>
        </v-row>

        <v-row>
          <!-- Loop through the filteredCourses and display them -->
          <v-col v-for="course in filteredCourses" :key="course.id" cols="12" sm="6" md="4">
            <v-btn
              class="pa-0"
              color="#FAEED1"
              block
              height="150px"
              @click="$router.push(course.route)"
              elevation="10"
            >
              <h1 class="text-center">{{ course.name }}</h1>
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <!-- Course Card 1 -->
        
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'

const drawer = ref(false) // Drawer state for mobile
</script>
<script>
export default {
  data: () => ({
    loaded: false,
    loading: false
  }),

  methods: {
    onClick() {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    }
  }
}


// The selected category
const selectedCategory = ref('all')

// The courses data
const courses = ref([
  { id: 1, name: 'IT - 109', category: 'it', route: '/it-109' },
  { id: 2, name: 'ITE - 12', category: 'ite', route: '/ite12' },
  { id: 3, name: 'CSC - 102', category: 'csc', route: '/csc102' },
  // Add more courses here...
])

// Computed property to filter courses based on the selected category
const filteredCourses = computed(() => {
  if (selectedCategory.value === 'all') {
    return courses.value // Show all courses if 'all' is selected
  }
  return courses.value.filter(course => course.category === selectedCategory.value)
})
</script>



<style scoped>
.fill-height {
  height: 100vh;
}

.background-color {
  background-color: #803d3b; /* Your desired background color */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mobile-nav-drawer {
  backdrop-filter: blur(15px);
}
</style>
