<template>
  <v-form>
    <v-text-field
      density="compact"
      placeholder="Registered Email Address"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
    ></v-text-field>

    <v-card class="mb-7" color="surface-variant" variant="tonal">
      <v-card-text class="text-center text-white text-caption">
        Instructions to reset your password will be sent to your registered email.
      </v-card-text>
    </v-card>

    <v-btn
      class="mb-8"
      color="white"
      size="large"
      variant="tonal"
      block
      @click="$router.push('/login')"
    >
      Send
    </v-btn>
  </v-form>
</template>
