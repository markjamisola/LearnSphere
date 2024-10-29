<template>
  <v-app class="animated-background">
    <!-- Transparent Navigation Drawer for Mobile and Desktop -->
    <v-navigation-drawer
      v-if="$vuetify.display.mdAndUp"
      fixed
      clipped
      color="transparent"
      class="#803D3B"
      width="80"
      app
    >
      <v-list class="d-flex flex-column justify-space-between fill-height">
        <!-- Logo at the Top -->
        <v-list-item class="text-center">
          <v-img max-width="50" src="/logo6.png" alt="Logo"></v-img>
        </v-list-item>

        <v-list-item-group>
          <!-- Navigation icons with links -->
          <v-list-item @click="$router.push('/home')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/home' ? '#000' : 'white'">mdi-home</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/profile')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/profile' ? '#000' : 'white'"
                >mdi-account</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/history')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/history' ? '#000' : 'white'"
                >mdi-history</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/about')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/about' ? '#000' : 'white'"
                >mdi-information</v-icon
              >
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>

        <!-- Log Out Button at the Bottom -->
        <v-list-item @click="openLogoutModal" class="text-center">
          <v-list-item-icon>
            <v-icon large color="white">mdi-logout</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Overlay for blur effect -->
    <v-overlay v-if="drawer" :absolute="true" class="overlay" z-index="1">
      <div class="bg-black bg-opacity-50" style="backdrop-filter: blur(50px); height: 100%"></div>
    </v-overlay>

    <!-- Navigation Drawer for Mobile (overlay and toggleable) -->
    <v-navigation-drawer
      v-if="$vuetify.display.smAndDown"
      v-model="drawer"
      temporary
      app
      color="transparent mobile-nav-drawer"
      class="teal-darken-4"
      width="80"
    >
      <v-list class="d-flex flex-column align-center justify-center fill-height">
        <v-list-item-group>
          <!-- Centered Navigation icons with links -->
          <v-list-item @click="$router.push('/home')" class="text-center">
            <v-img max-width="50" src="/logo6.png" alt="Logo"></v-img>
          </v-list-item>

          <!-- Navigation icons with links -->
          <v-list-item @click="$router.push('/home')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/home' ? '#000' : 'white'">mdi-home</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/profile')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/profile' ? '#000' : 'white'"
                >mdi-account</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/history')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/history' ? '#000' : 'white'"
                >mdi-history</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/about')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/about' ? '#000' : 'white'"
                >mdi-information</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="openLogoutModal" class="text-center">
            <v-list-item-icon>
              <v-icon large color="white">mdi-logout</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- App bar with toggle button only for mobile screens -->
    <v-app-bar v-if="$vuetify.display.smAndDown" app color="transparent" class="mobile-nav-drawer">
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-white font-weight-black">LearnSphere</v-toolbar-title>
    </v-app-bar>

    <!-- Main content area -->
    <v-main>
      <v-container fluid>
        <!-- Profile Title -->
        <v-row class="mt-5 justify-center">
          <v-col cols="12" class="text-center">
            <h1 class="text-white font-weight-black description">Profile</h1>
          </v-col>
        </v-row>

        <!-- Main Row for Personal Information (Left) and Reset Password (Right) -->
        <v-row class="justify-center pt-8">
          <!-- Personal Information Section on Left Side -->
          <v-col cols="12" md="4" class="mb-5">
            <h3 class="text-white pb-5 description">Personal Information</h3>

            <!-- First Name Field with Margin for Spacing -->
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

            <!-- Last Name Field with Margin for Spacing -->
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

            <!-- ID Number Field with Margin for Spacing -->
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
            <v-btn color="#FAEED1" class="mt-0" block elevation="15" @click="updateProgram"
              >Update</v-btn
            >
          </v-col>

          <!-- Reset Password Section on Right Side -->
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
          </v-col>
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
import LogoutModal from '@/components/auth/LogoutModal.vue' // Adjust path as necessary

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
