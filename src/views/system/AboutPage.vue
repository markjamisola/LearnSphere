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
              <v-icon large :color="$route.path === '/home' ? 'deep-purple-darken-3' : 'white'">mdi-home</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/profile')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/profile' ? 'deep-purple-darken-3' : 'white'"
                >mdi-account</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/history')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/history' ? 'deep-purple-darken-3' : 'white'"
                >mdi-history</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/about')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/about' ? 'deep-purple-darken-3' : 'white'"
                >mdi-information</v-icon
              >
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>

        <!-- Log Out Button at the Bottom -->
        <v-list-item @click="$router.push('/logout')" class="text-center">
          <v-list-item-icon>
            <v-icon large :color="$route.path === '/logout' ? 'deep-purple-darken-3' : 'white'">mdi-logout</v-icon>
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
              <v-icon large :color="$route.path === '/home' ? 'deep-purple-darken-3' : 'white'">mdi-home</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/profile')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/profile' ? 'deep-purple-darken-3' : 'white'"
                >mdi-account</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/history')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/history' ? 'deep-purple-darken-3' : 'white'"
                >mdi-history</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/about')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/about' ? 'deep-purple-darken-3' : 'white'"
                >mdi-information</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/logout')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/logout' ? 'deep-purple-darken-3' : 'white'"
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
      <v-toolbar-title class="text-white font-weight-black ">LearnSphere</v-toolbar-title>
    </v-app-bar>
    

    <!-- Main content area -->
    <v-main>
      <!-- Content -->
      <v-container fluid>
        <v-row class="mt-10">
          <v-col cols="12" class="text-center">
            <h1 class="text-white font-weight-black ">About Us</h1>
          </v-col>
        </v-row>

        <v-col cols="12">
          <v-row class="mx-4">
            <v-card class="mx-auto pa-5" elevation="8" rounded="lg" color="deep-purple-darken-3">
              <v-card-text class="text-justify">
                <span>
                  The LearnSphere is designed to help students conveniently access course materials
                  and video tutorials. Our goal is to create an efficient learning environment where
                  students can easily find the resources they need. Students can log in, select
                  their college, search for a subject, and the website will automatically display
                  relevant video tutorials and PDFs, saving time and effort. The goal is to make
                  learning more convenient by offering direct access to curated video content,
                  tailored to the students' academic needs.
                </span>
              </v-card-text>
            </v-card>
          </v-row>
        </v-col>

        <!-- Mission and Vision Cards -->

        <v-row class="mx-4 mt-8" justify="center">
          <v-col cols="12" md="6">
            <h1 class="text-white text-center font-weight-black ">Mission</h1>
            <v-card class="pa-5" elevation="8" rounded="lg" color="deep-purple-darken-3">
              <v-card-text class="text-justify white--text">
                <span>
                  Our mission is to empower students by offering a centralized platform where they
                  can easily find the courses and tutorials they need to excel in their studies. We
                  understand that students often face challenges finding quality resources, and our
                  platform aims to bridge that gap.
                </span>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <h1 class="text-white text-center font-weight-black ">Vision</h1>
            <v-card class="pa-5" elevation="8" rounded="lg" color="deep-purple-darken-3">
              <v-card-text class="text-justify white--text">
                <span>
                  Our vision is to continue expanding the portal to include more programs and
                  course, making it a valuable resource for all CSUan students who aims to be
                  successful. We aim to integrate more advanced features like personalized learning
                  plans and interactive study tools in the near future.
                </span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-4" >
          <v-col cols="12" class="text-center">
            <h1 class="text-white"></h1>
          </v-col>
        </v-row>

        <v-col cols="12">
          <v-row class="mx-4">
            <!-- Remove horizontal margins -->
            <v-card
              class="mx-auto pa-3"

              rounded="lg"
              color="transparent"
              width="100%"
              flat
            >
              <template v-slot:title>
                <h3 class="font-weight-black text-white text-center">Contact Us</h3>
              </template>

              <!-- Team Members Section -->
              <v-row class="mb-2">
                <v-col
                  v-for="(member, index) in teamMembers"
                  :key="index"
                  cols="12"
                  sm="4"
                  class="text-center"
                >
                  <h4 class="text-white pb-2">{{ member.name }}</h4>
                  <v-row class="justify-center">
                    <v-col
                      v-for="(link, linkIndex) in member.socialLinks"
                      :key="linkIndex"
                      cols="auto"
                    >
                      <v-btn icon :href="link.url" target="_blank">
                        <v-icon>{{ link.icon }}</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-row>
        </v-col>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(false) // Drawer state for mobile
const teamMembers = ref([
  {
    name: 'Mark Jamisola',
    socialLinks: [
      { icon: 'mdi-facebook-messenger', url: 'https://www.facebook.com/mdjamisola/' },
      { icon: 'mdi-email-edit-outline', url: 'mailto:markdaniel.jamisola@carsu.edu.ph' },
      { icon: 'mdi-laptop', url: 'https://markjamisola.github.io/' }
    ]
  },
  {
    name: 'Ushyne Esclamado',
    socialLinks: [
      { icon: 'mdi-facebook-messenger', url: 'https://www.facebook.com/profile.php?id=100006277218725' },
      { icon: 'mdi-email-edit-outline', url: 'mailto:ushyne.esclamadado.carsu.edu.ph' },
      { icon: 'mdi-laptop', url: 'https://uesclamado.github.io/' }
    ]
  },
  {
    name: 'Jusalyn Gimao',
    socialLinks: [
      { icon: 'mdi-facebook-messenger', url: 'https://www.facebook.com/jusalyn.gimao' },
      { icon: 'mdi-email-edit-outline', url: 'mailto:jusalyn.gimao@carsu.edu.ph' },
      { icon: 'mdi-laptop', url: 'https://jusalyngimao.github.io/' }
    ]
  }
])

</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.background-color {
  background-color: #17153b; /* Your desired background color */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mobile-nav-drawer {
  backdrop-filter: blur(15px);
}
</style>
