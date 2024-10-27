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

.loading-text {
  position: relative;
  color: white;
  font-size: 24px;
  z-index: 10000;
}
</style>
