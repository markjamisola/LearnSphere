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
        <v-img max-width="50" src="/logonew.png" alt="Logo"></v-img>
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
        <v-list-item @click="$router.push('/users')" class="text-center">
          <v-list-item-icon>
            <v-icon large :color="$route.path === '/users' ? 'black' : 'white'"
              >mdi-account-group</v-icon
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


  <div>
  <!-- App Bar -->
  <v-app-bar
    v-if="$vuetify.display.mdAndDown"
    app
    color="transparent"
    class="topname mobile-nav-drawer"
    style="backdrop-filter: blur(15px); background-color: rgba(255, 255, 255, 0.5);"
  >
  <v-img class="ml-2" max-width="50" src="/logonew.png" alt="Logo"></v-img>
    <v-toolbar-title class=" description text-white font-weight-black ml-4">LearnSphere</v-toolbar-title>

    <!-- Logout Button -->
    <v-btn
      icon
      @click="$emit('triggerLogoutModal')"
      class="logout-btn"
    >
      <v-icon color="white">mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- Bottom Navigation -->
  <v-bottom-navigation
    v-if="$vuetify.display.mdAndDown"
    v-model="activeTab"
    app
    class="bottom-nav"
    grow
    color="transparent"
    mode="shift"

  >
    <!-- Home Button -->
    <v-btn
      :to="{ name: 'adminhome' }"
      :class="{ active: $route.path === '/adminhome' }"
      @click="activeTab = 'adminhome'"
      class="nav-btn"
    >
      <v-icon small>mdi-home</v-icon>
      <span>Home</span>
    </v-btn>

    <!-- Profile Button -->
    <v-btn
      :to="{ name: 'adminprofile' }"
      :class="{ active: $route.path === '/adminprofile' }"
      @click="activeTab = 'adminprofile'"
      class="nav-btn"
    >
      <v-icon small>mdi-account</v-icon>
      <span>Profile</span>
    </v-btn>

    <!-- Starred Button -->
    <v-btn
      :to="{ name: 'users' }"
      :class="{ active: $route.path === '/users' }"
      @click="activeTab = 'users'"
      class="nav-btn"
    >
      <v-icon small>mdi-account-group</v-icon>
      <span>Users</span>
    </v-btn>

  </v-bottom-navigation>
</div>

</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('home') // Default active tab
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.mobile-nav-drawer {
  backdrop-filter: blur(15px);
}
.active {
  color: #ffffff !important;
  background-color: #803d3b !important;
  border-radius: 10px;
}



.nav-btn {
  min-width: 30px; /* Ensure all buttons are small enough to fit */
  height: 48px; /* Adjust button height */
  padding: 0; /* Remove extra padding */
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom-nav{
  backdrop-filter: blur(15px);
  background-color: transparent;
}
</style>
