<template>
  <v-dialog
    :model-value="isOpen"
    @update:model-value="closeModal"
    persistent
    max-width="500px"
    class="dialog-with-blur description"
  >
    <v-card class="mb-2 description" color="#803D3B" elevation="10" rounded="lg">
      <v-card-title class="headline text-center"><h3>Edit Topic</h3></v-card-title>
      <v-card class="ma-6 mt-2 description" color="#FAEED1" elevation="10" rounded="lg">
        <v-card-text>
          <v-text-field
            prepend-inner-icon="mdi-lightbulb-on"
            label="Topic Title"
            v-model="localTopic.topic_title"
          ></v-text-field>
          <v-textarea
            prepend-inner-icon="mdi-text-box-edit-outline"
            label="Description"
            v-model="localTopic.description"
            rows="3"
          ></v-textarea>
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

  <v-dialog v-model="successModal" max-width="448" class="dialog-with-blur">
    <v-card class="mx-auto pa-3" elevation="15" rounded="lg" color="#FAEED1">
      <v-card-title>
        <h3 class="font-weight-black text-center description">Success</h3>
      </v-card-title>
      <v-card-text class="text-center text-black text-caption description">
        <h3>Information Successfully Updated!</h3>
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="description"
          color="#803d3b"
          size="large"
          variant="elevated"
          elevation="15"
          block
          @click="successModal = false"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  props: {
    isOpen: Boolean,
    topic: Object
  },
  emits: ['update:topic', 'close'],
  setup(props, { emit }) {
    const successModal = ref(false)
    const localTopic = ref({ ...props.topic })

    // Watch for changes in the prop and update local copy
    watch(
      () => props.topic,
      (newTopic) => {
        localTopic.value = { ...newTopic }
      },
      { deep: true }
    )

    // Close the modal
    const closeModal = () => {
      emit('close')
    }

    // Emit the updated topic to parent
    const saveChanges = () => {
      emit('update:topic', localTopic.value)
      successModal.value = true // Show success modal after saving
      closeModal()
    }

    return { localTopic, closeModal, saveChanges, successModal }
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
