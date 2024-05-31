<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>
    <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full p-6">
      <h2 class="text-2xl font-semibold mb-4">{{ task?.title }}</h2>
      <p class="mb-4">{{ task?.content }}</p>
      <p class="mb-4"><strong>Status:</strong> {{ task?.status }}</p>
      <p class="mb-4"><strong>Tags:</strong> {{ task?.tags}}</p>
      <div class="modal-footer mt-4 text-right">
        <button @click="closeModal" class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { ITask } from '../../types/Task';

const props = defineProps<{ show: boolean, task: ITask | null }>();
const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
