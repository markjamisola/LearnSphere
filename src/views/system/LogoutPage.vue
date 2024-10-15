<template>
  <v-app class="background-color">
    <!-- Navigation Drawer for Mobile and Desktop -->
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
    <v-main class="d-flex">
      <v-container>
        <v-img class="mx-auto my-15" max-width="150" src="/logo6.png"></v-img>
        <v-card
          class="mx-auto pa-8 pb-5 align-self-center"
          elevation="8"
          max-width="448"
          rounded="lg"
          color="#FAEED1"
        >
          <template v-slot:title>
            <div class="text-center">
              <v-icon large :color="$route.path === '/history'">mdi-emoticon-sad-outline</v-icon>
            </div>
          </template>

          <h3 class="font-weight-black text-center pb-9">Are you sure you want to Log Out?</h3>

          <v-btn
            class="mb-8"
            color="black"
            size="large"
            variant="outlined"
            block
            @click="$router.push('/login')"
          >
            Log Out
          </v-btn>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false) // Drawer state for mobile
</script>

<style scoped>
.background-color {
  background-color: #803D3B; /* Your desired background color */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fill-height {
  height: 100%; /* Ensure the container fills the available height */
}

.mobile-nav-drawer {
  backdrop-filter: blur(15px);
}
</style>
