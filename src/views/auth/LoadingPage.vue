<template>
  <v-responsive>
    <v-app class="background-color">
     <v-main class="d-flex">
      <!-- Centering the content inside the container -->
      <v-container class=" align-self-center text-center">
        <!-- Logo Image -->
        <v-img class="mx-auto" max-width="400" src="../public/logo5.png"></v-img>

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
/* Set the background color for the entire app */
.background-color {
  background-color: #243642;
  height: 100vh; /* Make sure the app takes full viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
