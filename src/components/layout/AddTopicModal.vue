<template>
  <v-dialog
    :model-value="isOpen"
    @update:model-value="closeModal"
    persistent
    max-width="500px"
    class="dialog-with-blur description"
  >
    <v-card class="mb-2 description" color="#803D3B" elevation="10" rounded="lg">
      <v-card-title class="headline text-center"><h3>Add Topic</h3></v-card-title>
      <v-card class="ma-6 mt-2 description" color="#FAEED1" elevation="10" rounded="lg">
        <v-card-text>
          <v-text-field
            prepend-inner-icon="mdi-lightbulb-on"
            label="Topic Title"
            v-model="newTopic.topic_title"
          ></v-text-field>
          <v-textarea
            prepend-inner-icon="mdi-text-box-edit-outline"
            label="Description"
            v-model="newTopic.description"
            rows="3"
          ></v-textarea>
        </v-card-text>
      </v-card>
    </v-card>
    <div class="d-flex justify-end description">
      <v-row>
        <v-col cols="6">
          <v-btn rounded="lg" elevation="10" color="#dd660d" block @click="addTopic"> Add </v-btn>
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

<script>
import { ref } from 'vue'

export default {
  props: {
    isOpen: Boolean
  },
  emits: ['add-topic', 'close'],
  setup(props, { emit }) {
    // State for the new topic
    const newTopic = ref({
      topic_title: '',
      description: ''
    })

    // Close the modal
    const closeModal = () => {
      emit('close')
      resetForm()
    }

    // Add the new topic and emit the event
    const addTopic = () => {
      emit('add-topic', newTopic.value)
      closeModal()
    }

    // Reset the form fields
    const resetForm = () => {
      newTopic.value = {
        topic_title: '',
        description: ''
      }
    }

    return { newTopic, closeModal, addTopic }
  }
}
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/unbounded');
.description {
  font-family: 'Unbounded', sans-serif;
}

</style>
