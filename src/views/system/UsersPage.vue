<template>
  <v-app class="animated-background description">
    <AdminNav @triggerLogoutModal="openLogoutModal" />

    <!-- Main content area -->
    <v-main>
      <v-container fluid>
        <v-row class="mt-5 justify-center">
          <v-col cols="12" class="text-center">
            <h1 class="text-white font-weight-black description">
              <v-icon large class="mr-1 mb-2">mdi-account-group</v-icon>Users Requests
            </h1>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card
              class="mb-2 description text-center"
              color="#803D3B"
              elevation="15"
              rounded="lg"
              height="auto"
            >
              <v-card
                class="ma-2 mx-4 mt-4 description text-center"
                color="#FAEED1"
                elevation="10"
                rounded="lg"
              >
                <v-card-title
                  ><v-icon class="mr-2"> mdi-book-open-page-variant </v-icon> Requested
                  Courses</v-card-title
                >
              </v-card>

              <v-card-text>
                <v-row>
                  <v-col
                    v-for="request in courseRequests"
                    :key="request.id"
                    cols="12"
                    md="6"
                    lg="4"
                  >
                    <v-card class="mb-1" color="#FAEED1" elevation="10" rounded="lg">
                      <v-card class="mb-2 mx-3 mt-3" color="#803d3b" elevation="10" rounded="lg">
                        <v-card-title>{{ request.course_name }}</v-card-title>
                        <v-card-subtitle>{{ request.program }}</v-card-subtitle>
                        <v-card-text
                          ><p>{{ request.description }}</p></v-card-text
                        >
                      </v-card>
                      <v-card-text>
                        <p>{{ new Date(request.created_at).toLocaleString() }}</p>
                        <p>{{ request.status }}</p>
                      </v-card-text>
                      <v-card-actions>
                        <v-row class="d-flex justify-space-between mx-3 mb-2">
                          <v-btn
                            color="white"
                            style="background-color: #dd660d"
                            @click="updateStatus(request.id, 'approved')"
                            >Approve</v-btn
                          >
                          <v-btn
                            color="white"
                            style="background-color: #803d3b"
                            @click="updateStatus(request.id, 'rejected')"
                            >Reject</v-btn
                          >
                        </v-row>
                      </v-card-actions>
                      <div
                        class="remove-button-box position-absolute"
                        style="
                          top: -10px;
                          right: -10px;
                          background-color: #faeed1;
                          border-radius: 50%;
                          padding: 5px;
                        "
                      >
                        <v-btn
                          icon
                          style="background: none; color: #803d3b"
                          @click="deleteRequest(request.id)"
                        >
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-card
              class="mb-2 description"
              color="#803D3B"
              elevation="15"
              rounded="lg"
              height="auto"
            >
              <v-card
                class="ma-2 mx-4 mt-4 description text-center"
                color="#FAEED1"
                elevation="10"
                rounded="lg"
              >
                <v-card-title>
                  <v-icon class="mr-2"> mdi-lightbulb-on </v-icon>Requested Topics</v-card-title
                >
              </v-card>

              <v-card-text>
                <v-row>
                  <v-col v-for="request in topicRequests" :key="request.id" cols="12" md="6" lg="4">
                    <v-card class="mb-1 text-center" color="#FAEED1" elevation="10" rounded="lg">
                      <v-card class="mb-2 mx-3 mt-3" color="#803d3b" elevation="10" rounded="lg">
                        <v-card-title>{{ request.topic_name }}</v-card-title>
                        <v-card-text>
                          <p>{{ request.description }}</p>
                        </v-card-text>
                      </v-card>
                      <v-card-text>
                        <p>{{ new Date(request.created_at).toLocaleString() }}</p>
                        <p>{{ request.status }}</p>
                      </v-card-text>
                      <v-card-actions>
                        <v-row class="d-flex justify-space-between mx-3 mb-2">
                          <v-btn
                            color="white"
                            style="background-color: #dd660d"
                            @click="updateTopicStatus(request.id, 'approved')"
                            >Approve</v-btn
                          >
                          <v-btn
                            color="white"
                            style="background-color: #803d3b"
                            @click="updateTopicStatus(request.id, 'rejected')"
                            >Reject</v-btn
                          >
                        </v-row>
                      </v-card-actions>
                      <div
                        class="remove-button-box position-absolute"
                        style="
                          top: -10px;
                          right: -10px;
                          background-color: #faeed1;
                          border-radius: 50%;
                          padding: 5px;
                        "
                      >
                        <v-btn
                          icon
                          style="background: none; color: #803d3b"
                          @click="deleteTopic(request.id)"
                        >
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <LogoutModal ref="logoutModalRef" />
    </v-main>
  </v-app>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import LogoutModal from '@/components/auth/LogoutModal.vue'
import AdminNav from '@/components/layout/AdminNav.vue'

const logoutModalRef = ref(null)
const openLogoutModal = () => {
  logoutModalRef.value.open()
}

const courseRequests = ref([])
const topicRequests = ref([])

// Fetch course requests from Supabase
async function fetchCourseRequests() {
  try {
    const { data, error } = await supabase
      .from('request_course')
      .select('id, course_name, description, program, created_at, status')

    if (error) throw error

    courseRequests.value = data
    console.log('Fetched course requests:', courseRequests.value)
  } catch (error) {
    console.error('Error fetching course requests:', error.message)
  }
}

// Fetch topic requests from Supabase
async function fetchTopicRequests() {
  try {
    const { data, error } = await supabase
      .from('request_topic')
      .select('id, topic_name, description, created_at, status')

    if (error) throw error

    topicRequests.value = data
    console.log('Fetched topic requests:', topicRequests.value)
  } catch (error) {
    console.error('Error fetching topic requests:', error.message)
  }
}

// Update the status of a course request
async function updateStatus(requestId, newStatus) {
  try {
    const { error } = await supabase
      .from('request_course')
      .update({ status: newStatus })
      .eq('id', requestId)

    if (error) throw error

    console.log(`Updated course request ${requestId} to status ${newStatus}`)
    // Refetch the course requests to update the UI
    await fetchCourseRequests()
  } catch (error) {
    console.error('Error updating request status:', error.message)
  }
}

// Update the status of a topic request
async function updateTopicStatus(requestId, newStatus) {
  try {
    const { error } = await supabase
      .from('request_topic')
      .update({ status: newStatus })
      .eq('id', requestId)

    if (error) throw error

    console.log(`Updated topic request ${requestId} to status ${newStatus}`)
    // Refetch the topic requests to update the UI
    await fetchTopicRequests()
  } catch (error) {
    console.error('Error updating topic request status:', error.message)
  }
}

async function deleteRequest(id) {
  const { error } = await supabase.from('request_course').delete().match({ id })

  if (error) {
    console.error('Error deleting request:', error.message)
    return
  }

  // Fetch the updated requests after deletion
  fetchCourseRequests()
}

// Delete a topic request
async function deleteTopic(id) {
  const { error } = await supabase.from('request_topic').delete().match({ id })

  if (error) {
    console.error('Error deleting topic request:', error.message)
    return
  }

  // Fetch the updated topic requests after deletion
  fetchTopicRequests()
}

// Fetch requests when the component mounts
onMounted(() => {
  fetchCourseRequests()
  fetchTopicRequests() // Call the function to fetch topic requests
})
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

.dialog-with-blur {
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
