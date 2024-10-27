<script setup>
import ForgotView from '@/components/auth/ForgotView.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Modal visibility control
const dialog = ref(false)
const router = useRouter()

// Function to handle email send and show modal
const onEmailSent = () => {
  // Replace this with actual API call
  // After success API, the modal will show
  dialog.value = true
}

const goToLogin = () => {
  dialog.value = false
  router.push('/login')
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

      <!-- Apply animated background here -->
      <v-container>
        <v-img class="mx-auto mb-0 mt-1" max-width="228" src="/logo5.png"></v-img>
        <v-card
          class="mx-auto pa-8 pb-5"
          elevation="15"
          max-width="448"
          rounded="lg"
          color="#FAEED1"
        >
          <template v-slot:title>
            <h3 class="font-weight-black text-center">Reset Password</h3>
          </template>

          <!-- Form Field -->
          <ForgotView @email-sent="onEmailSent" />
        </v-card>
      </v-container>

      <!-- Modal Dialog -->
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="text-h5">Email Sent!</v-card-title>
          <v-card-text>
            Please check your email for instructions to reset your password.
          </v-card-text>
          <v-card-actions>
            <v-btn color="deep-purple-darken-3" block @click="goToLogin">
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
      icons: Array(7).fill([
        'bx bxl-github', 
        'bx bxl-react', 
        'bx bxl-android', 
        'bx bxl-apple', 
        'bx bxl-vuejs',
        'bx bxl-figma',
        'bx bxl-java',
      ]).flat()
    }
  }
}
</script>

<style scoped>
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
</style>
