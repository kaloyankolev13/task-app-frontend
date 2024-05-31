<template>
  <div class="flex min-w-0 flex-1 gap-x-4">
    <div class="min-w-0 flex-auto">
      <p class="text-sm font-semibold leading-6 text-gray-900">
        {{ task.title }}
      </p>
      <p class="mt-1 truncate text-xs leading-5 text-gray-500">
        Due on {{ task.content }}
      </p>
      <p class="mt-1 truncate text-xs leading-5 text-gray-500">
        Status {{ task.status }}
      </p>
    </div>
    <div
      :class="{
        'bg-green-100 text-green-800': task.status === 'Complete',
        'bg-yellow-100 text-yellow-800': task.status === 'In Progress',
        'bg-gray-100 text-gray-800': task.status === 'Archived',
      }"
      class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
    >
      {{ task.status }}
    </div>
    <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
      <button
        type="button"
        class="rounded-md bg-blue-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
        @click="handleViewTask"
      >
        View task
      </button>
      <button
        type="button"
        class="mt-2 rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
        @click="handleDeleteTask"
      >
        Delete task
      </button>
      <button
        type="button"
        class="mt-2 rounded-md bg-green-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
        @click="openCreateModal"
      >
        Add Task
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useTasksStore } from '../../stores/tasks';
import type { ITask } from '../../types/Task';

const props = defineProps<{ task: ITask }>();
const emit = defineEmits(['viewTask', 'deleteTask', 'openCreateModal']);
const tasksStore = useTasksStore();

const handleViewTask = () => {
  emit('viewTask', props.task);
};

const handleDeleteTask = async () => {
  await tasksStore.deleteTask(props.task._id);
  emit('deleteTask', props.task._id);
};

const openCreateModal = () => {
  emit('openCreateModal');
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
