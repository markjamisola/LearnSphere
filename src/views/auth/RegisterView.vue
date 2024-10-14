<script setup>
import RegisterForm from '@/components/auth/RegisterForm.vue'
</script>

<template>
  <v-responsive>
    <v-app class="background-color">
      <!-- Apply background color here -->
      <v-container>
        <!-- Vuetify logo -->
        <v-img class="mx-auto mb-0 mt-1" max-width="200" src="/logo5.png"></v-img>

        <!-- Sign-Up Form Card -->
        <v-card
          class="mx-auto pa-8 pb-5"
          elevation="8"
          max-width="448"
          rounded="lg"
          color="deep-purple-darken-3"
        >
          <!-- Title -->
          <template v-slot:title>
            <h3 class="font-weight-black text-center">Sign Up</h3>
          </template>
          <!-- Form Field -->

          <RegisterForm></RegisterForm>

          <!-- Already Have an Account link -->
          <v-card-text class="text-center pt-0">
            <RouterLink class="text-black text-decoration-none text-deep-purple-lighten-3" to="/login">
              Already have an account? Log in
            </RouterLink>
            <v-icon icon="mdi-chevron-right"></v-icon>
          </v-card-text>
        </v-card>
      </v-container>
    </v-app>
  </v-responsive>
</template>

<style scoped>
/* Set the background color for the entire app */
.background-color {
  background-color: #17153b; /* Your desired background color */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Customize other styles if needed */
</style>
