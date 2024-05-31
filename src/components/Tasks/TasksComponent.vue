<template>
  <div class="flex space-x-4">
    <div class="w-1/4">
      <h3 class="text-xl font-semibold mb-2">Backlog</h3>
      <ul role="list" class="divide-y divide-gray-100">
        <li
          v-for="task in groupedTasks.Backlog"
          :key="task._id"
          class="flex justify-between gap-x-6 py-5"
        >
          <TaskItem :task="task" @viewTask="viewTask" />
        </li>
      </ul>
    </div>
    <div class="w-1/4">
      <h3 class="text-xl font-semibold mb-2">In Progress</h3>
      <ul role="list" class="divide-y divide-gray-100">
        <li
          v-for="task in groupedTasks['In Progress']"
          :key="task._id"
          class="flex justify-between gap-x-6 py-5"
        >
          <TaskItem :task="task" @viewTask="viewTask" />
        </li>
      </ul>
    </div>
    <div class="w-1/4">
      <h3 class="text-xl font-semibold mb-2">Complete</h3>
      <ul role="list" class="divide-y divide-gray-100">
        <li
          v-for="task in groupedTasks.Complete"
          :key="task._id"
          class="flex justify-between gap-x-6 py-5"
        >
          <TaskItem :task="task" @viewTask="viewTask" />
        </li>
      </ul>
    </div>
    <div class="w-1/4">
      <h3 class="text-xl font-semibold mb-2">Archived</h3>
      <ul role="list" class="divide-y divide-gray-100">
        <li
          v-for="task in groupedTasks.Archived"
          :key="task._id"
          class="flex justify-between gap-x-6 py-5"
        >
          <TaskItem :task="task" @viewTask="viewTask" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { defineProps, defineEmits } from 'vue';
import type { ITask } from '@/types/Task';
import TaskItem from './TaskItemComponent.vue'; // Import the TaskItem component

const props = defineProps<{ tasks: ITask[] }>();
const emit = defineEmits(['viewTask']);

const viewTask = (task: ITask) => {
  emit('viewTask', task);
};

const groupedTasks = computed(() => {
  return {
    Backlog: props.tasks.filter(task => task.status === 'Backlog'),
    'In Progress': props.tasks.filter(task => task.status === 'In Progress'),
    Complete: props.tasks.filter(task => task.status === 'Completed'),
    Archived: props.tasks.filter(task => task.status === 'Archived'),
  };
});
</script>

<style scoped>
/* Add any additional styling here */
</style>
