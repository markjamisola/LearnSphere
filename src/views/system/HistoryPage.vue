<template>
  <v-app class="background-color">
    <!-- Transparent Navigation Drawer for Mobile and Desktop -->
    <NavBar />

    <!-- Main content area -->
    <v-main>
      <!-- Content -->
      <v-container fluid>
        <v-row class="mt-8">
          <v-col cols="12" class="text-center">
            <h1 class="text-white pb-8 font-weight-black">History</h1>
          </v-col>
        </v-row>

        <v-row> </v-row>
        <!-- Suggested Courses Section -->
        <v-row>
          <v-col>
            <h2 class="text-white font-weight-black">Recently Viewed Course</h2>
          </v-col>
        </v-row>

        <v-row>
          <!-- Course Card 1 -->
          <!-- Course Card 2 -->
          <v-col cols="12" sm="6" md="4">
            <v-btn
              class="pa-0"
              color="#FAEED1"
              block
              height="150px"
              @click="$router.push('/it-109')"
              elevation="15"
            >
              <h1 class="text-center">IT 109</h1>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <LogoutModal ref="logoutModalRef" />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

import LogoutModal from '@/components/auth/LogoutModal.vue' // Adjust path as necessary
import NavBar from '@/components/layout/NavBar.vue'
const logoutModalRef = ref(null)
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
