<template>
  <v-app class="animated-background description">
    <!-- Geometric Overlay -->
    <div class="geometric-overlay"></div>
    <!-- NavBar component with a logout trigger event -->
    <NavBar @triggerLogoutModal="openLogoutModal" />

    <!-- Main content area -->
    <v-main>
      <v-container fluid>
        <!-- Profile Title Section -->
        <v-row class="mt-5 justify-center">
          <v-col cols="12" class="text-center">
            <h1
              class="text-white font-weight-bold description d-flex align-items-center justify-center"
            >
              <v-icon large :color="textColor" style="margin-right: 10px"> mdi-account </v-icon>
              Profile
            </h1>
          </v-col>
        </v-row>

        <v-row class="justify-center pt-8">
          <v-col cols="12" md="4" class="mb-5">
            <h3 class="text-white pb-5 description">Personal Information</h3>

            <!-- First Name Field in Separate Card -->
            <v-card
              class="pa-2 mb-4"
              elevation="15"
              rounded="lg"
              color="#803d3b"
              variant="elevated"
            >
              <v-text-field
                label="First Name"
                variant="solo"
                hide-details
                prepend-inner-icon="mdi-account-outline"
                v-model="firstName"
                class="description"
                outlined
              >
                <template v-slot:append-inner>
                  <v-btn color="#803d3b" small elevation="15" @click="updateFirstName"
                    >Update</v-btn
                  >
                </template>
              </v-text-field>
            </v-card>

            <!-- Last Name Field in Separate Card -->
            <v-card
              class="pa-2 mb-4"
              elevation="15"
              rounded="lg"
              color="#803d3b"
              variant="elevated"
            >
              <v-text-field
                label="Last Name"
                variant="solo"
                hide-details
                prepend-inner-icon="mdi-account-outline"
                v-model="lastName"
                class="description"
                outlined
              >
                <template v-slot:append-inner>
                  <v-btn color="#803d3b" small elevation="15" @click="updateLastName">Update</v-btn>
                </template>
              </v-text-field>
            </v-card>

            <!-- ID Number Field in Separate Card -->
            <v-card
              class="pa-2 mb-4"
              elevation="15"
              rounded="lg"
              color="#803d3b"
              variant="elevated"
            >
              <v-text-field
                label="ID Number"
                variant="solo"
                hide-details
                prepend-inner-icon="mdi-card-account-details-outline"
                v-model="idNumber"
                class="description"
                outlined
              >
                <template v-slot:append-inner>
                  <v-btn color="#803d3b" small elevation="15" @click="updateIdNumber">Update</v-btn>
                </template>
              </v-text-field>
            </v-card>
          </v-col>

          <!-- Reset Password and Change Program Section with Separate Cards -->
          <v-col cols="12" md="4">
            <h3 class="text-white pb-5 description">Reset Password</h3>

            <!-- New Password Field in Separate Card -->
            <v-card
              class="pa-2 mb-4"
              elevation="15"
              rounded="lg"
              color="#803d3b"
              variant="elevated"
            >
              <v-text-field
                label="New Password"
                variant="solo"
                elevation="15"
                hide-details
                prepend-inner-icon="mdi-lock-outline"
                v-model="newPassword"
                class="description"
                outlined
              >
                <template v-slot:append-inner>
                  <v-btn color="#803d3b" small elevation="15" @click="updatePassword">Update</v-btn>
                </template>
              </v-text-field>
            </v-card>

            <!-- Program Select Dropdown and Update Button -->
            <h3 class="text-white mt-3 pb-3 description">Change Program</h3>
            <v-card class="pa-2" elevation="15" rounded="lg" color="#803d3b">
              <v-select
                :items="programs"
                v-model="selectedProgram"
                item-title="label"
                item-value="value"
                placeholder="Program"
                prepend-inner-icon="mdi-laptop"
                variant="solo"
                class="description"
              ></v-select>
              <v-btn color="#803D3B" class="mt-0" block elevation="15" @click="updateProgram"
                >Update</v-btn
              >
            </v-card>
          </v-col>

          <!-- Warning Message for Changing Program -->
          <v-card class="mb-6 mt-4 mx-3" color="white" variant="outlined" rounded="lg">
            <v-card-text class="d-flex align-center text-justify text-white description">
              <v-icon class="mr-2" :color="'white'">mdi-alert-circle-outline</v-icon>
              Warning: Changing your current PROGRAM will also change the COURSES that are available
              and displayed on the homepage.
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>

      <!-- Success Modal for User Feedback -->
      <v-dialog v-model="successDialog" max-width="448" class="dialog-with-blur">
        <v-card class="mx-auto pa-3" elevation="15" rounded="lg" color="#FAEED1">
          <v-card-title class="d-flex justify-center align-center">
            <h3 class="font-weight-black text-center description">Success</h3>
            <v-icon class="ml-2" :color="'#803d3b'" size="28">mdi-check-circle</v-icon>
          </v-card-title>

          <v-card-text class="text-center text-black text-caption description">
            <h3>Information Successfully Updated!</h3>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="description"
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

      <!-- Logout Modal Component -->
      <LogoutModal ref="logoutModalRef" />
    </v-main>
  </v-app>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import LogoutModal from '@/components/auth/LogoutModal.vue'
import NavBar from '@/components/layout/NavBar.vue'

// Reference for logout modal
const logoutModalRef = ref(null)
const openLogoutModal = () => {
  logoutModalRef.value.open()
}

// State variables for user information
const firstName = ref('')
const lastName = ref('')
const idNumber = ref('')
const selectedProgram = ref('')
const newPassword = ref('')
const successDialog = ref(false)
const programs = ref([]) // Holds available program options

// Fetch user data from Supabase on component mount
const fetchUserData = async () => {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser()
  if (error) {
    console.error('Error fetching user:', error)
    return
  }

  // Assign user metadata to variables
  const userMetaData = user.user_metadata
  firstName.value = userMetaData.firstname
  lastName.value = userMetaData.lastname
  idNumber.value = userMetaData.idnumber
  selectedProgram.value = userMetaData.program

  // Fetch available programs
  await fetchPrograms()
}

// Fetch list of programs from Supabase
const fetchPrograms = async () => {
  const { data, error } = await supabase.from('programs').select('*')
  if (error) {
    console.error('Error fetching programs:', error)
    return
  }
  programs.value = data.map((program) => ({
    value: program.id, // Program ID
    label: program.program_name // Program name
  }))
}

// Update user first name in database
const updateFirstName = async () => {
  const { error } = await supabase.auth.updateUser({
    data: { firstname: firstName.value }
  })
  if (!error) {
    successDialog.value = true // Show success dialog
  } else {
    console.error('Error updating first name:', error)
  }
}

// Update user last name in database
const updateLastName = async () => {
  const { error } = await supabase.auth.updateUser({
    data: { lastname: lastName.value }
  })
  if (!error) {
    successDialog.value = true // Show success dialog
  } else {
    console.error('Error updating last name:', error)
  }
}

// Update user ID number in database
const updateIdNumber = async () => {
  const { error } = await supabase.auth.updateUser({
    data: { idnumber: idNumber.value }
  })
  if (!error) {
    successDialog.value = true // Show success dialog
  } else {
    console.error('Error updating ID number:', error)
  }
}

// Update user program in database
const updateProgram = async () => {
  const { error } = await supabase.auth.updateUser({
    data: { program: selectedProgram.value } // Selected program ID
  })
  if (!error) {
    successDialog.value = true // Show success dialog
  } else {
    console.error('Error updating program:', error)
  }
}

// Update user password in database
const updatePassword = async () => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword.value
  })
  if (!error) {
    successDialog.value = true // Show success dialog
  } else {
    console.error('Error updating password:', error)
  }
}

// Fetch user data when component mounts
onMounted(fetchUserData)
</script>

<style scoped>
/* Importing custom font */
@import url('https://fonts.cdnfonts.com/css/unbounded');

/* Setting full height for main container */
.fill-height {
  height: 100vh;
}

/* Styling for description font family */
.description {
  font-family: 'Unbounded', sans-serif;
}

/* Animated background gradient */
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

.animated-background {
  background: linear-gradient(270deg, #803d3b, #c7b793, #aa7154, #b54646);
  background-size: 800% 800%;
  animation: gradientBackground 15s ease infinite;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Geometric overlay styles */
.geometric-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Ensure clicks go through this overlay */
  z-index: 0; /* Ensure this is behind other content */
}

/* Adding multiple geometric shapes with improved visibility */
.geometric-overlay::before,
.geometric-overlay::after {
  content: '';
  position: absolute;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background: rgba(255, 255, 255, 0.15); /* Slightly higher opacity for better clarity */
  clip-path: polygon(20% 0%, 0% 20%, 20% 100%, 100% 20%, 80% 0%); /* First shape */
  opacity: 0.5; /* Increased opacity for better visibility */
}

/* Layering different shapes with clarity */
.geometric-overlay::after {
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%); /* Second shape */
  opacity: 0.4; /* Slightly more transparent */
}

/* Additional smaller geometric shapes */
.geometric-overlay div {
  position: absolute;
  width: 20%; /* Increased size for better visibility */
  height: 20%; /* Increased size for better visibility */
  background: rgba(255, 255, 255, 0.25); /* Higher opacity for clearer visibility */
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%); /* Triangle shape */
  opacity: 0.6; /* Increased opacity for clarity */
}

/* Random positioning for aesthetic */
.geometric-overlay div:nth-child(1) {
  top: 10%;
  left: 5%;
  transform: rotate(15deg);
}
.geometric-overlay div:nth-child(2) {
  top: 30%;
  left: 25%;
  transform: rotate(30deg);
}
.geometric-overlay div:nth-child(3) {
  top: 50%;
  left: 60%;
  transform: rotate(-15deg);
}
.geometric-overlay div:nth-child(4) {
  top: 70%;
  left: 75%;
  transform: rotate(45deg);
}
.geometric-overlay div:nth-child(5) {
  top: 20%;
  left: 80%;
  transform: rotate(10deg);
}

/* Additional distinct geometric shapes */
.geometric-overlay .shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.3); /* Background for new shapes */
  opacity: 0.5; /* Opacity for better visibility */
}

/* Mobile navigation drawer with blur effect */
.dialog-with-blur::v-global(.v-overlay) {
  backdrop-filter: blur(3px);
}
</style>
