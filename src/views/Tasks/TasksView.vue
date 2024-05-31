<template>
  <div>
    <button @click="openCreateModal" class="add-button px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
      Add New Task
    </button>    
    <TasksComponent :tasks="tasks" @viewTask="viewTask" @deleteTask="deleteTask" />
    <CreateTaskModal :show="isCreateModalVisible" @close="closeCreateModal" @taskCreated="fetchTasks" />
    <TaskModal :show="isViewModalVisible" :task="selectedTask" @close="closeViewModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import TasksComponent from '@/components/Tasks/TasksComponent.vue';
import CreateTaskModal from '@/views/Tasks/CreateNewTask.vue'; // Make sure the import path is correct
import TaskModal from '@/views/Tasks/TaskModal.vue'; // Make sure the import path is correct
import { useTasksStore } from '@/stores/tasks';
import type { ITask } from '@/types/Task';

const tasksStore = useTasksStore();
const selectedTask = ref<ITask | null>(null);
const isCreateModalVisible = ref(false);
const isViewModalVisible = ref(false);

const openCreateModal = () => {
  selectedTask.value = null;
  isCreateModalVisible.value = true;
};

const viewTask = (task: ITask) => {
  selectedTask.value = task;
  isViewModalVisible.value = true;
};

const closeCreateModal = () => {
  isCreateModalVisible.value = false;
};

const closeViewModal = () => {
  isViewModalVisible.value = false;
  selectedTask.value = null;
};

const fetchTasks = async () => {
  await tasksStore.fetchTasks();
};

const deleteTask = async (taskId: string) => {
  await tasksStore.deleteTask(taskId);
  fetchTasks();
};

const tasks = computed(() => tasksStore.tasks);

onMounted(async () => {
  await fetchTasks();
});
</script>

<style scoped>
/* Add any additional styling here */
</style>
