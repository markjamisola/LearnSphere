<script setup>
import { ref } from 'vue'
import { requiredValidator, emailValidator } from '@/utils/validators'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'vue-router'
import AlertNotification from './AlertNotification.vue'

const visible = ref(false)
const refVForm = ref()
const forgotPasswordDialog = ref(false)
const successDialog = ref(false)
const emailForReset = ref('')
const emailSent = ref(false)

const formDataDefault = {
  email: '',
  password: ''
}

const router = useRouter()

const formData = ref({
  ...formDataDefault
})

const formAction = ref({
  formSuccessMessage: '',
  formErrorMessage: '',
  formProcess: false
})

const onLogin = async () => {
  formAction.value.formProcess = true

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.value.email,
    password: formData.value.password
  })

  if (error) {
    formAction.value.formErrorMessage = error.message
    console.error('Login error:', error)
  } else {
    formAction.value.formSuccessMessage = 'Successfully Logged In!'
    router.replace('/home')
  }

  refVForm.value?.reset()
  formAction.value.formProcess = false
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onLogin()
  })
}

const onForgotPassword = async () => {
  formAction.value.formErrorMessage = ''
  emailSent.value = false

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(emailForReset.value, {
      redirectTo: 'https://learnspheres.vercel.app/reset'
    })

    if (error) throw error

    emailSent.value = true
    forgotPasswordDialog.value = false
    successDialog.value = true
  } catch (error) {
    formAction.value.formErrorMessage = error.message
    console.error('Password reset error:', error)
  }
}
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  ></AlertNotification>

  <v-form ref="refVForm" @submit.prevent="onFormSubmit" class="mt-5">
    <!-- Account Input -->
    <div class="text-subtitle-1 text-medium-emphasis">
      <h4 class="text-black description">Account</h4>
    </div>
    <v-text-field
      v-model="formData.email"
      density="compact"
      placeholder="Registered Email"
      color="#803d3b"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      :rules="[requiredValidator, emailValidator]"
      class="description"
    ></v-text-field>

    <!-- Password Input -->
    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
      <h4 class="text-black description">Password</h4>
    </div>
    <v-text-field
      v-model="formData.password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      color="#803d3b"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
      :rules="[requiredValidator]"
      class="description"
    ></v-text-field>

    <v-card class="mb-6" color="#803d3b" variant="outlined">
      <v-card-text class="text-justify text-black text-caption description">
        Warning: If you forgot your password, please click
        <span
          class="text-deep-orange-darken-4 text-decoration-none description"
          @click="forgotPasswordDialog = true"
          style="cursor: pointer"
        >
          Forgot Password
        </span>
        to create a new password and regain access to your account.
      </v-card-text>
    </v-card>

    <!-- Log In Button -->
    <v-btn
      class="mb-5 description hover-zoom"
      color="#803d3b"
      size="large"
      variant="elevated"
      elevation="15"
      block
      type="submit"
    >
      Log In
    </v-btn>
  </v-form>

  <!-- Forgot Password Modal -->
  <v-dialog v-model="forgotPasswordDialog" max-width="500" elevation="10">
    <div class="d-flex justify-center mb-2 description">
      <v-row>
        <v-col cols="12">
          <v-card color="#FAEED1" elevation="15" rounded="lg">
            <v-card class="ma-1" color="#803D3B" elevation="15" rounded="lg">
              <v-card-title class="headline text-center topic-title"
                ><h4>Forgot Password</h4></v-card-title
              >
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-card class="mb-2 description" color="#FAEED1" elevation="10" rounded="lg">
      <v-card-text>
        <v-form lazy-validation>
          <v-text-field
            class="mt-2"
            v-model="emailForReset"
            :rules="[requiredValidator, emailValidator]"
            label="Registered Email"
            prepend-inner-icon="mdi-email-outline"
            required
          ></v-text-field>
          <v-alert v-if="emailSent" type="success" class="mt-2">
            A password reset link has been sent to your email.
          </v-alert>
          <v-alert v-if="formAction.formErrorMessage" type="error" class="mt-2">
            {{ formAction.formErrorMessage }}
          </v-alert>
        </v-form>
      </v-card-text>

      <v-card class="mb-5 mx-5" color="#803D3B" variant="outlined">
        <v-card-text class="text-center text-black text-caption description">
          Instructions to reset your password will be sent to your registered email.
        </v-card-text>
      </v-card>
    </v-card>
    <div class="d-flex justify-space-between description">
      <v-row>
        <v-col cols="6">
          <v-card color="#FAEED1" class="hover-zoom" elevation="15" rounded="lg">
            <v-card class="ma-1" elevation="10">
              <v-btn block style="background-color: #803d3b" @click="onForgotPassword">
                <h4 class="text-white">Send Email</h4></v-btn
              >
            </v-card>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card color="#FAEED1" class="hover-zoom" elevation="15" rounded="lg">
            <v-card class="ma-1" elevation="15" rounded="lg">
              <v-btn block style="background-color: #803d3b" @click="forgotPasswordDialog = false"
                ><h4 class="text-white">Cancel</h4></v-btn
              >
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-dialog>

  <v-dialog v-model="successDialog" max-width="448" class="dialog-with-blur">
    <v-card class="mx-auto pa-3" elevation="15" rounded="lg" color="#FAEED1">
      <v-card-title class="d-flex justify-center align-center">
        <h3 class="font-weight-black text-center description">Success</h3>
        <v-icon class="ml-2" :color="'#803d3b'" size="28">mdi-check-circle</v-icon>
      </v-card-title>

      <v-card-text class="text-center text-black text-caption description">
        <h3>Email Sent Successfully!</h3>
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="description hover-zoom"
          color="#803d3b"
          size="large"
          variant="elevated"
          elevation="15"
          block
          @click="successDialog = false"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/unbounded');

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
