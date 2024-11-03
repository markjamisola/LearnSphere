<template>
  <v-app class="animated-background description">
    <div class="geometric-overlay"></div>
    <AdminNav @triggerLogoutModal="openLogoutModal" />

    <!-- Main content area -->
    <v-main>
      <v-container fluid>
        <!-- Profile Title -->
        <v-row class="mt-5 justify-center">
    <v-col cols="12" class="text-center">
        <h1 class="text-white font-weight-black description d-flex align-items-center justify-center">
            <box-icon name="user" color="white" size="50px" style="margin-right: 10px;"></box-icon>
            Admin Profile
        </h1>
    </v-col>
</v-row>


<v-row class="justify-center pt-8">
  <v-col cols="12" md="4" class="mb-5">
    <h3 class="text-white pb-5 description">Personal Information</h3>

    <v-card class="pa-2 mb-4" elevation="15" rounded="lg" color="#803d3b" variant="elevated">
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
          <v-btn color="#803D3B" small elevation="15" @click="updateFirstName">Update</v-btn>
        </template>
      </v-text-field>
    </v-card>

    <v-card class="pa-2 mb-4" elevation="15" rounded="lg" color="#803d3b" variant="elevated">
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
          <v-btn color="#803D3B" small elevation="15" @click="updateLastName">Update</v-btn>
        </template>
      </v-text-field>
    </v-card>

    <v-card class="pa-2 mb-4" elevation="15" rounded="lg" color="#803d3b" variant="elevated">
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
          <v-btn color="#803D3B" small elevation="15" @click="updateIdNumber">Update</v-btn>
        </template>
      </v-text-field>
    </v-card>
  </v-col>

  <v-col cols="12" md="4">
    <h3 class="text-white pb-5 description">Reset Password</h3>
    <v-card class="pa-2 mb-4" elevation="15" rounded="lg" color="#803d3b" variant="elevated">
      <v-text-field
        label="New Password"
        variant="solo"
        hide-details
        prepend-inner-icon="mdi-lock-outline"
        v-model="newPassword"
        class="description"
        outlined
      >
        <template v-slot:append-inner>
          <v-btn color="#803D3B" small elevation="15" @click="updatePassword">Update</v-btn>
        </template>
      </v-text-field>
    </v-card>
  </v-col>
</v-row>

      </v-container>

      <!-- Success Modal -->
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

      <LogoutModal ref="logoutModalRef" />
    </v-main>
  </v-app>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import LogoutModal from '@/components/auth/LogoutModal.vue'
import AdminNav from '@/components/layout/AdminNav.vue'

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
.geometric-overlay div:nth-child(1) { top: 10%; left: 5%; transform: rotate(15deg); }
.geometric-overlay div:nth-child(2) { top: 30%; left: 25%; transform: rotate(30deg); }
.geometric-overlay div:nth-child(3) { top: 50%; left: 60%; transform: rotate(-15deg); }
.geometric-overlay div:nth-child(4) { top: 70%; left: 75%; transform: rotate(45deg); }
.geometric-overlay div:nth-child(5) { top: 20%; left: 80%; transform: rotate(10deg); }

/* Additional distinct geometric shapes */
.geometric-overlay .shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.3); /* Background for new shapes */
  opacity: 0.5; /* Opacity for better visibility */
}

.mobile-nav-drawer {
  backdrop-filter: blur(15px);
}

.dialog-with-blur {
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
