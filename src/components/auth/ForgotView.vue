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

    <v-btn
      class="mb-8"
      color="black"
      size="large"
      variant="outlined"
      block
      @click="$router.push('/login')"
    >
      Send
    </v-btn>
  </v-form>
</template>
