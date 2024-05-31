<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>
    <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full p-6">
      <h2 class="text-2xl font-semibold mb-4">Add New Task</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="title">Title</label>
          <input v-model="title" class="w-full p-2 border border-gray-300 rounded" type="text" id="title" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="content">Description</label>
          <textarea v-model="content" class="w-full p-2 border border-gray-300 rounded" id="content" required></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="status">Status</label>
          <select v-model="status" class="w-full p-2 border border-gray-300 rounded" id="status" required>
            <option value="Backlog">Backlog</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="tags">Tags (comma-separated)</label>
          <input v-model="tags" class="w-full p-2 border border-gray-300 rounded" type="text" id="tags" />
        </div>
        <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500" type="submit">Create Task</button>
      </form>
      <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>
      <div class="modal-footer mt-4 text-right">
        <button @click="closeModal" class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTasksStore } from '../../stores/tasks'
import { useRouter } from 'vue-router'
import { defineProps, defineEmits } from 'vue';

const tasksStore = useTasksStore()
const router = useRouter()

const title = ref('')
const content = ref('')
const status = ref('')
const tags = ref('')
const error = ref('')

const props = defineProps({
  show: Boolean
});

const emit = defineEmits(['close']);

const submitForm = async () => {
  const taskData = {
    title: title.value,
    content: content.value,
    status: status.value,
    tags: tags.value.split(',').map(tag => tag.trim())
  }
  try {
    await tasksStore.createTask(taskData)
    router.push({ name: 'TasksPage' }) // Assuming you have a TasksPage route
    closeModal()
  } catch (err) {
    error.value = 'Failed to create task'
    console.error('Failed to create task:', err)
  }
}

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
