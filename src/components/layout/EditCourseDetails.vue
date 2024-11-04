<template>
  <v-dialog
    :model-value="isOpen"
    @update:model-value="closeModal"
    persistent
    max-width="500px"
    class="dialog-with-blur description"
  >
    <v-card class="mb-2 description" color="#803D3B" elevation="10" rounded="lg">
      <v-card-title class="headline text-center">
        <h3>Edit Course Details</h3>
      </v-card-title>
      <v-card class="ma-6 mt-2 description" color="#FAEED1" elevation="10" rounded="lg">
        <v-card-text>
          <v-text-field label="Course Name" v-model="courseName"></v-text-field>
          <v-textarea label="Description" v-model="courseDescription" rows="3"></v-textarea>
        </v-card-text>
      </v-card>
    </v-card>
    <div class="d-flex justify-end description">
      <v-row>
        <v-col cols="6">
          <v-btn rounded="lg" elevation="10" color="#dd660d" block @click="saveChanges">
            Save
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn rounded="lg" elevation="10" color="#FAEED1" block @click="closeModal">
            Cancel
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  courseDetails: Object
})

const emit = defineEmits(['close', 'save'])

const courseName = ref('')
const courseDescription = ref('')

// Watch for changes in courseDetails prop
watch(
  () => props.courseDetails,
  (newValue) => {
    if (newValue) {
      courseName.value = newValue.course_name || ''
      courseDescription.value = newValue.description || ''
    }
  }
)

// Close the modal
const closeModal = () => {
  emit('close')
}

// Save changes and emit updated details
const saveChanges = () => {
  emit('save', {
    course_name: courseName.value,
    description: courseDescription.value
  })
  closeModal()
}
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/unbounded');
.description {
  font-family: 'Unbounded', sans-serif;
}

</style>
