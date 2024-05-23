<template>
  <ul role="list" class="divide-y divide-gray-100">
    <li
      v-for="task in tasks"
      :key="task.id"
      class="flex justify-between gap-x-6 py-5"
    >
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
            'bg-yellow-100 text-yellow-800': task.status === 'In progress',
            'bg-gray-100 text-gray-800': task.status === 'Archived',
          }"
          class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
        >
          {{ task.status }}
        </div>
      </div>
      <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <button
          type="button"
          class="rounded-md bg-blue-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          @click="viewTask(task)"
        >
          View task
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { ITask } from '@/types/Task';

const props = defineProps<{ tasks: ITask[] }>();

const emit = defineEmits(['viewTask']);

const viewTask = (task: ITask) => {
  emit('viewTask', task);
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
