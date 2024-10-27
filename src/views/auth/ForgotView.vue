<script setup>
import ForgotView from '@/components/auth/ForgotView.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

// Modal visibility control
const dialog = ref(false)
const router = useRouter()

// Function to handle email send and show modal
const onEmailSent = () => {
  console.log('Email sent event received') // Log when the event is emitted
  dialog.value = true // Show the modal
}

const goToLogin = () => {
  dialog.value = false // Hide the modal
  router.push('/login') // Redirect to login
}
</script>

<template>
  <v-responsive>
    <v-app class="animated-background">
      <!-- Floating Icons in Background -->
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

      <v-container fluid>
        <v-row class="align-center justify-center" align="center" justify="center">
          <v-col
            ><v-img class="mx-auto mb-0 mt-1" max-width="228" src="/logo5.png"></v-img>
            <v-card
              class="mx-auto pa-8 pb-5"
              elevation="15"
              max-width="448"
              rounded="lg"
              color="#FAEED1"
              :class="{ 'slide-in': isMounted }"
            >
              <template v-slot:title>
                <h3 class="font-weight-black text-center description">Reset Password</h3>
              </template>
              <!-- Form Field -->
              <ForgotView @email-sent="onEmailSent" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-dialog v-model="dialog" max-width="400">
        <v-card
          class="mx-auto pa-8 pb-5"
          elevation="15"
          max-width="448"
          rounded="lg"
          color="#803d3b"
        >
          <v-card-title
            ><h3 class="font-weight-black text-center description">Email Sent!</h3></v-card-title
          >
          <v-card class="mb-3" color="white" variant="outlined">
            <v-card-text class="text-center text-white text-caption description">
              Please check your email for instructions to reset your password.
            </v-card-text>
          </v-card>
          <v-card-actions>
            <v-btn
              class="description"
              color="#FAEED1"
              size="large"
              variant="elevated"
              elevation="15"
              block
              @click="goToLogin"
            >
              Back to Log In
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </v-responsive>
</template>

<script>
export default {
  data() {
    return {
      // Fewer icons to reduce the density
      icons: Array(10)
        .fill([
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
@media (min-width: 768px) {
  .v-container {
    display: flex;
    align-items: center;
    min-height: 100vh;
  }
}
</style>
