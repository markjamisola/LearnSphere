<script setup>
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<template>
  <v-responsive>
    <v-app class="animated-background">
      <!-- Use v-row and v-col to center content -->
      <v-container fluid>
        <v-row class="fill-height align-self-center" align="center" justify="center">
          <v-col cols="12" sm="8" md="6" lg="4" flex>
            <!-- Logo -->
            <v-img class="mx-auto mb-0 mt-1" max-width="200" src="/logo5.png"></v-img>

            <!-- Card for Login Form -->
            <v-card
              class="mx-auto pa-6 pb-4 justify-center align-center"
              elevation="12"
              rounded="lg"
              color="#FAEED1"
            >
              <template v-slot:title>
                <h3 class="font-weight-black text-center">Log In</h3>
              </template>

              <!-- Form Field -->
              <LoginForm></LoginForm>

              <!-- Sign Up Link -->
              <v-card-text class="text-center pt-0">
                <RouterLink class="text-black text-decoration-none text-black" to="/register">
                  Sign Up Now
                </RouterLink>
                <v-icon icon="mdi-chevron-right"></v-icon>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </v-responsive>
</template>

<style scoped>
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

.animated-background {
  background: linear-gradient(270deg, #803d3b, #faeed1, #aa7154, #b54646);
  background-size: 800% 800%;
  animation: gradientBackground 15s ease infinite;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Customize other styles if needed */
</style>
