<template>
  <v-dialog v-model="show" max-width="500">
    <v-card class="pa-0" color="#FAEED1" block elevation="10">
      <v-card-title class="headline text-center mt-6 mb-0">
        <v-icon large>mdi-emoticon-sad-outline</v-icon>
      </v-card-title>
      <v-card-text class="font-weight-black text-center mt-0"
        ><h2>Are you sure you want to Log Out?</h2></v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-row class="mb-3">
          <v-btn class="mx-2" color="whtie" variant="elevated" text @click="logout">Logout</v-btn>
          <v-btn class="mx-2" color="#803d3b" variant="elevated" text @click="cancelLogout"
            >Cancel</v-btn
          >
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase, formActionDefault } from '@/utils/supabase'

// A ref to control the modal's visibility
const show = ref(false)
const router = useRouter()

// Function to open the modal
const open = () => {
  show.value = true
}

const formAction = ref({
  ...formActionDefault
})
// Function to close the modal without logging out
const cancelLogout = () => {
  show.value = false
}

// Perform the logout logic
const logout = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

// Get supabase logout functionality
const { error } = await supabase.auth.signOut()
if (error) {
  console.error('Error during logout:', error)
  return
}

formAction.value.formProcess = false
// Reset State

router.replace('/load')
}

// Expose the open function so the parent can call it
defineExpose({
  open
})
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
