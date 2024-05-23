<template>
  <div>
    <TasksComponent :tasks="tasks" @viewTask="openModal" />
    <TaskModal :show="isModalVisible" :task="selectedTask" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import TasksComponent from '@/components/Tasks/TasksComponent.vue';
import TaskModal from '@/views/Tasks/CreateNewTask.vue'; // Make sure the import path is correct
import { useTasksStore } from '@/stores/tasks';
import type { ITask } from '@/types/Task';


const tasksStore = useTasksStore();

const selectedTask = ref<ITask | null>(null);
const isModalVisible = ref(false);

const openModal = (task: ITask) => {
  selectedTask.value = task;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
  selectedTask.value = null;
};

const tasks = computed(() => tasksStore.tasks);

onMounted(async () => {
  await tasksStore.fetchTasks();
});
</script>

<style scoped>
/* Add any additional styling here */
</style>
