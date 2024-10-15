<template>
  <v-app class="background-color">
    <!-- Navigation Drawer here -->
    <v-navigation-drawer
      v-if="$vuetify.display.mdAndUp"
      fixed
      clipped
      color="transparent"
      class="teal-darken-4"
      width="80"
      app
    >
      <v-list class="d-flex flex-column justify-space-between fill-height">
        <!-- Logo at the Top -->
        <v-list-item class="text-center">
          <v-img max-width="50" src="/logo6.png" alt="Logo"></v-img>
        </v-list-item>

        <v-list-item-group>
          <v-list-item @click="$router.push('/home')" class="text-center">
            <v-list-item-icon>
              <v-icon
                large
                :color="
                  ['/home', '/it-109'].includes($route.path) ? 'deep-purple-darken-3' : 'white'
                "
              >
                mdi-home
              </v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/profile')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/profile' ? 'deep-purple-darken-3' : 'white'"
                >mdi-account</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/history')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/history' ? 'deep-purple-darken-3' : 'white'"
                >mdi-history</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/about')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/about' ? 'deep-purple-darken-3' : 'white'"
                >mdi-information</v-icon
              >
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>

        <v-list-item @click="$router.push('/logout')" class="text-center">
          <v-list-item-icon>
            <v-icon large :color="$route.path === '/logout' ? 'deep-purple-darken-3' : 'white'"
              >mdi-logout</v-icon
            >
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

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
          <v-list-item @click="$router.push('/home')" class="text-center">
            <v-img max-width="50" src="/logo6.png" alt="Logo"></v-img>
          </v-list-item>

          <v-list-item @click="$router.push('/home')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/home' ? 'deep-purple-darken-3' : 'white'"
                >mdi-home</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/profile')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/profile' ? 'deep-purple-darken-3' : 'white'"
                >mdi-account</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/history')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/history' ? 'deep-purple-darken-3' : 'white'"
                >mdi-history</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/about')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/about' ? 'deep-purple-darken-3' : 'white'"
                >mdi-information</v-icon
              >
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="$router.push('/logout')" class="text-center">
            <v-list-item-icon>
              <v-icon large :color="$route.path === '/logout' ? 'deep-purple-darken-3' : 'white'"
                >mdi-logout</v-icon
              >
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar v-if="$vuetify.display.smAndDown" app color="transparent" class="mobile-nav-drawer">
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-white font-weight-black">LearnSphere</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!-- Content Header -->
      <v-container fluid>
        <v-row class="mt-8">
          <v-col cols="12" class="text-center">
            <h1 class="text-white font-weight-black">IT-109</h1>
          </v-col>
        </v-row>
        <h3 class="text-white text-center">SYSTEMS INTEGRATION AND ARCHITECTURE 1</h3>
      </v-container>

      <!-- Search for Topics -->
      <v-row class="justify-center mb-8 mx-auto">
        <v-col cols="12" sm="8" md="6">
          <v-text-field
            :loading="loading"
            append-inner-icon="mdi-magnify"
            prepend-inner-icon="mdi-lightbulb-on"
            density="comfortable"
            label="Search Topics"
            variant="solo"
            hide-details
            single-line
            elevation="10"
            color="deep-purple-darken-3"
            outlined
            @click:append-inner="onClick"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Video and PDF columns -->
      <v-container fluid>
        <v-row>
          <!-- Videos column -->
          <v-col cols="12" md="6">
            <v-card class="mb-5" color="deep-purple-darken-3" dark elevation="10">
              <v-card-title class="text-center font-weight-black pb-10" 
                >Modeling Requirements</v-card-title
              >
              <v-card-text>
                <v-btn
                  elevation="10"
                  color="deep-purple-lighten-4"
                  block
                  @click="
                    showVideo('https://www.youtube.com/embed/qs4Z3PayuVQ?si=lPk7bRXFLmj1r0sd')
                  "
                  >Watch Video</v-btn
                >
              </v-card-text>
            </v-card>

            <v-card class="mb-5" color="deep-purple-darken-3" dark elevation="10">
              <v-card-title class="text-center font-weight-black pb-10"
                >Web Services and their Components</v-card-title
              >
              <v-card-text>
                <v-btn
                  elevation="10"
                  color="deep-purple-lighten-4"
                  block
                  @click="
                    showVideo('https://www.youtube.com/embed/RluytloEiaM?si=YskRsQCE0_q_qyTC')
                  "
                  >Watch Video</v-btn
                >
              </v-card-text>
            </v-card>
          </v-col>

          <!-- PDFs column -->
          <v-col cols="12" md="6">
            <v-card class="mb-5" color="deep-purple-darken-3" dark elevation="10">
              <v-card-title class="text-center font-weight-black pb-10">C4 Model</v-card-title>
              <v-card-text>
                <v-btn
                  elevation="10"
                  color="deep-purple-lighten-4"
                  block
                  @click="showPdf('/pdfs/C4-Model.pdf')"
                  >Open PDF</v-btn
                >
              </v-card-text>
            </v-card>

            <v-card class="mb-5" color="deep-purple-darken-3" dark elevation="10">
              <v-card-title class="text-center font-weight-black pb-10"
                >System Architecture Overview</v-card-title
              >
              <v-card-text>
                <v-btn
                  elevation="10"
                  color="deep-purple-lighten-4"
                  block
                  @click="showPdf('/pdfs/System-architecture_overview.pdf')"
                  >Open PDF</v-btn
                >
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Video and PDF Modal -->
      <v-dialog v-model="dialog" max-width="800px">
        <v-card color="deep-purple-darken-3">
          <v-card-title>
            <span class="headline">{{ dialogTitle }}</span>
          </v-card-title>
          <v-card-text>
            <iframe
              v-if="isVideo"
              width="100%"
              height="315"
              :src="dialogContent"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <embed v-else :src="dialogContent" type="application/pdf" width="100%" height="500px" />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- This will push the button to the center -->
            <v-btn color="deep-purple-lighten-4" @click="dialog = false">Close</v-btn>
            <v-spacer></v-spacer>
            <!-- Another spacer to balance the button -->
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false) // Drawer state for mobile
const dialog = ref(false) // Dialog state for video/pdf modal
const dialogContent = ref('') // Content for the dialog
const dialogTitle = ref('') // Title for the dialog
const isVideo = ref(false) // Flag to check if the content is a video

function showVideo(url) {
  dialogContent.value = url
  dialogTitle.value = ''
  isVideo.value = true
  dialog.value = true
}

function showPdf(url) {
  if (window.innerWidth <= 600) {
    // Mobile screen
    window.open(url, '_blank') // Open PDF in a new tab
  } else {
    dialogContent.value = url
    dialogTitle.value = ''
    isVideo.value = false
    dialog.value = true
  }
}
</script>
<script>
export default {
  data: () => ({
    loaded: false,
    loading: false
  }),

  methods: {
    onClick() {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    }
  }
}
</script>
<style scoped>
.background-color {
  background-color: #17153b; /* Your desired background color */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mobile-nav-drawer {
  backdrop-filter: blur(15px);
}
.v-card {
  border-radius: 12px; /* Round corners */
}
</style>
