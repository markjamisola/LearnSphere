<template>
  <v-dialog v-model="show" max-width="400" class="dialog-with-blur">
    <v-card color="#FAEED1" elevation="10" class="dialog-card">
      <v-card-title class="headline text-center mt-4 mb-0">
        <v-icon large color="#803d3b">mdi-emoticon-sad-outline</v-icon>
      </v-card-title>
      <v-card-text class="font-weight-black text-center mt-0">
        <h4
          class="font-weight-black"
          style="color: #803d3b; font-family: 'Unbounded', sans-serif"
        >
          Are you sure you want to Log Out?
        </h4>
      </v-card-text>
      <v-card-actions class="justify-center dialog-actions mb-2">
        <v-btn
          color="#FAEED1"
          text
          class="confirm-btn font-weight-bold hover-zoom"
          @click="logout"
          style="
            background-color: white;
            color: #803d3b;
            font-family: 'Unbounded', sans-serif;
            margin-right: 5px;
          "
        >
          Logout
        </v-btn>
        <v-btn
          color="#FAEED1"
          text
          class="cancel-btn font-weight-bold hover-zoom"
          @click="cancelLogout"
          style="
            font-family: 'Unbounded', sans-serif;
            background-color: #803d3b;
            color: #faeed1;
            margin-left: 5px;
          "
        >
          Cancel
        </v-btn>
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

  router.replace('/login')
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
.dialog-with-blur {
  backdrop-filter: blur(10px); /* Adjust the blur strength as needed */
  background-color: rgba(0, 0, 0, 0.3); /* Adds a slight dark overlay with blur */
}
.hover-zoom {
  transition: transform 0.3s ease; /* Smooth transition */
}

.hover-zoom:hover {
  transform: scale(1.05); /* Scale up on hover */
}
</style>
