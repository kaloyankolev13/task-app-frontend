<template>
  <div class="modal" v-if="show">
    <div class="modal-overlay" @click="closeModal"></div>
    <div class="modal-content">
      <h2>{{ task?.title }}</h2>
      <p>{{ task?.content }}</p>
      <p>Due on: {{ task?.status }}</p>
      <p>Created by: {{ task?.tags }}</p>
      <div class="modal-footer">
        <button @click="closeModal" class="close-button">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { ITask } from '@/types/Task';


defineProps({
  show: Boolean,
  task: {
    type: Object as () => ITask | null,
    default: null
  }
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 5px;
  z-index: 1001;
}

.modal-footer {
  margin-top: 20px;
  text-align: right;
}

.close-button {
  padding: 10px 20px;
  background-color: #1d4ed8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.close-button:hover {
  background-color: #2563eb;
}
</style>
