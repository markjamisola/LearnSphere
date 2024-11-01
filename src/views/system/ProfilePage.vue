<template>
  <v-app class="animated-background description">
    <!-- NavBar component with a logout trigger event -->
    <NavBar @triggerLogoutModal="openLogoutModal" />

    <!-- Main content area -->
    <v-main>
      <v-container fluid>
        <!-- Profile Title Section -->
        <v-row class="mt-5 justify-center">
          <v-col cols="12" class="text-center">
            <h1 class="text-white font-weight-black description">Profile</h1>
          </v-col>
        </v-row>

        <!-- Personal Information and Password Reset -->
        <v-row class="justify-center pt-8">
          <v-col cols="12" md="4" class="mb-5">
            <h3 class="text-white pb-5 description">Personal Information</h3>

            <!-- First Name Field with Update Button -->
            <v-text-field
              label="First Name"
              variant="solo"
              hide-details
              prepend-inner-icon="mdi-account-outline"
              v-model="firstName"
              class="description mb-4"
            >
              <template v-slot:append-inner>
                <v-btn color="#803D3B" small elevation="15" @click="updateFirstName">Update</v-btn>
              </template>
            </v-text-field>

            <!-- Last Name Field with Update Button -->
            <v-text-field
              label="Last Name"
              variant="solo"
              hide-details
              prepend-inner-icon="mdi-account-outline"
              v-model="lastName"
              class="description mb-4"
            >
              <template v-slot:append-inner>
                <v-btn color="#803D3B" small elevation="15" @click="updateLastName">Update</v-btn>
              </template>
            </v-text-field>

            <!-- ID Number Field with Update Button -->
            <v-text-field
              label="ID Number"
              variant="solo"
              hide-details
              prepend-inner-icon="mdi-card-account-details-outline"
              v-model="idNumber"
              class="description mb-4"
            >
              <template v-slot:append-inner>
                <v-btn color="#803D3B" small elevation="15" @click="updateIdNumber">Update</v-btn>
              </template>
            </v-text-field>
          </v-col>

          <!-- Reset Password and Change Program Section -->
          <v-col cols="12" md="4">
            <h3 class="text-white pb-5 description">Reset Password</h3>
            <v-text-field
              label="New Password"
              variant="solo"
              elevation="15"
              hide-details
              prepend-inner-icon="mdi-lock-outline"
              v-model="newPassword"
              class="description"
            >
              <template v-slot:append-inner>
                <v-btn color="#803D3B" small elevation="15" @click="updatePassword">Update</v-btn>
              </template>
            </v-text-field>

            <!-- Program Select Dropdown and Update Button -->
            <h3 class="text-white mt-3 pb-3 description">Change Program</h3>
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
            <v-btn color="#803D3B" class="mt-0" block elevation="15" @click="updateProgram">Update</v-btn>
          </v-col>

          <!-- Warning Message for Changing Program -->
          <v-card class="mb-6 mt-4 mx-3" color="white" variant="outlined">
            <v-card-text class="text-justify text-white text-caption description">
              Warning: Changing your current PROGRAM will also change the COURSES that are available
              and displayed on the homepage.
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>

      <!-- Success Modal for User Feedback -->
      <v-dialog v-model="successDialog" max-width="448" class="dialog-with-blur">
        <v-card class="mx-auto pa-3" elevation="15" rounded="lg" color="#FAEED1">
          <v-card-title>
            <h3 class="font-weight-black text-center description">Success</h3>
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

/* Mobile navigation drawer with blur effect */
.dialog-with-blur::v-global(.v-overlay) {
  backdrop-filter: blur(3px);
}
</style>
