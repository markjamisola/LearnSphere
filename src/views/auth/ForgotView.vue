<script setup>
import ForgotView from '@/components/auth/ForgotView.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// modal visibility control
const dialog = ref(false)
const router = useRouter()

// Function to handle email send and show modal
const onEmailSent = () => {
  // replace this with actual API call
  // after success api, the modal will show
  dialog.value = true
}

const goToLogin = () => {
  dialog.value = false
  router.push('/login')
}
</script>

<template>
  <v-responsive>
    <v-app class="background-color">
      <!-- Background color -->
      <v-container>
        <v-img class="mx-auto mb-0 mt-1" max-width="228" src="/logo5.png"></v-img>

        <v-card
          class="mx-auto pa-8 pb-5"
          elevation="15"
          max-width="448"
          rounded="lg"
          color="#FAEED1"
        >
          <template v-slot:title>
            <h3 class="font-weight-black text-center">Reset Password</h3>
          </template>

          <!-- Form Field -->
          <ForgotView @email-sent="onEmailSent" />

        </v-card>
      </v-container>

      <!-- Modal Dialog -->
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="text-h5">Email Sent!</v-card-title>
          <v-card-text>
            Please check your email for instructions to reset your password.
          </v-card-text>
          <v-card-actions>
            <v-btn color="deep-purple-darken-3" block @click="goToLogin">
              Back to Log In
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </v-responsive>
</template>

<style scoped>
/* Set the background color for the entire app */
.background-color {
  background-color: #803D3B;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
