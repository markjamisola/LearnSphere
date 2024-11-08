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

  <v-navigation-drawer
    v-if="$vuetify.display.smAndDown"
    v-model="drawer"
    temporary
    app
    fixed
    clipped
    color="transparent"
    class="mobile-nav-drawer"
    width="80"
  >
    <v-list class="d-flex flex-column justify-space-between fill-height">
      <!-- Top Section with Logo -->
      <v-list-item class="text-center">
        <v-img max-width="50" src="/logonew.png" alt="Logo"></v-img>
      </v-list-item>

      <!-- Center Section with Navigation Icons -->
      <v-list-item-group>
        <v-spacer></v-spacer>
        <!-- Spacer to push items down to center -->

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

        <v-list-item @click="$router.push('/starred')" class="text-center">
          <v-list-item-icon>
            <v-icon large :color="$route.path === '/starred' ? 'black' : 'white'">mdi-star</v-icon>
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

        <v-spacer></v-spacer>
      </v-list-item-group>

      <!-- Bottom Section with Logout Icon -->
      <v-list-item @click="$emit('triggerLogoutModal')" class="text-center">
        <v-list-item-icon>
          <v-icon large color="white">mdi-logout</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar
    v-if="$vuetify.display.smAndDown"
    app
    color="transparent"
    class="topname mobile-nav-drawer"
  >
    <v-app-bar-nav-icon
      class="topname pl-6"
      @click="drawer = !drawer"
      color="white"
    ></v-app-bar-nav-icon>
    <v-toolbar-title class="text-white font-weight-black ml-8">LearnSphere</v-toolbar-title>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
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

</style>
