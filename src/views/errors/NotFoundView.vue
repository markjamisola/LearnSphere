<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'


// Router instance
const router = useRouter()

// Dialog for contact support
const contactDialog = ref(false)

// Check if the user is logged in using Supabase
const isLoggedIn = ref(false)

// Fetch user session
const fetchSession = async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession()
  isLoggedIn.value = !!session
}

// Call fetchSession on component load
fetchSession()

// Dynamic button text
const buttonText = computed(() => (isLoggedIn.value ? 'Go Back to Home' : 'Go Back to Login'))

// Redirect logic
const redirectUser = () => {
  if (isLoggedIn.value) {
    router.push({ name: 'home' }) // Redirect to /home
  } else {
    router.push({ name: 'login' }) // Redirect to /login
  }
}
</script>

<template>
  <v-responsive>
    <v-app class="animated-background">
      <!-- Floating Icons in Background -->
      <div class="anim-elements">
        <div
          class="anim-element"
          v-for="(icon, index) in icons"
          :key="index"
          :style="{
            '--i': index + 1,
            top: `${Math.random() * 120}vh`,
            left: `${Math.random() * 150}vw`,
            animationDuration: `${10 + Math.random() * 10}s`,
            fontSize: `${20 + Math.random() * 40}px`
          }"
        >
          <i :class="icon"></i>
        </div>
      </div>
      <v-alert v-if="errorMessage" type="error" class="mt-4">
        {{ errorMessage }}
      </v-alert>

      <v-container fluid>
        <v-row class="align-center justify-center" align="center" justify="center">
          <v-col>
            <v-img class="mx-auto mb-0 mt-1" max-width="228" src="/newlogo.png"></v-img>
            <v-card
              class="mx-auto pa-8 pb-5"
              elevation="15"
              max-width="448"
              rounded="lg"
              color="#FAEED1"
            >
              <template v-slot:title>
                <h1 class="font-weight-black text-center description">404</h1>
                <h3 class="font-weight-black text-center description">Page Not Found</h3>
              </template>

              <v-card class="mb-5" color="#803d3b" variant="outlined">
                <v-card-text class="text-caption text-justify text-black description">
                  If you need assistance, please
                  <span
                    @click.prevent="contactDialog = true"
                    class="text-deep-orange-darken-4 font-weight-bold"
                    style="cursor: pointer"
                  >
                    contact support.
                  </span>
                </v-card-text>
              </v-card>

              <!-- Go Back Button -->
              <v-btn
                class="mb-5 description hover-zoom"
                color="#803d3b"
                size="large"
                variant="elevated"
                elevation="15"
                block
                @click="redirectUser"
              >
                {{ buttonText }}
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
        <v-dialog v-model="contactDialog" persistent max-width="400">
          <div class="d-flex justify-center mb-2 description">
            <v-row>
              <v-col cols="12">
                <v-card color="#FAEED1" elevation="15" rounded="lg">
                  <v-card color="#803d3b" class="ma-1" elevation="15" rounded="lg"
                    ><v-card-title class="headline text-center font-weight-black"
                      >Contact Us</v-card-title
                    ></v-card
                  >
                </v-card>
              </v-col>
            </v-row>
          </div>
          <v-card class="pa-0" color="#FAEED1" block elevation="10" rounded="lg">
            <v-card-text class="justify-content text-center">
              <p class="mb-3">
                If you have any questions or need assistance, please contact us using the details
                below:
              </p>

              <p>
                <strong>MJ:</strong>
                <a
                  class="text-decoration-none text-red"
                  href="mailto:markdaniel.jamisola@carsu.edu.ph"
                >
                  markdaniel.jamisola@carsu.edu.ph</a
                >
              </p>
              <p>
                <strong>UE:</strong>
                <a
                  class="text-decoration-none text-red"
                  href="mailto:ushyne.esclamado.carsu.edu.ph"
                >
                  ushyne.esclamado@carsu.edu.ph</a
                >
              </p>
              <p>
                <strong>JG:</strong>
                <a class="text-decoration-none text-red" href="mailto:jusalyn.gimao@carsu.edu.ph">
                  jusalyn.gimao@carsu.edu.ph</a
                >
              </p>
            </v-card-text>
          </v-card>
          <div class="d-flex justify-center description">
            <v-row>
              <v-col cols="12">
                <v-card color="#FAEED1" class="hover-zoom mt-2" elevation="15" rounded="lg">
                  <v-card class="ma-1" elevation="15" rounded="lg">
                    <v-btn
                      color="#803d3b"
                      block
                      variant="elevated"
                      elevation="15"
                      size="large"
                      class=""
                      style="background-color: #803d3b"
                      @click="contactDialog = false"
                      >Close</v-btn
                    >
                  </v-card>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-dialog>
      </v-container>
    </v-app>
  </v-responsive>
</template>

<script>
export default {
  data() {
    return {
      icons: Array(10)
        .fill([
          // List of icons for the floating effect
          'bx bxl-html5',
          'bx bxl-css3',
          'bx bxl-javascript',
          'bx bxl-java',
          'bx bxl-python',
          'bx bxl-php',
          'bx bxl-c-plus-plus',
          'bx bxl-nodejs',
          'bx bxl-typescript',
          'bx bxl-ruby'
        ])
        .flat()
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/unbounded');
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

.animated-background {
  background: linear-gradient(270deg, #803d3b, #c7b793, #aa7154, #b54646);
  background-size: 800% 800%;
  animation: gradientBackground 15s ease infinite;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Floating Icon Styles */
.anim-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.anim-element {
  position: absolute;
  color: rgba(255, 255, 255, 0.5);
  animation: float infinite;
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(100px, -100px);
  }
  100% {
    transform: translate(0, 0);
  }
}

/* Keyframes for sliding in from the right */
@keyframes slide-in {
  from {
    transform: translateY(-100%); /* Start off-screen to the right */
    opacity: 0; /* Start invisible */
  }
  to {
    transform: translateY(0); /* End in place */
    opacity: 1; /* End visible */
  }
}

/* Slide-in class */
.slide-in {
  animation: slide-in 0.5s ease forwards; /* Apply slide-in animation */
}
.hover-zoom {
  transition: transform 0.3s ease; /* Smooth transition */
}

.hover-zoom:hover {
  transform: scale(1.05); /* Scale up on hover */
}
</style>
