<script setup>
import { ref } from 'vue'

// For toggling visibility of password fields
const visible = ref(false)
</script>

<template>
  <v-form>
    <!-- Reduced spacing between rows -->
    <v-row dense>
      <v-col cols="12" sm="6">
        <v-text-field
          density="compact"
          placeholder="Name"
          prepend-inner-icon="mdi-account-outline"
          variant="solo"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          density="compact"
          placeholder="ID Number"
          prepend-inner-icon="mdi-card-account-details-outline"
          variant="solo"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- College and Program dropdowns -->
    <v-row dense>
      <v-col cols="12" sm="6">
        <v-select
          :items="['CCIS']"
          placeholder="College"
          prepend-inner-icon="mdi-school-outline"
          variant="solo"
          density="compact"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          :items="['Information Technology', 'Computer Science', 'Information System']"
          placeholder="Program"
          prepend-inner-icon="mdi-laptop"
          variant="solo"
          density="compact"
        ></v-select>
      </v-col>
    </v-row>

    <!-- Email -->
    <v-text-field
      density="compact"
      placeholder="Email address"
      prepend-inner-icon="mdi-email-outline"
      variant="solo"
    ></v-text-field>

    <!-- Password and Verify Password fields -->
    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Password"
      prepend-inner-icon="mdi-lock-outline"
      variant="solo"
      @click:append-inner="visible = !visible"
    ></v-text-field>

    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Verify Password"
      prepend-inner-icon="mdi-lock-outline"
      variant="solo"
      @click:append-inner="visible = !visible"
    ></v-text-field>

    <!-- Warning message -->
    <v-card class="mb-3" color="surface-variant" variant="outlined">
      <v-card-text class="text-caption text-justify text-black">
        Ensure that all information is correct before signing up. In case of issues, please contact
        support.
      </v-card-text>
    </v-card>

    <!-- Sign Up Button -->
    <v-btn
      class="mb-8"
      color="#803d3b"
      size="large"
      variant="elevated"
      elevation="15"
      block
      @click="$router.push('/home')"
    >
      Sign Up
    </v-btn>
  </v-form>
</template>
