<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// modal visibility control
const dialog = ref(false)
const router = useRouter()

// Function to handle email send and show modal
const goToLogin = () => {
  dialog.value = false
  router.push('/login')
}
</script>

<template>
  <v-responsive>
    <v-app class="animated-background">
      <!-- Background color with gradient animation -->
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
            <h3 class="font-weight-black text-center">Admin Log In</h3>
          </template>
          <div class="text-subtitle-1 text-medium-emphasis">
            <h4 class="text-black">Account</h4>
          </div>
          <!-- Form Field -->
          <v-text-field
            density="compact"
            placeholder="Email or ID Number"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
          ></v-text-field>

          <div
            class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
          >
            <h4 class="text-black">Password</h4>
          </div>

          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
          ></v-text-field>

          <v-row class="justify-space-between mt-3">
            <v-btn
              class="mx-3 mb-6"
              color="#803d3b"
              size="large"
              variant="elevated"
              elevation="15"
              @click="$router.push('/login')"
            >
              Back
            </v-btn>
            <v-btn
              class="mx-3 mb-6"
              color="#803d3b"
              size="large"
              variant="elevated"
              elevation="15"
              @click="$router.push('/admin')"
            >
              Log In
            </v-btn>
          </v-row>
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
</style>
