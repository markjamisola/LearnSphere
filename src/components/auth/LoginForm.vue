<template>
  <v-form>
    <div class="text-subtitle-1 text-medium-emphasis">
      <h4 class="text-white">Account</h4>
    </div>

    <v-text-field
      density="compact"
      placeholder="Email address"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
    ></v-text-field>

    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
      <h4 class="text-white">Password</h4>
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
    <RouterLink class="text-black text-decoration-none text-deep-purple-lighten-3" to="/forgot"> Reset Password </RouterLink>

    <v-card class="mb-7" color="surface-variant" variant="tonal">
      <v-card-text class="text-justify text-white text-caption">
        Warning: After 3 consecutive failed login attempts, your account will be temporarily locked
        for three hours. If you must log in now, you can also click "Reset Password" to
        reset the login password.
      </v-card-text>
    </v-card>

    <v-btn
      class="mb-8"
      color="white"
      size="large"
      variant="tonal"
      block
      @click="$router.push('/home')"
    >
      Log In
    </v-btn>
  </v-form>
</template>
