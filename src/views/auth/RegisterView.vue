<script setup>
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { ref, onMounted } from 'vue'
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
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

      <!-- Animated background applied -->
      <v-container fluid>
        <v-row class="fill-height align-self-center" align="center" justify="center">
          <v-col cols="12" md="6" lg="4">
            <!-- Logo and Description for Mobile -->
            <div class="text-center d-md-none description">
              <v-img src="/newlogo.png" max-width="300px" class="mx-auto mb-0"></v-img>
              <h2 class="text-white description mb-2">Learn Smarter, Succeed Faster</h2>
              <h3 class="text-white text-center mb-6">
                Unlock your potential and start your learning journey today!
              </h3>
              <v-card class="mb-6 mt-4 mx-3" color="white" variant="outlined">
                <v-card-text class="text-justify text-white text-caption description">
                  Please note: The program you select will determine the courses available to you.
                  However, you can update your program at any time through your profile settings.
                </v-card-text>
              </v-card>
            </div>

            <!-- Sign-Up Form Card -->
            <v-card
              class="mx-auto pa-8 pb-5 justify-center align-center"
              elevation="15"
              rounded="lg"
              color="#FAEED1"
              :class="{ 'slide-in': isMounted }"
            >
              <!-- Title -->
              <template v-slot:title>
                <h3 class="font-weight-black text-center description">Sign Up</h3>
              </template>

              <!-- Form Field -->
              <RegisterForm></RegisterForm>

              <!-- Already Have an Account link -->
              <v-card-text class="text-center pt-0">
                <RouterLink
                  class="text-black text-decoration-none text-black description"
                  to="/login"
                >
                  Already have an account? Log in
                </RouterLink>
                <v-icon icon="mdi-chevron-right"></v-icon>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4" class="d-none d-md-flex flex-column justify-center align-center">
            <!-- Logo and Description for Desktop -->
            <div class="text-center description-section">
              <v-img src="/newlogo.png" max-width="300px" class="mx-auto mb-4"></v-img>
              <h2 class="text-white description mb-2">Learn Smarter, Succeed Faster</h2>
              <p class="text-white mb-6 description">
                Unlock your potential and start your learning journey today!
              </p>

              <v-card class="mb-6 mt-4 mx-3" color="white" variant="outlined">
                <v-card-text class="text-justify text-white text-caption description">
                  Please note: The program you select will determine the courses available to you.
                  However, you can update your program at any time through your profile settings.
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
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
          'bx bxl-nodejs'
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
  height: 100%;
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
@media (min-width: 768px) {
  .v-container {
    display: flex;
    align-items: center;
    min-height: 100vh;
  }
}

/* Keyframes for sliding in from the right */
@keyframes slide-in {
  from {
    transform: translateX(-100%); /* Start off-screen to the right */
    opacity: 0; /* Start invisible */
  }
  to {
    transform: translateX(0); /* End in place */
    opacity: 1; /* End visible */
  }
}

/* Slide-in class */
.slide-in {
  animation: slide-in 0.5s ease forwards; /* Apply slide-in animation */
}
</style>
