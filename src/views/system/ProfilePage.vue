<template>
  <v-app class="animated-background">
    <NavBar @triggerLogoutModal="openLogoutModal" />

    <!-- Main content area -->
    <v-main>
      <v-container fluid>
        <!-- Profile Title -->
        <v-row class="mt-5 justify-center">
          <v-col cols="12" class="text-center">
            <h1 class="text-white font-weight-black description">Profile</h1>
          </v-col>
        </v-row>

        <v-row class="justify-center pt-8">
          <v-col cols="12" md="4" class="mb-5">
            <h3 class="text-white pb-5 description">Personal Information</h3>

            
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

            <!-- Program Select Field -->
          </v-col>

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
            <v-btn color="#803D3B" class="mt-0" block elevation="15" @click="updateProgram"
              >Update</v-btn
            >
          </v-col>
          <v-card class="mb-6 mt-4 mx-3" color="white" variant="outlined">
            <v-card-text class="text-justify text-white text-caption description">
              Warning: Changing your current PROGRAM will also change the COURSES that are available
              and displayed on the homepage.
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>

      <!-- Success Modal -->
      <v-dialog v-model="successDialog" max-width="448">
        <v-card class="mx-auto pa-3" elevation="15" rounded="lg" color="#FAEED1">
          <v-card-title>
            <h3 class="font-weight-black text-center description">Success</h3>
          </v-card-title>
          <v-card class="mb-3" color="#803d3b" variant="outlined">
            <v-card-text class="text-center text-black text-caption description">
              <h3>Information Successfully Updated!</h3>
            </v-card-text>
          </v-card>
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

      <LogoutModal ref="logoutModalRef" />
    </v-main>
  </v-app>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import LogoutModal from '@/components/auth/LogoutModal.vue'
import NavBar from '@/components/layout/NavBar.vue'

const logoutModalRef = ref(null)
const openLogoutModal = () => {
  logoutModalRef.value.open()
}

const firstName = ref('')
const lastName = ref('')
const idNumber = ref('')
const selectedProgram = ref('')
const newPassword = ref('')
const successDialog = ref(false)
const programs = ref([]) // Will hold program objects

// Fetch user data from Supabase
const fetchUserData = async () => {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser()
  if (error) {
    console.error('Error fetching user:', error)
    return
  }

  // Assuming you have a function to get user metadata
  const userMetaData = user.user_metadata
  firstName.value = userMetaData.firstname
  lastName.value = userMetaData.lastname
  idNumber.value = userMetaData.idnumber
  selectedProgram.value = userMetaData.program

  // Fetch programs to display
  await fetchPrograms()
}

// Fetch program list from Supabase (make sure this matches your setup)
const fetchPrograms = async () => {
  const { data, error } = await supabase.from('programs').select('*')
  if (error) {
    console.error('Error fetching programs:', error)
    return
  }
  programs.value = data.map((program) => ({
    value: program.id, // UUID of the program
    label: program.program_name // Name of the program
  }))
}

// Update functions
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

const updateProgram = async () => {
  const { error } = await supabase.auth.updateUser({
    data: { program: selectedProgram.value } // Use selected program ID
  })
  if (!error) {
    successDialog.value = true // Show success dialog
  } else {
    console.error('Error updating program:', error)
  }
}

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

// Fetch user data on component mount
onMounted(fetchUserData)
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/unbounded');
.fill-height {
  height: 100vh;
}

.description {
  font-family: 'Unbounded', sans-serif;
}
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

.mobile-nav-drawer {
  backdrop-filter: blur(15px);
}
</style>
