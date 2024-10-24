<script setup>
import { ref } from 'vue'
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator
} from '@/utils/validators'

const refVForm = ref()

const formDataDefault = {
  firstname: '',
  lastname: '',
  idnumber: '',
  program: '',
  email: '',
  password: '',
  password_confirmation: ''
}
const formData = ref({
  ...formDataDefault
})

const onSignup = () => {
  alert(formData.value)
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSignup()
  })
}

const visible = ref(false)

const contactDialog = ref(false)
</script>

<template>
  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <v-row dense class="gb-0">
      <v-col cols="12" sm="6">
        <v-text-field
          density="compact"
          label="First Name"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          :rules="[requiredValidator]"
          v-model="formData.firstname"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          density="compact"
          label="Last Name"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          :rules="[requiredValidator]"
          v-model="formData.lastname"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row dense class="gb-0">
      <v-col cols="12" sm="6">
        <v-text-field
          density="compact"
          label="ID Number"
          prepend-inner-icon="mdi-card-account-details-outline"
          variant="outlined"
          class="mb-0"
          :rules="[requiredValidator]"
          v-model="formData.idnumber"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          :items="[' ','BSIT', 'BSCS', 'BSIS']"
          placeholder="Program"
          prepend-inner-icon="mdi-laptop"
          variant="outlined"
          density="compact"
          item-text=""                            
          item-value="" 
          :rules="[requiredValidator]"
          v-model="formData.program"
        ></v-select>
      </v-col>
    </v-row>

    <!-- Email -->
    <v-text-field
      density="compact"
      label="Email address"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      :rules="[requiredValidator, emailValidator]"
      v-model="formData.email"
    ></v-text-field>

    <!-- Password and Verify Password fields -->
    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      label="Password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
      :rules="[requiredValidator, passwordValidator]"
      v-model="formData.password_confirmation"
    ></v-text-field>

    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      label="Verify Password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
      :rules="[
        requiredValidator,
        confirmedValidator(formData.password_confirmation, formData.password)
      ]"
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
      type="submit"
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
            >
              markdaniel.jamisola@carsu.edu.ph</a
            >
          </p>
          <p>
            <strong>UE:</strong>
            <a
              class="text-decoration-none text-white"
              href="mailto:ushyne.esclamadado.carsu.edu.ph"
            >
              ushyne.esclamadado.carsu.edu.ph</a
            >
          </p>
          <p>
            <strong>JG:</strong>
            <a class="text-decoration-none text-white" href="mailto:jusalyn.gimao@carsu.edu.ph">
              jusalyn.gimao@carsu.edu.ph</a
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
