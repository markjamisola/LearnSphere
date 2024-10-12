<template>
  <v-app class="background-color">
    <!-- Transparent Navigation Drawer for Mobile and Desktop -->
    <v-navigation-drawer app clipped permanent color="transparent" class="teal-darken-4" width="80">
      <v-list  class="d-flex flex-column align-center justify-center fill-height">
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
              <v-icon large :color="$route.path === '/login' ? 'black' : 'white'">mdi-logout</v-icon>
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
            <h1 class="text-white">Welcome Back Fersonability</h1>
          </v-col>
        </v-row>

            <!-- Search Course Bar -->
        <v-row class="justify-center mb-8 mx-auto">
          <v-col cols="12" sm="8" md="6">
            <v-text-field
              class="search-bar"
              placeholder="Search Course"
              append-inner-icon="mdi-magnify"
              single-line
              hide-details
              solo
              color="blue-grey-darken-1"
              background-color="blue-grey-darken-1"
              outlined
               variant="solo"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Suggested Courses Section -->
        <v-row>
          <v-col>
            <h2 class="text-white">Suggested Course</h2>
          </v-col>
        </v-row>

        <v-row>
          <!-- Course Card 1 -->
            <!-- Course Card 2 -->
          <v-col cols="12" sm="6" md="4">
            <v-btn
              class="pa-0"
              color="blue-grey-darken-1"
              block
              height="150px"
              @click="$router.push('/it-109')"
            >
              <h1 class="text-center">IT - 109</h1>
            </v-btn>
          </v-col>

          <!-- Course Card 2 -->
          <v-col cols="12" sm="6" md="4">
            <v-btn
              class="pa-0"
              color="blue-grey-darken-1"
              block
              height="150px"
              @click="$router.push('/it-109')"
            >
              <h1 class="text-center">IT - 109</h1>
            </v-btn>
          </v-col>

          <!-- Course Card 3 -->
           <!-- Course Card 2 -->
          <v-col cols="12" sm="6" md="4">
            <v-btn
              class="pa-0"
              color="blue-grey-darken-1"
              block
              height="150px"
              @click="$router.push('/it-109')"
            >
              <h1 class="text-center">IT - 109</h1>
            </v-btn>
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
</style>
