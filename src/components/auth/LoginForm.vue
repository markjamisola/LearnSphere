<script setup>
import { ref } from 'vue'

// For toggling visibility of password fields
const visible = ref(false)
</script>
<template>
  <v-form>
    <div class="text-subtitle-1 text-medium-emphasis">
      <h4 class="text-black">Account</h4>
    </div>

    <v-text-field
      density="compact"
      placeholder="Email or ID Number"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
    ></v-text-field>

    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
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
    <RouterLink class="text-deep-orange-darken-4 text-decoration-none" to="/forgot"
      ><h4>Reset Password</h4></RouterLink
    >

    <v-card class="mb-7" color="surface-variant" variant="outlined">
      <v-card-text class="text-justify text-black text-caption">
        Warning: If you try to log in with the wrong password three times, your account will be
        locked for three hours. To regain access, you can either wait for the lock to expire or
        click "Reset Password" to create a new password and log in right away.
      </v-card-text>
    </v-card>

    <v-btn
      class="mb-8"
      color="#803d3b"
      size="large"
      variant="elevated"
      elevation="15"
      block
      @click="$router.push('/home')"
    >
      Log In
    </v-btn>
  </v-form>
</template>
