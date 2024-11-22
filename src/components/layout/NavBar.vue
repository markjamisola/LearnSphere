<template>
  <v-navigation-drawer
    v-if="$vuetify.display.mdAndUp"
    fixed
    clipped
    color="transparent"
    class="description"
    width="80"
    app
  >
    <v-list class="d-flex flex-column justify-space-between fill-height">
      <!-- Logo at the Top -->
      <v-list-item class="text-center">
        <v-img max-width="50" src="/logonew.png" alt="Logo"></v-img>
      </v-list-item>

      <v-list-item-group>
        <!-- Home -->
        <v-list-item class="text-center" @click="$router.push('/home')">
          <v-tooltip color="#FAEED1" location="right">
            <template v-slot:activator="{ props }">
              <div v-bind="props">
                <v-list-item-icon>
                  <v-icon large :color="$route.path === '/home' ? 'black' : 'white'"
                    >mdi-home</v-icon
                  >
                </v-list-item-icon>
              </div>
            </template>
            <h5 class="custom-tooltip description">Home</h5>
          </v-tooltip>
        </v-list-item>

        <!-- Profile -->
        <v-list-item class="text-center" @click="$router.push('/profile')">
          <v-tooltip location="right" style="width: 0px">
            <template v-slot:activator="{ props }">
              <div v-bind="props">
                <v-list-item-icon>
                  <v-icon large :color="$route.path === '/profile' ? 'black' : 'white'"
                    >mdi-account</v-icon
                  >
                </v-list-item-icon>
              </div>
            </template>
            <h5 class="custom-tooltip description">Profile</h5>
          </v-tooltip>
        </v-list-item>

        <!-- Starred -->
        <v-list-item class="text-center" @click="$router.push('/starred')">
          <v-tooltip location="right" style="width: 0px">
            <template v-slot:activator="{ props }">
              <div v-bind="props">
                <v-list-item-icon>
                  <v-icon large :color="$route.path === '/starred' ? 'black' : 'white'"
                    >mdi-star</v-icon
                  >
                </v-list-item-icon>
              </div>
            </template>
            <h5 class="custom-tooltip description">Starred</h5>
          </v-tooltip>
        </v-list-item>

        <!-- History -->
        <v-list-item class="text-center" @click="$router.push('/history')">
          <v-tooltip location="right" style="width: 0px">
            <template v-slot:activator="{ props }">
              <div v-bind="props">
                <v-list-item-icon>
                  <v-icon large :color="$route.path === '/history' ? 'black' : 'white'"
                    >mdi-history</v-icon
                  >
                </v-list-item-icon>
              </div>
            </template>
            <h5 class="custom-tooltip description">History</h5>
          </v-tooltip>
        </v-list-item>

        <!-- About -->
        <v-list-item class="text-center" @click="$router.push('/about')">
          <v-tooltip location="right" style="width: 0px">
            <template v-slot:activator="{ props }">
              <div v-bind="props">
                <v-list-item-icon>
                  <v-icon large :color="$route.path === '/about' ? 'black' : 'white'"
                    >mdi-information</v-icon
                  >
                </v-list-item-icon>
              </div>
            </template>
            <h5 class="custom-tooltip description">About</h5>
          </v-tooltip>
        </v-list-item>
      </v-list-item-group>

      <!-- Logout -->
      <v-list-item class="text-center" @click="$emit('triggerLogoutModal')">
        <v-tooltip location="right" style="width: 0px">
          <template v-slot:activator="{ props }">
            <div v-bind="props">
              <v-list-item-icon>
                <v-icon large color="white">mdi-logout</v-icon>
              </v-list-item-icon>
            </div>
          </template>
          <h5 class="custom-tooltip description">Logout</h5>
        </v-tooltip>
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
      :to="{ name: 'home' }"
      :class="{ active: $route.path === '/home' }"
      @click="activeTab = 'home'"
      class="nav-btn"
    >
      <v-icon small>mdi-home</v-icon>
      <span>Home</span>
    </v-btn>

    <!-- Profile Button -->
    <v-btn
      :to="{ name: 'profile' }"
      :class="{ active: $route.path === '/profile' }"
      @click="activeTab = 'profile'"
      class="nav-btn"
    >
      <v-icon small>mdi-account</v-icon>
      <span>Profile</span>
    </v-btn>

    <!-- Starred Button -->
    <v-btn
      :to="{ name: 'starred' }"
      :class="{ active: $route.path === '/starred' }"
      @click="activeTab = 'starred'"
      class="nav-btn"
    >
      <v-icon small>mdi-star</v-icon>
      <span>Starred</span>
    </v-btn>

    <!-- History Button -->
    <v-btn
      :to="{ name: 'history' }"
      :class="{ active: $route.path === '/history' }"
      @click="activeTab = 'history'"
      class="nav-btn"
    >
      <v-icon small>mdi-history</v-icon>
      <span>History</span>
    </v-btn>

    <!-- About Button -->
    <v-btn
      :to="{ name: 'about' }"
      :class="{ active: $route.path === '/about' }"
      @click="activeTab = 'about'"
      class="nav-btn"
    >
      <v-icon small>mdi-information</v-icon>
      <span>About</span>
    </v-btn>
  </v-bottom-navigation>
</div>


</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('home') // Default active tab
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/unbounded');

.fill-height {
  height: 100vh;
}

.mobile-nav-drawer {
  backdrop-filter: blur(15px);
}

.v-tooltip {
  max-width: 0; /* Adjust as necessary */
}

.custom-tooltip {
  background-color: #faeed1 !important; /* Custom background color */
  color: #803d3b; /* Custom text color */
  padding: 5px;
  margin: 0;
  padding-left: 10px;
  padding-right: 10px;
}

.description {
  font-family: 'Unbounded', sans-serif;
}


/* Active tab styling */
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
