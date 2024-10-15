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

    <!-- Overlay for blur effect -->
    <v-overlay v-if="drawer" :absolute="true" class="overlay" z-index="1">
      <div class="bg-black bg-opacity-50" style="backdrop-filter: blur(50px); height: 100%"></div>
    </v-overlay>

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
              <v-icon large :color="$route.path === '/home' ? '#000' : 'white'">mdi-home</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/profile')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/profile' ? '#000' : 'white'"
                >mdi-account</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/history')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/history' ? '#000' : 'white'"
                >mdi-history</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/about')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/about' ? '#000' : 'white'"
                >mdi-information</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/logout')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/logout' ? '#000' : 'white'"
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
    <!-- Main content area -->
    <v-main>
      <v-container fluid>
        <!-- Profile Title -->
        <v-row class="mt-8 justify-center">
          <v-col cols="12" class="text-center">
            <h1 class="text-white font-weight-black">Profile</h1>
          </v-col>
        </v-row>

        <!-- Form Section -->
        <v-row class="justify-center">
          <!-- Name and ID Number Row -->
          <v-col cols="12" sm="8" md="4">
            <h3 class="text-white pb-5">Personal Information</h3>
            <v-text-field
              label="Name"
              variant="solo"
              hide-details
              prepend-inner-icon="mdi-account-outline"
            >
              <template v-slot:append-inner>
                <v-btn color="#803D3B" small>Update</v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row class="justify-center">
          <v-col cols="12" sm="8" md="4">
            <v-text-field
              label="ID Number"
              variant="solo"
              hide-details
              prepend-inner-icon="mdi-card-account-details-outline"
            >
              <template v-slot:append-inner>
                <v-btn color="#803D3B" small>Update</v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>

        <!-- College Row -->
        <v-row class="justify-center">
          <v-col cols="12" sm="8" md="4">
            <v-select
              :items="['CCIS']"
              placeholder="College"
              prepend-inner-icon="mdi-school-outline"
              variant="solo"
            ></v-select>
            <v-btn color="#FAEED1" class="mt-0" block>Update</v-btn>
          </v-col>
        </v-row>

        <!-- Program Row -->
        <v-row class="justify-center">
          <v-col cols="12" sm="8" md="4">
            <v-select
              :items="['Information Technology', 'Computer Science', 'Information System']"
              placeholder="Program"
              prepend-inner-icon="mdi-laptop"
              variant="solo"
            ></v-select>
            <v-btn color="#FAEED1" class="mt-0" block>Update</v-btn>
          </v-col>
        </v-row>
        <!-- Update Password Section -->

        <v-row class="justify-center">
          <v-col cols="12" sm="8" md="4">
            <h3 class="text-white pb-5">Reset Password</h3>
            <v-text-field
              label="New Password"
              variant="solo"
              hide-details
              prepend-inner-icon="mdi-lock-outline"
            >
              <template v-slot:append-inner>
                <v-btn color="#803D3B" small>Update</v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false) // Drawer state for mobile
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.background-color {
  background-color: #803D3B; /* Your desired background color */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mobile-nav-drawer {
  backdrop-filter: blur(15px);
}
</style>
