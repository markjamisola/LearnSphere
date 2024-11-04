<template>
  <v-dialog
    :model-value="isOpen"
    @update:model-value="closeModal"
    persistent
    max-width="600px"
    class="dialog-with-blur description"
  >
    <v-card class="mb-2 description" color="#803D3B" elevation="10" rounded="lg">
      <v-card-title class="headline text-center"><h3>Request Topic</h3></v-card-title>
      <v-card class="ma-6 mt-2 description" color="#FAEED1" elevation="10" rounded="lg">
        <v-card-text>
          <v-text-field
            prepend-inner-icon="mdi-book-open-page-variant"
            label="Topic Name"
            v-model="newTopic.topic_name"
          />
          <v-text-field
            prepend-inner-icon="mdi-text-box-edit-outline"
            label="Description"
            v-model="newTopic.description"
          />
        </v-card-text>

        <v-card class="pa-3" color="#FAEED1">
          <h4 v-if="requestedTopics.length" class="text-center">Your Requested Topics</h4>
          <h4 v-if="!requestedTopics.length" class="text-center">You have NO Requested Topics</h4>
          <v-card color="#803D3B">
            <v-card color="#FAEED1" class="mx-3 ma-3">
              <div
                v-for="topic in requestedTopics"
                :key="topic.id"
                class="ma-2 d-flex align-center justify-between"
              >
                <div style="flex-grow: 1">
                  <h4>{{ topic.topic_name }}</h4>
                  <h6>{{ topic.description }}</h6>
                  <h6>{{ topic.status }}</h6>
                </div>

                <div class="remove-button-box" style="margin-left: 16px">
                  <v-btn
                    icon
                    style="background-color: #803d3b; color: #FAEED1"
                    @click="$emit('delete-topic', topic.id)"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-card>
        </v-card>
      </v-card>
    </v-card>

    <div class="d-flex justify-end description">
      <v-row>
        <v-col cols="6">
          <v-btn rounded="lg" class="hover-zoom" elevation="10" color="#FAEED1" block @click="addTopic">
            Request
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn rounded="lg" class="hover-zoom" elevation="10" color="#FAEED1" block @click="closeModal">
            Cancel
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <!-- Success/Error Notification Modal -->
    <v-dialog v-model="showMessageModal" max-width="448" class="dialog-with-blur">
      <v-card class="mx-auto pa-3" elevation="15" rounded="lg" color="#FAEED1">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-black text-center description">{{ messageTitle }}</h3>
        </v-card-title>

        <v-card-text class="text-center text-black text-caption description">
          <h3>{{ messageText }}</h3>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="description hover-zoom"
            color="#803d3b"
            size="large"
            variant="elevated"
            elevation="15"
            block
            @click="closeMessageModal"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script setup>
import { ref} from 'vue'

// Define props and emits
const { isOpen, requestedTopics } = defineProps({
  isOpen: Boolean,
  requestedTopics: Array // Accept the requested topics as a prop
})
const emit = defineEmits(['add-topic', 'close', 'delete-topic']) // Added 'delete-topic' emit

// State for the new topic
const newTopic = ref({
  topic_name: '',
  description: ''
})

// State for message modal
const showMessageModal = ref(false)
const messageTitle = ref('')
const messageText = ref('')

// Close the modal
const closeModal = () => {
  emit('close')
  resetForm()
}

// Close the message modal
const closeMessageModal = () => {
  showMessageModal.value = false
}

// Add the new topic and emit the event
const addTopic = () => {
  if (!newTopic.value.topic_name || !newTopic.value.description) {
    messageTitle.value = 'Input Required '
    messageText.value = 'Please fill in all fields before requesting a topic.'
    showMessageModal.value = true
    return // Stop the function if validation fails
  }

  const topicDetails = {
    topic_name: newTopic.value.topic_name,
    description: newTopic.value.description,
    status: 'pending' // Set initial status
  }

  emit('add-topic', topicDetails)
  resetForm() // Reset form fields on successful request
  messageTitle.value = 'Request Successful'
  messageText.value = 'Your topic request has been submitted.'
  showMessageModal.value = true
}

// Reset the form fields
const resetForm = () => {
  newTopic.value = {
    topic_name: '',
    description: ''
  }
}
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/unbounded');
.description {
  font-family: 'Unbounded', sans-serif;
}

.hover-zoom {
  transition: transform 0.3s ease; /* Smooth transition */
}

.hover-zoom:hover {
  transform: scale(1.05); /* Scale up on hover */
}
</style>
