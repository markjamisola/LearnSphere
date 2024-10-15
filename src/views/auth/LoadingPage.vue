<template>
  <v-responsive>
    <v-app class="background-color">
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
/* Set the background color for the entire app */
.background-color {
  background-color: #803D3B; /* Your desired background color */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
