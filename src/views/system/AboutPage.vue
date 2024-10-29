<template>
  <v-app class="animated-background description">
    <NavBar @triggerLogoutModal="openLogoutModal" />
    <!-- Main content area -->
    <v-main>
      <!-- Content -->
      <v-container fluid>
        <v-row class="mt-2">
          <v-col cols="12" class="text-center">
            <h1 class="text-white font-weight-black">About Us</h1>
          </v-col>
        </v-row>

        <v-col cols="12">
          <v-row class="mx-4">
            <v-card class="mx-auto pa-5" elevation="15" rounded="lg" color="#FAEED1">
              <v-card-text class="text-center">
                <span>
                  The LearnSphere is designed to help students conveniently access course materials
                  and video tutorials. Our goal is to create an efficient learning environment where
                  students can easily find the resources they need. Students can log in, select
                  their program, search for a course, and the website will automatically display
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
            <h1 class="text-white text-center font-weight-black">Mission</h1>
            <v-card class="pa-5" elevation="15" rounded="lg" color="#FAEED1">
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
            <h1 class="text-white text-center font-weight-black">Vision</h1>
            <v-card class="pa-5" elevation="15" rounded="lg" color="#FAEED1">
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

        <v-row class="mt-4">
          <v-col cols="12" class="text-center">
            <h1 class="text-white"></h1>
          </v-col>
        </v-row>

        <v-col cols="12">
          <v-row class="mx-4">
            <!-- Remove horizontal margins -->
            <v-card class="mx-auto pa-3" rounded="lg" color="transparent" width="100%" flat>
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
      <LogoutModal ref="logoutModalRef" />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

import LogoutModal from '@/components/auth/LogoutModal.vue' // Adjust path as necessary
import NavBar from '@/components/layout/NavBar.vue'
const logoutModalRef = ref(null)

const openLogoutModal = () => {
  logoutModalRef.value?.open()
}
const teamMembers = ref([
  {
    name: 'Mark Jamisola',
    socialLinks: [
      { icon: 'mdi-facebook-messenger', url: 'https://www.facebook.com/mdjamisola/' },
      { icon: 'mdi-email-arrow-right', url: 'mailto:markdaniel.jamisola@carsu.edu.ph' },
      { icon: 'mdi-account-arrow-right', url: 'https://markjamisola.github.io/' }
    ]
  },
  {
    name: 'Ushyne Esclamado',
    socialLinks: [
      {
        icon: 'mdi-facebook-messenger',
        url: 'https://www.facebook.com/profile.php?id=100006277218725'
      },
      { icon: 'mdi-email-arrow-right', url: 'mailto:ushyne.esclamadado.carsu.edu.ph' },
      { icon: 'mdi-account-arrow-right', url: 'https://uesclamado.github.io/' }
    ]
  },
  {
    name: 'Jusalyn Gimao',
    socialLinks: [
      { icon: 'mdi-facebook-messenger', url: 'https://www.facebook.com/jusalyn.gimao' },
      { icon: 'mdi-email-arrow-right', url: 'mailto:jusalyn.gimao@carsu.edu.ph' },
      { icon: 'mdi-account-arrow-right', url: 'https://jusalyngimao.github.io/' }
    ]
  }
])
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/unbounded');

.fill-height {
  height: 100vh;
}

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
.animated-background {
  background: linear-gradient(270deg, #803d3b, #c7b793, #aa7154, #b54646);
  background-size: 800% 800%;
  animation: gradientBackground 15s ease infinite;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mobile-nav-drawer {
  backdrop-filter: blur(15px);
}

.description {
  font-family: 'Unbounded', sans-serif;
}
</style>
