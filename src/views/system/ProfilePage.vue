<template>
  <v-app class="background-color">
    <!-- Transparent Navigation Drawer for Mobile and Desktop -->
    <v-navigation-drawer app clipped permanent color="transparent" class="teal-darken-4" width="80">
      <v-list class="d-flex flex-column align-center justify-center fill-height">
        <v-list-item-group>
          <!-- Centered Navigation icons with links -->
          <v-list-item @click="$router.push('/home')" class="text-center">
            <v-img max-width="50" src="/public/1.png" alt="Logo"></v-img>
          </v-list-item>

          <!-- Navigation icons with links -->
          <v-list-item @click="$router.push('/home')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/home' ? 'black' : 'white'">mdi-home</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/profile')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/profile' ? 'black' : 'white'">mdi-account</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/history')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/history' ? 'black' : 'white'">mdi-history</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/about')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/about' ? 'black' : 'white'">mdi-information</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/logout')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/logout' ? 'black' : 'white'">mdi-logout</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Main content area -->
    <v-main>
      <!-- Content -->
      <v-container fluid>
        <v-row class="mt-8">
          <v-col cols="12" class="text-center">
            <h1 class="text-white">Profile</h1>
          </v-col>
        </v-row>

        <!-- Update Info Section -->
        <v-row>
          <v-col cols="12">
            <h3 class="text-white">Update Info</h3>
          </v-col>
        </v-row>

        <v-row>
          <!-- Name and ID Number Row -->
          <v-col cols="12" sm="6">
            <v-text-field label="Name" variant="solo"  hide-details></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" class="d-flex align-center">
            <v-btn color="black"  class="mt-4">Update</v-btn>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field label="ID Number" variant="solo"  hide-details></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" class="d-flex align-center">
            <v-btn color="black" class="mt-4">Update</v-btn>
          </v-col>

          <!-- College and Program Row -->
          <v-col cols="12" sm="6">
            <v-text-field label="College" variant="solo"  hide-details></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" class="d-flex align-center">
            <v-btn color="black" class="mt-4">Update</v-btn>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field label="Program" variant="solo" hide-details></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" class="d-flex align-center">
            <v-btn color="black" class="mt-4">Update</v-btn>
          </v-col>
        </v-row>

        <!-- Update Password Section -->
        <v-row>
          <v-col cols="12">
            <h3 class="text-white">Update Password</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="New Password" variant="solo" hide-details></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" class="d-flex align-center">
            <v-btn color="black"  class="mt-4">Update</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
// No CSS needed for now, just using Vuetify components and positioning
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.background-color {
  background-color: #243642; /* Your desired background color */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-white {
  color: white;
}
</style>
