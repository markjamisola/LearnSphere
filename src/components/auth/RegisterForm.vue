<script setup>
import { ref, onMounted } from 'vue'
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator
} from '@/utils/validators'
import { supabase, formActionDefault } from '@/utils/supabase.js'
import { useRouter } from 'vue-router'
import AlertNotification from './AlertNotification.vue'

const router = useRouter()

const refVForm = ref()

const formDataDefault = {
  firstname: '',
  lastname: '',
  idnumber: '',
  program: null,
  email: '',
  password: '',
  password_confirmation: ''
}
const formData = ref({
  ...formDataDefault
})

const formAction = ref({
  ...formActionDefault
})

const onSignup = async () => {
  formAction.value = { formActionDefault }
  formAction.value.formProcess = true

  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
    options: {
      data: {
        firstname: formData.value.firstname,
        lastname: formData.value.lastname,
        idnumber: formData.value.idnumber,
        program: formData.value.program, // Now the UUID
        is_admin: false
      }
    }
  })

  if (error) {
    console.log(error)
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    console.log(data)
    formAction.value.formSuccessMessage = 'Successfully Registered!'

    router.replace('/home')
  }
  refVForm.value?.reset()
  formAction.value.formProcess = false
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSignup()
  })
}

const visible = ref(false)

const contactDialog = ref(false)
const programs = ref([])

onMounted(async () => {
  const { data, error } = await supabase.from('programs').select('id, program_name')

  if (error) {
    console.error('Error fetching programs:', error)
    return
  }

  // Map the data to the structure needed by v-select
  programs.value = data.map((program) => ({
    label: program.program_name, // Display name
    value: program.id // UUID
  }))
  console.log('Programs data:', programs.value)
})
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  ></AlertNotification>

  <v-form ref="refVForm" @submit.prevent="onFormSubmit" class="mt-5">
    <v-row dense class="gb-0 description">
      <v-col cols="12" sm="6">
        <v-text-field
          density="compact"
          label="First Name"
          color="#803d3b"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          :rules="[requiredValidator]"
          v-model="formData.firstname"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          density="compact"
          color="#803d3b"
          label="Last Name"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          :rules="[requiredValidator]"
          v-model="formData.lastname"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row dense class="gb-0 description">
      <v-col cols="12" sm="6">
        <v-text-field
          density="compact"
          label="ID Number"
          color="#803d3b"
          prepend-inner-icon="mdi-card-account-details-outline"
          variant="outlined"
          class="mb-0"
          :rules="[requiredValidator]"
          v-model="formData.idnumber"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          :items="programs"
          label="Program"
          prepend-inner-icon="mdi-laptop"
          variant="outlined"
          density="compact"
          color="#803d3b"
          v-model="formData.program"
          :rules="[requiredValidator]"
          item-title="label"
          item-value="value"
        ></v-select>
      </v-col>
    </v-row>

    <!-- Email -->
    <v-text-field
      density="compact"
      label="Email address"
      color="#803d3b"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      :rules="[requiredValidator, emailValidator]"
      v-model="formData.email"
      class="description"
    ></v-text-field>

    <!-- Password and Verify Password fields -->
    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      label="Password"
      color="#803d3b"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      class="description"
      @click:append-inner="visible = !visible"
      :rules="[requiredValidator, passwordValidator]"
      v-model="formData.password"
    ></v-text-field>

    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      label="Verify Password"
      color="#803d3b"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      class="description"
      @click:append-inner="visible = !visible"
      :rules="[
        requiredValidator,
        confirmedValidator(formData.password_confirmation, formData.password)
      ]"
      v-model="formData.password_confirmation"
    ></v-text-field>

    <!-- Contact Support Link -->
    <v-card class="mb-3" color="#803d3b" variant="outlined">
      <v-card-text class="text-caption text-justify text-black description">
        Ensure that all information is correct before signing up. If you need assistance, please
        <span
          @click.prevent="contactDialog = true"
          class="text-deep-orange-darken-4 font-weight-bold"
          style="cursor: pointer"
        >
          contact support.
        </span>
      </v-card-text>
    </v-card>

    <!-- Sign Up Button -->
    <v-btn
      class="mb-8 description hover-zoom"
      color="#803d3b"
      size="large"
      variant="elevated"
      elevation="15"
      block
      type="submit"
      :disabled="formAction.formProcess"
      :loading="formAction.formProcess"
    >
      Sign Up
    </v-btn>

    <!-- Dialog/Modal for Contact Support -->
    <v-dialog v-model="contactDialog" persistent max-width="400">
      <div class="d-flex justify-center mb-2 description">
        <v-row>
          <v-col cols="12">
            <v-card color="#FAEED1" elevation="15" rounded="lg">
              <v-card color="#803d3b" class="ma-1" elevation="15" rounded="lg"
                ><v-card-title class="headline text-center font-weight-black"
                  >Contact Us</v-card-title
                ></v-card
              >
            </v-card>
          </v-col>
        </v-row>
      </div>
      <v-card class="pa-0" color="#FAEED1" block elevation="10" rounded="lg">
        <v-card-text class="justify-content text-center">
          <p class="mb-3">
            If you have any questions or need assistance, please contact us using the details below:
          </p>

          <p>
            <strong>MJ:</strong>
            <a
              class="text-decoration-none text-red"
              href="mailto:markdaniel.jamisola@carsu.edu.ph"
            >
              markdaniel.jamisola@carsu.edu.ph</a
            >
          </p>
          <p>
            <strong>UE:</strong>
            <a class="text-decoration-none text-red" href="mailto:ushyne.esclamado.carsu.edu.ph">
              ushyne.esclamado.carsu.edu.ph</a
            >
          </p>
          <p>
            <strong>JG:</strong>
            <a class="text-decoration-none text-red" href="mailto:jusalyn.gimao@carsu.edu.ph">
              jusalyn.gimao@carsu.edu.ph</a
            >
          </p>
        </v-card-text>
      </v-card>
      <div class="d-flex justify-center description">
        <v-row>
          <v-col cols="12">
          <v-card color="#FAEED1" class="hover-zoom mt-2" elevation="15" rounded="lg" >
            <v-card class="ma-1" elevation="15" rounded="lg">
              <v-btn
                color="#803d3b"
                block
                variant="elevated"
                elevation="15"
                size="large"
                class=""
                style="background-color: #803d3b"
                @click="contactDialog = false"
                >Close</v-btn
              >
            </v-card>
          </v-card>
          </v-col>
        </v-row>
      </div>
    </v-dialog>
  </v-form>
</template>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/unbounded');
.text-decoration-underline {
  text-decoration: underline;
}

.font-weight-bold {
  font-weight: bold;
}

.description {
  font-family: 'Unbounded', sans-serif;
}

.hover-zoom {
  transition: transform 0.3s ease; /* Smooth transition */
}

.hover-zoom:hover {
  transform: scale(1.05); /* Scale up on hover */
}
</style>
