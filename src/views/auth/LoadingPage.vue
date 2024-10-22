<template>
  <v-responsive>
    <v-app class="animated-background">
     <v-main class="d-flex">
      <!-- Centering the content inside the container -->
      <v-container class=" align-self-center text-center">
        <!-- Logo Image -->
        <v-img class="mx-auto" max-width="400" src="/logo5.png"></v-img>

        <!-- Heading Text -->
        <h3 class="text-white mb-4">Learn Smarter, Succeed Faster</h3>

        <!-- Button Link -->
        <RouterLink class="text-decoration-none" to="/login">
          <h5 class="text-white">
            Let's Get Started
            <v-icon icon="mdi-chevron-right"></v-icon><v-icon icon="mdi-chevron-right"></v-icon><v-icon icon="mdi-chevron-right"></v-icon>
          </h5>
        </RouterLink>
      </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>


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
  background: linear-gradient(270deg, #803d3b, #faeed1, #aa7154, #b54646);
  background-size: 800% 800%;
  animation: gradientBackground 15s ease infinite;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Customize other styles if needed */
</style>