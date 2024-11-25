<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const newPassword = ref('')
const confirmPassword = ref('')
const visible = ref(false)
const router = useRouter()
const errorMessage = ref('')
const contactDialog = ref(false)
const successDialog = ref(false)
const passnotlongDialog = ref(false)
const passnotmatchDialog = ref(false)
const invalidTokenDialog = ref(false)
const unexpectedErrorDialog = ref(false)

// Function to go back to login after reset
const goToLogin = async () => {
  await supabase.auth.signOut() // Ensure the user is logged out from Supabase
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
    passnotlongDialog.value = true
    return false
  }

  if (newPassword.value !== confirmPassword.value) {
    passnotmatchDialog.value = true
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
    invalidTokenDialog.value = true // Show invalid token dialog
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
      unexpectedErrorDialog.value = true // Show unexpected error dialog
    } else {
      successDialog.value = true // Show success dialog
      setTimeout(() => {
        goToLogin() // Call the updated goToLogin function
      }, 2000)
    }
  } catch (error) {
    errorMessage.value = `An unexpected error occurred: ${error.message}`
    unexpectedErrorDialog.value = true // Show unexpected error dialog
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
            <v-img class="mx-auto mb-0 mt-1" max-width="228" src="/newlogo.png"></v-img>
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
                  <span
                    @click.prevent="contactDialog = true"
                    class="text-deep-orange-darken-4 font-weight-bold"
                    style="cursor: pointer"
                  >
                    contact support.
                  </span>
                </v-card-text>
              </v-card>

              <!-- Update Password Button -->
              <v-btn
                class="mb-5 description hover-zoom"
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
      <v-dialog v-model="successDialog" persistent max-width="400">
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

      <!-- Password not long enough modal -->
      <v-dialog v-model="passnotlongDialog" persistent max-width="400">
        <v-card
          class="mx-auto pa-8 pb-5"
          elevation="15"
          max-width="448"
          rounded="lg"
          color="#803d3b"
        >
          <v-card-title>
            <h3 class="font-weight-black text-center description">Password Too Short!</h3>
          </v-card-title>
          <v-card-text class="text-center text-white text-caption description">
            Your password must be at least 8 characters long.
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="description"
              color="#FAEED1"
              size="large"
              variant="elevated"
              elevation="15"
              block
              @click="passnotlongDialog = false"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Password does not match modal -->
      <v-dialog v-model="passnotmatchDialog" persistent max-width="400">
        <v-card
          class="mx-auto pa-8 pb-5"
          elevation="15"
          max-width="448"
          rounded="lg"
          color="#803d3b"
        >
          <v-card-title>
            <h3 class="font-weight-black text-center description">Passwords Do Not Match!</h3>
          </v-card-title>
          <v-card-text class="text-center text-white text-caption description">
            Please make sure both passwords match.
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="description"
              color="#FAEED1"
              size="large"
              variant="elevated"
              elevation="15"
              block
              @click="passnotmatchDialog = false"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Invalid or expired token modal -->
      <v-dialog v-model="invalidTokenDialog" max-width="400" @click:outside="goToLogin">
        <v-card
          class="mx-auto pa-8 pb-5"
          elevation="15"
          max-width="448"
          rounded="lg"
          color="#803d3b"
        >
          <v-card-title>
            <h3 class="font-weight-black text-center description">Invalid Token</h3>
          </v-card-title>
          <v-card-text class="text-center text-white text-caption description">
            The token is invalid or has expired. Please request a new password reset.
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

      <!-- Unexptected error modal -->
      <v-dialog v-model="unexpectedErrorDialog" max-width="400" @click:outside="goToLogin">
        <v-card
          class="mx-auto pa-8 pb-5"
          elevation="15"
          max-width="448"
          rounded="lg"
          color="#803d3b"
        >
          <v-card-title>
            <h3 class="font-weight-black text-center description">Unexpected Error</h3>
          </v-card-title>
          <v-card-text class="text-center text-white text-caption description">
            {{ errorMessage }}
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
              If you have any questions or need assistance, please contact us using the details
              below:
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
              <a class="text-decoration-none text-red" href="mailto:ushyne.esclamado@carsu.edu.ph">
                ushyne.esclamado@carsu.edu.ph</a
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
              <v-card color="#FAEED1" class="hover-zoom mt-2" elevation="15" rounded="lg">
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
.hover-zoom {
  transition: transform 0.3s ease; /* Smooth transition */
}

.hover-zoom:hover {
  transform: scale(1.05); /* Scale up on hover */
}
</style>
