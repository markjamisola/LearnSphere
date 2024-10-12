<template>
  <v-app class="background-color">
    <!-- Navigation Drawer here -->
    <v-navigation-drawer app clipped permanent color="transparent" class="teal-darken-4" width="80">
      <v-list class="d-flex flex-column align-center justify-center fill-height">
        <v-list-item-group>
          <!-- Centered Navigation icons with links -->
          <v-list-item @click="$router.push('/home')" class="text-center">
            <v-img max-width="50" src="/public/syslogo.png" alt="Logo"></v-img>
          </v-list-item>

          <!-- Navigation icons with links -->
          <v-list-item @click="$router.push('/home')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/home' ? 'black' : 'white'">mdi-home</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/profile')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/profile' ? 'black' : 'white'"
                >mdi-account</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/history')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/history' ? 'black' : 'white'"
                >mdi-history</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/about')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/about' ? 'black' : 'white'"
                >mdi-information</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/logout')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/logout' ? 'black' : 'white'"
                >mdi-logout</v-icon
              >
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- Main content area -->
    <v-main>
      <!-- Content Header -->
      <v-container fluid>
        <v-row class="mt-8">
          <v-col cols="12" class="text-center">
            <h1 class="text-white">IT-109</h1>
          </v-col>
        </v-row>
        <h3 class="text-white text-center">SYSTEMS INTEGRATION AND ARCHITECTURE 1</h3>
      </v-container>

      <!-- Video and PDF columns -->
      <v-container fluid>
        <v-row>
          <!-- Videos column -->
          <v-col cols="12" md="6">
            <v-card class="mb-5" color="blue-grey-darken-1" dark>
              <v-card-title class="text-center">Modeling Requirements</v-card-title>
              <v-card-text>
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/qs4Z3PayuVQ?si=lPk7bRXFLmj1r0sd"
                  title="YouTube video"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </v-card-text>
            </v-card>

            <v-card class="mb-5" color="blue-grey-darken-1" dark>
              <v-card-title class="text-center">Web Services and Their Components</v-card-title>
              <v-card-text>
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/RluytloEiaM?si=YskRsQCE0_q_qyTC"
                  title="YouTube video"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- PDFs column -->
          <v-col cols="12" md="6">
            <v-card class="mb-5" color="blue-grey-darken-1" dark>
              <v-card-title class="text-center">C4 Model</v-card-title>
              <v-card-text>
                <embed
                  src="/public/pdfs/C4-Model.pdf"
                  type="application/pdf"
                  width="100%"
                  height="500px"
                />
              </v-card-text>
            </v-card>

            <v-card class="mb-5" color="blue-grey-darken-1" dark>
              <v-card-title class="text-center">System Architecture Overview</v-card-title>
              <v-card-text>
                <embed
                  src="/public/pdfs/System-architecture_overview.pdf"
                  type="application/pdf"
                  width="100%"
                  height="500px"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
// No CSS needed for now, just using Vuetify components and positioning
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.background-color {
  background-color: #243642;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
