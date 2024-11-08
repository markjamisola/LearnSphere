<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const isLoading = ref(true) // Control loading screen visibility
const isFadingOut = ref(false) // Trigger fade-out animation
const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    isFadingOut.value = true // Start fade-out animation
    setTimeout(() => {
      isLoading.value = false // Hide the loading screen
      router.push('/login') // Redirect to login page
    }, 1000) // Delay for transition
  }, 3000) // Loading page duration
})
</script>

<template>
  <!-- Loading Screen -->
  <v-app v-if="isLoading" :class="['animated-background', { 'fade-out': isFadingOut }]">
    <v-main class="d-flex justify-center align-center">
      <v-container class="text-center">
        <v-img class="mx-auto pulse-animation" max-width="300px" src="/logonew.png" />
        <p class="loading-text description">
          Bringing everything together<span class="dot1">.</span><span class="dot2">.</span
          ><span class="dot3">.</span>
        </p>
      </v-container>
    </v-main>
  </v-app>

  <RouterView v-else />
</template>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/unbounded');
/* Keyframes for Background Animation */
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

/* Animated Background with Fade-Out Transition */
.animated-background {
  background: linear-gradient(270deg, #803d3b, #c7b793, #aa7154, #b54646);
  background-size: 800% 800%;
  animation: gradientBackground 15s ease infinite;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: opacity 1s ease;
}

.fade-out {
  opacity: 0;
}

/* Logo Pulse Animation */
.pulse-animation {
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Loading Text Animation */
.loading-text {
  color: #fafafa;
  font-size: 1.5rem;
  margin-top: 10px;
  font-weight: 500;
}

.loading-text .dot1,
.loading-text .dot2,
.loading-text .dot3 {
  animation: fade 1.2s infinite ease-in-out;
}

.loading-text .dot1 {
  animation-delay: 0s;
}

.loading-text .dot2 {
  animation-delay: 0.2s;
}

.loading-text .dot3 {
  animation-delay: 0.4s;
}

@keyframes fade {
  0%,
  80%,
  100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
}
</style>
