<template>
  <v-form>
    <v-text-field
      density="compact"
      placeholder="Registered Email Address"
      prepend-inner-icon="mdi-email-outline"
      variant="solo"
    ></v-text-field>

    <v-card class="mb-7" color="surface-variant" variant="outlined">
      <v-card-text class="text-center text-black text-caption">
        Instructions to reset your password will be sent to your registered email.
      </v-card-text>
    </v-card>
    <v-row class="justify-space-between mt-3">
      <v-btn
        class="mx-3 mb-6"
        color="#803d3b"
        size="large"
        variant="elevated"
        elevation="15"
        @click="$router.push('/login')"
      >
        Send
      </v-btn>
      <v-btn
        class="mx-3 mb-6"
        color="#803d3b"
        size="large"
        variant="elevated"
        elevation="15"
        @click="$router.push('/login')"
      >
        Cancel
      </v-btn>
    </v-row>
  </v-form>
</template>
