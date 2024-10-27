<template>
  <div
    v-if="loading"
    :class="['loading-screen', { 'fade-out': fadeOut }]"
    @transitionend="redirectToLoad"
  >
    <video
      autoplay
      loop
      muted
      playsinline
      @canplaythrough="handleVideoLoaded"
      class="video-background"
    >
      <source src="/vid.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <!-- Skip Button -->
    <v-btn
      class="mx-2 skip-button"
      color="#1c1c3a"
      size="large"
      variant="elevated"
      elevation="15"
      @click="skipLoading"
      >Skip</v-btn
    >
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const loading = ref(true)
const fadeOut = ref(false)
const router = useRouter()

function handleVideoLoaded() {
  setTimeout(() => {
    fadeOut.value = true // Start fade-out effect
  }, 7000) // Adjust delay as desired
}

function redirectToLoad() {
  if (fadeOut.value) {
    loading.value = false
    router.push('/load') // Redirect to /load after fade-out completes
  }
}

function skipLoading() {
  fadeOut.value = true // Immediately start fade-out
}
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  z-index: 9999;
  opacity: 1;
  transition: opacity 1s ease; /* Fade-out transition */
}

.loading-screen.fade-out {
  opacity: 0; /* Fades out when fade-out class is applied */
}

.video-background {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.skip-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 10000;
}

.skip-button:hover {
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
