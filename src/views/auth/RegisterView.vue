<script setup>
import RegisterForm from '@/components/auth/RegisterForm.vue'
</script>

<template>
  <v-responsive>
    <v-app class="animated-background">
      <!-- Animated background applied -->
      <v-container fluid>
        <v-row class="fill-height align-self-center" align="center" justify="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-img class="mx-auto mb-0 mt-1" max-width="200" src="/logo5.png"></v-img>

            <!-- Sign-Up Form Card -->
            <v-card
              class="mx-auto pa-8 pb-5"
              elevation="15"
              max-width="448"
              rounded="lg"
              color="#FAEED1"
            >
              <!-- Title -->
              <template v-slot:title>
                <h3 class="font-weight-black text-center">Sign Up</h3>
              </template>

              <!-- Form Field -->
              <RegisterForm></RegisterForm>

              <!-- Already Have an Account link -->
              <v-card-text class="text-center pt-0">
                <RouterLink class="text-black text-decoration-none text-black" to="/login">
                  Already have an account? Log in
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
</style>
