<script setup>
import ForgotView from '@/components/auth/ForgotView.vue'
</script>

<template>
  <v-responsive>
    <v-app class="background-color">
      <!-- Apply background color here -->
      <v-container>
        <v-img class="mx-auto mb-0 mt-1" max-width="228" src="/public/logo5.png"></v-img>

        <v-card
          class="mx-auto pa-8 pb-5"
          elevation="8"
          max-width="448"
          rounded="lg"
          color="blue-grey-darken-1"
        >
          <template v-slot:title>
            <h3 class="font-weight-black text-center">Reset Password</h3>
          </template>
          <!-- Form Field -->
          <ForgotView></ForgotView>
        </v-card>
      </v-container>
    </v-app>
  </v-responsive>
</template>

<style scoped>
/* Set the background color for the entire app */
.background-color {
  background-color: #243642; /* Your desired background color */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Customize other styles if needed */
</style>
