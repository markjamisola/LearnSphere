<script setup>
import { ref } from 'vue'
import { requiredValidator, emailValidator } from '@/utils/validators'
import { supabase } from '@/utils/supabase'
import { formActionDefault } from '@/utils/supabase'
import { useRouter } from 'vue-router'
import AlertNotification from './AlertNotification.vue'

const visible = ref(false)
const refVForm = ref()

const formDataDefault = {
  email: '',
  password: ''
}

const router = useRouter()

const formData = ref({
  ...formDataDefault
})

const formAction = ref({
  ...formActionDefault
})

const onLogin = async () => {
  formAction.value = { formActionDefault }
  formAction.value.formProcess = true

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.value.email,
    password: formData.value.password
  })
  if (error) {
    console.log(error)
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    console.log(data)
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
</script>
<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  ></AlertNotification>
  <v-form ref="refVForm" @submit.prevent="onFormSubmit" class="mt-5">
    <!-- Account Input -->
    <div class="text-subtitle-1 text-medium-emphasis">
      <h4 class="text-black">Account</h4>
    </div>
    <v-text-field
      v-model="formData.email"
      density="compact"
      placeholder="Email or ID Number"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      :rules="[requiredValidator, emailValidator]"
    ></v-text-field>

    <!-- Password Input -->
    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
      <h4 class="text-black">Password</h4>
    </div>
    <v-text-field
      v-model="formData.password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
      :rules="[requiredValidator]"
    ></v-text-field>

    <v-card class="mb-3" color="surface-variant" variant="outlined">
      <v-card-text class="text-justify text-black text-caption">
        Warning: If you try to log in with the wrong password three times, your account will be
        locked for three hours. To regain access, you can either wait for the lock to expire or
        click "Reset Password" to create a new password and log in right away.
      </v-card-text>
    </v-card>

    <v-row class="mb-2 justify-space-between">
      <v-col cols="6">
        <RouterLink class="text-deep-orange-darken-4 text-decoration-none" to="/forgot">
          <h5>Reset Password</h5>
        </RouterLink>
      </v-col>
      <v-col cols="6" class="d-flex justify-end pr-4">
        <RouterLink class="text-deep-orange-darken-4 text-decoration-none" to="/adminlogin">
          <h5>Admin Log In</h5>
        </RouterLink>
      </v-col>
    </v-row>

    <!-- Log In Button -->
    <v-btn
      class="mb-5"
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
</template>
