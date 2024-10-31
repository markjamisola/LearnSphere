<template>
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
      <v-list-item class="text-center">
        <v-img max-width="50" src="/logo6.png" alt="Logo"></v-img>
      </v-list-item>

      <v-list-item-group>
        <v-list-item @click="$router.push('/adminhome')" class="text-center">
          <v-list-item-icon>
            <v-icon large :color="$route.path === '/adminhome' ? 'black' : 'white'"
              >mdi-home</v-icon
            >
          </v-list-item-icon>
        </v-list-item>

        <v-list-item @click="$router.push('/adminprofile')" class="text-center">
          <v-list-item-icon>
            <v-icon large :color="$route.path === '/adminprofile' ? 'black' : 'white'"
              >mdi-account</v-icon
            >
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>

      <v-list-item @click="$emit('triggerLogoutModal')" class="text-center">
        <v-list-item-icon>
          <v-icon large color="white">mdi-logout</v-icon>
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

        <v-list-item @click="$router.push('/adminhome')" class="text-center">
          <v-list-item-icon>
            <v-icon large :color="$route.path === '/adminhome' ? 'black' : 'white'"
              >mdi-home</v-icon
            >
          </v-list-item-icon>
        </v-list-item>

        <v-list-item @click="$router.push('/adminprofile')" class="text-center">
          <v-list-item-icon>
            <v-icon large :color="$route.path === '/adminprofile' ? 'black' : 'white'"
              >mdi-account</v-icon
            >
          </v-list-item-icon>
        </v-list-item>

        <v-list-item @click="$emit('triggerLogoutModal')" class="text-center">
          <v-list-item-icon>
            <v-icon large color="white">mdi-logout</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar v-if="$vuetify.display.smAndDown" app color="transparent" class="mobile-nav-drawer">
    <v-app-bar-nav-icon @click="drawer = !drawer" color="white"></v-app-bar-nav-icon>
    <v-toolbar-title class="text-white font-weight-black">LearnSphere</v-toolbar-title>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.mobile-nav-drawer {
  backdrop-filter: blur(15px);
}
</style>
