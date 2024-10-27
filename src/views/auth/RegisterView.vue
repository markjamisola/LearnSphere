<script setup>
import RegisterForm from '@/components/auth/RegisterForm.vue'
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

<script>
export default {
  data() {
    return {
      // Fewer icons to reduce the density
      icons: Array(10).fill([
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
      ]).flat()
    }
  }
}
</script>

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
  background: linear-gradient(270deg, #803d3b, #c7b793, #aa7154, #b54646);
  background-size: 800% 800%;
  animation: gradientBackground 15s ease infinite;
  height: 100%;
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
</style>
