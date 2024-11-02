<template>
  <v-dialog
    :model-value="isOpen"
    @update:model-value="closeModal"
    persistent
    max-width="600px"
    class="dialog-with-blur description"
  >
    <v-card class="mb-2 description" color="#803D3B" elevation="10" rounded="lg">
      <v-card-title class="headline text-center"><h3>Request Course</h3></v-card-title>
      <v-card class="ma-6 mt-2 description" color="#FAEED1" elevation="10" rounded="lg">
        <v-card-text>
          <v-text-field
            prepend-inner-icon="mdi-book-open-page-variant"
            label="Course Name"
            v-model="newCourse.course_name"
          />
          <v-text-field
            prepend-inner-icon="mdi-text-box-edit-outline"
            label="Description"
            v-model="newCourse.description"
          />
          <v-text-field
            prepend-inner-icon="mdi-laptop"
            label="Program"
            v-model="newCourse.program"
          />
        </v-card-text>

        <v-card class="pa-3" color="#FAEED1">
          <h4 v-if="requestedCourses.length" class="text-center">Your Requested Courses</h4>
          <h5 v-if="!requestedCourses.length" class="text-center">No Requested Courses</h5>
          <v-card color="#803D3B">
            <v-list-item-group>
              <v-list-item v-for="course in requestedCourses" :key="course.id" class="ma-2">
                <v-list-item-content>
                  <v-list-item-title>Course Name: {{ course.course_name }}</v-list-item-title>
                  <v-list-item-subtitle>Description: {{ course.description }}</v-list-item-subtitle>
                  <v-list-item-subtitle>Program: {{ course.program }}</v-list-item-subtitle>
                  <v-list-item-subtitle>Status: {{ course.status }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-card>
        </v-card>
      </v-card>
    </v-card>
    <div class="d-flex justify-end description">
      <v-row>
        <v-col cols="6">
          <v-btn rounded="lg" elevation="10" color="#803D3B" block @click="addCourse">
            Request
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn rounded="lg" elevation="10" color="#FAEED1" block @click="closeModal">
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
            class="description"
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
import { ref, defineProps, defineEmits } from 'vue'

// Define props and emits
const { isOpen, requestedCourses } = defineProps({
  isOpen: Boolean,
  requestedCourses: Array // Accept the requested courses as a prop
})
const emit = defineEmits(['add-course', 'close'])

// State for the new course
const newCourse = ref({
  course_name: '',
  program: '',
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

// Add the new course and emit the event
const addCourse = () => {
  if (!newCourse.value.course_name || !newCourse.value.program || !newCourse.value.description) {
    messageTitle.value = 'Input Required '
    messageText.value = 'Please fill in all fields before requesting a course.'
    showMessageModal.value = true
    return // Stop the function if validation fails
  }

  const courseDetails = {
    course_name: newCourse.value.course_name,
    program: newCourse.value.program,
    description: newCourse.value.description,
    status: 'pending' // Set initial status
  }

  emit('add-course', courseDetails)
  resetForm() // Reset form fields on successful request
  messageTitle.value = 'Request Successful'
  messageText.value = 'Your course request has been submitted.'
  showMessageModal.value = true
}

// Reset the form fields
const resetForm = () => {
  newCourse.value = {
    course_name: '',
    program: '',
    description: ''
  }
}
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/unbounded');
.description {
  font-family: 'Unbounded', sans-serif;
}
.dialog-with-blur {
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
