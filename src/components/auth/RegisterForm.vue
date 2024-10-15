<script setup>
import { ref } from 'vue'

// For toggling visibility of password fields
const visible = ref(false)

// State for the Contact Support dialog/modal
const contactDialog = ref(false)
</script>

<template>
  <v-form>
    <!-- Reduced spacing between rows -->
    <v-row dense class="gb-0">
      <v-col cols="12" sm="6">
        <v-text-field
          density="compact"
          placeholder="Name"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          density="compact"
          placeholder="ID Number"
          prepend-inner-icon="mdi-card-account-details-outline"
          variant="outlined"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- College and Program dropdowns -->
    <v-row class="mt-0">
      <v-col cols="12" lg="12" sm="6" md="12">
        <v-select
          :items="['Information Technology', 'Computer Science', 'Information System']"
          placeholder="Program"
          prepend-inner-icon="mdi-laptop"
          variant="outlined"
          density="compact"
        ></v-select>
      </v-col>
    </v-row>

    <!-- Email -->
    <v-text-field
      density="compact"
      placeholder="Email address"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
    ></v-text-field>

    <!-- Password and Verify Password fields -->
    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
    ></v-text-field>

    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Verify Password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
    ></v-text-field>

    <!-- Contact Support Link -->
    <v-card class="mb-3" color="surface-variant" variant="outlined">
      <v-card-text class="text-caption text-justify text-black">
        Ensure that all information is correct before signing up. If you need assistance, please
        <a @click.prevent="contactDialog = true" class="text-decoration-underline font-weight-bold">
          contact support.
        </a>
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

    <!-- Dialog/Modal for Contact Support -->
    <v-dialog v-model="contactDialog" persistent max-width="400">
      <v-card class="pa-0" color="#803d3b" block elevation="10">
        <v-card-title class="headline text-center font-weight-black">Contact Us</v-card-title>

        <v-card-text class="justify-content">
          <p class="mb-3">
            If you have any questions or need assistance, please contact us using the details below:
          </p>

          <p>
            <strong>MJ:</strong>
            <a
              class="text-decoration-none text-white"
              href="mailto:markdaniel.jamisola@carsu.edu.ph"
              > markdaniel.jamisola@carsu.edu.ph</a
            >
          </p>
          <p>
            <strong>UE:</strong>
            <a class="text-decoration-none text-white" href="mailto:ushyne.esclamadado.carsu.edu.ph"
              > ushyne.esclamadado.carsu.edu.ph</a
            >
          </p>
          <p>
            <strong>JG:</strong>
            <a class="text-decoration-none text-white" href="mailto:jusalyn.gimao@carsu.edu.ph"
              > jusalyn.gimao@carsu.edu.ph</a
            >
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#FAEED1"
            block
            variant="elevated"
            elevation="15"
            size="large"
            class="mb-3"
            @click="contactDialog = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<style scoped>
.text-decoration-underline {
  text-decoration: underline;
}

.font-weight-bold {
  font-weight: bold;
}
</style>
