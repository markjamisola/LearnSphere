<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const dialog = ref(false)
const newPassword = ref('')
const confirmPassword = ref('')
const visible = ref(false)
const router = useRouter()
const errorMessage = ref('')

// Function to go back to login after reset
const goToLogin = async () => {
  await supabase.auth.signOut() // Ensure the user is logged out from Supabase
  dialog.value = false
  router.push('/login') // Redirect to the login page
}

// Function to extract access token from URL hash
const getAccessToken = () => {
  const hash = window.location.hash.substr(1) // Remove the leading '#'
  const params = new URLSearchParams(hash)
  return params.get('access_token') // Retrieve the access_token
}

const validatePasswords = () => {
  if (newPassword.value.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters long.'
    dialog.value = true
    return false
  }

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    dialog.value = true
    return false
  }

  return true
}

const handlePasswordUpdate = async () => {
  // Validate passwords
  if (!validatePasswords()) return

  const accessToken = getAccessToken() // Get the access token from the URL

  console.log('Access Token:', accessToken) // Log the token to verify

  if (!accessToken) {
    errorMessage.value = 'Invalid or expired token. Please request a new password reset.'
    dialog.value = true // Show modal for invalid token
    return
  }

  try {
    // Update the user's password using the access token
    const { error } = await supabase.auth.updateUser(
      {
        password: newPassword.value
      },
      {
        accessToken: accessToken
      }
    )

    if (error) {
      console.error('Update Error:', error)
      errorMessage.value = error.message // Set error message for modal
      dialog.value = true // Show error dialog
    } else {
      dialog.value = true // Show success dialog
      setTimeout(() => {
        goToLogin() // Call the updated goToLogin function
      }, 2000)
    }
  } catch (error) {
    errorMessage.value = `An unexpected error occurred: ${error.message}`
    dialog.value = true // Show error dialog
  }
}

// Sign out any currently logged-in user
onMounted(async () => {
  const { user } = await supabase.auth.getUser()
  if (user) {
    await supabase.auth.signOut() // Ensure the user is logged out
  }
})
</script>

<template>
  <v-responsive>
    <v-app class="animated-background">
      <!-- Floating Icons in Background -->
      <div class="anim-elements">
        <div
          class="anim-element"
          v-for="(icon, index) in icons"
          :key="index"
          :style="{
            '--i': index + 1,
            top: `${Math.random() * 120}vh`,
            left: `${Math.random() * 150}vw`,
            animationDuration: `${10 + Math.random() * 10}s`,
            fontSize: `${20 + Math.random() * 40}px`
          }"
        >
          <i :class="icon"></i>
        </div>
      </div>
      <v-alert v-if="errorMessage" type="error" class="mt-4">
        {{ errorMessage }}
      </v-alert>

      <v-container fluid>
        <v-row class="align-center justify-center" align="center" justify="center">
          <v-col>
            <v-img class="mx-auto mb-0 mt-1" max-width="228" src="/logo5.png"></v-img>
            <v-card
              class="mx-auto pa-8 pb-5"
              elevation="15"
              max-width="448"
              rounded="lg"
              color="#FAEED1"
            >
              <template v-slot:title>
                <h3 class="font-weight-black text-center description">Reset Password</h3>
              </template>

              <!-- New Password Field -->
              <h5 class="text-black description">New Password</h5>
              <v-text-field
                v-model="newPassword"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                color="#803d3b"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                class="description"
                @click:append-inner="visible = !visible"
              ></v-text-field>

              <!-- Confirm New Password Field -->
              <h5 class="text-black description">Confirm New Password</h5>
              <v-text-field
                v-model="confirmPassword"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                color="#803d3b"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                class="description"
                @click:append-inner="visible = !visible"
              ></v-text-field>

              <v-card class="mb-5" color="#803d3b" variant="outlined">
                <v-card-text class="text-caption text-justify text-black description">
                  Please remember your password to avoid being restricted. If you need assistance,
                  please
                  <a
                    @click.prevent="contactDialog = true"
                    class="text-deep-orange-darken-4 font-weight-bold"
                  >
                    contact support.
                  </a>
                </v-card-text>
              </v-card>

              <!-- Update Password Button -->
              <v-btn
                class="mb-5 description"
                color="#803d3b"
                size="large"
                variant="elevated"
                elevation="15"
                block
                @click="handlePasswordUpdate"
              >
                Update
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Success Modal -->
      <v-dialog v-model="dialog" max-width="400">
        <v-card
          class="mx-auto pa-8 pb-5"
          elevation="15"
          max-width="448"
          rounded="lg"
          color="#803d3b"
        >
          <v-card-title>
            <h3 class="font-weight-black text-center description">Password Updated!</h3>
          </v-card-title>
          <v-card-text class="text-center text-white text-caption description">
            Your password has been successfully updated. Please log in with your new password.
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="description"
              color="#FAEED1"
              size="large"
              variant="elevated"
              elevation="15"
              block
              @click="goToLogin"
            >
              Back to Log In
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </v-responsive>
</template>

<script>
export default {
  data() {
    return {
      icons: Array(10)
        .fill([
          // List of icons for the floating effect
          'bx bxl-html5',
          'bx bxl-css3',
          'bx bxl-javascript',
          'bx bxl-java',
          'bx bxl-python',
          'bx bxl-php',
          'bx bxl-c-plus-plus',
          'bx bxl-nodejs',
          'bx bxl-typescript',
          'bx bxl-ruby'
        ])
        .flat()
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/unbounded');
/* Background animation */
@keyframes gradientBackground {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.description {
  font-family: 'Unbounded', sans-serif;
}

.animated-background {
  background: linear-gradient(270deg, #803d3b, #c7b793, #aa7154, #b54646);
  background-size: 800% 800%;
  animation: gradientBackground 15s ease infinite;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Floating Icon Styles */
.anim-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.anim-element {
  position: absolute;
  color: rgba(255, 255, 255, 0.5);
  animation: float infinite;
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(100px, -100px);
  }
  100% {
    transform: translate(0, 0);
  }
}

/* Keyframes for sliding in from the right */
@keyframes slide-in {
  from {
    transform: translateY(-100%); /* Start off-screen to the right */
    opacity: 0; /* Start invisible */
  }
  to {
    transform: translateY(0); /* End in place */
    opacity: 1; /* End visible */
  }
}

/* Slide-in class */
.slide-in {
  animation: slide-in 0.5s ease forwards; /* Apply slide-in animation */
}
</style>
