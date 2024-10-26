<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const isLoading = ref(true) // control loading screen visibility
const isFadingOut = ref(false) // trigger fade-out animation
const router = useRouter() //

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
        <v-img class="mx-auto" max-width="400" src="/logo5.png"></v-img>
        <h3 class="text-white mb-4">Learn Smarter, Succeed Faster</h3>
        <h4 class="text-white">
          <v-icon icon="mdi-chevron-left"></v-icon><v-icon icon="mdi-chevron-left"></v-icon>
          Loading...
          <v-icon icon="mdi-chevron-right"></v-icon><v-icon icon="mdi-chevron-right"></v-icon>
        </h4>
      </v-container>
    </v-main>
  </v-app>

  <RouterView v-else />
</template>

<style scoped>
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
  background: linear-gradient(270deg, #803d3b, #faeed1, #aa7154, #b54646);
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
</style>
