<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field v-model="email" label="Registered Email" required></v-text-field>
    <v-card class="mb-4" color="surface-variant" variant="outlined">
      <v-card-text class="text-justify text-black text-caption">
        <h4>Instructions to reset your password will be sent to your registered email.</h4>
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
        Back
      </v-btn>
      <v-btn
        class="mx-3 mb-6"
        color="#803d3b"
        size="large"
        variant="elevated"
        elevation="15"
        type="submit"
      >
        Send
      </v-btn>
    </v-row>
  </v-form>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

const emit = defineEmits(['email-sent'])
const email = ref('')

const handleSubmit = async () => {
  console.log('Submitting email:', email.value) // Log the email being submitted

  if (!email.value) {
    console.error('Email is required.')
    return
  }

  // Update this line to use the correct method
  const { error } = await supabase.auth.resetPasswordForEmail(email.value)

  if (error) {
    console.error('Error sending email:', error.message)
    // Optionally, display an error message to the user
  } else {
    console.log('Email sent successfully!') // Confirm successful email send
    emit('email-sent') // Emit the event on success
  }
}
</script>
