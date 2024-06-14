<template>
    <div>
      <h1>Project</h1>
      <button @click="openCreateModal" class="add-button px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
        Add New Task
      </button>
      <ul role="list" class="divide-y divide-gray-100">
        <li
          v-for="task in tasks"
          :key="task._id"
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
  
      <CreateTaskModal :show="isCreateModalVisible" @close="closeCreateModal" @taskCreated="fetchTasks" />
      <TaskModal :show="isViewModalVisible" :task="selectedTask" @close="closeViewModal" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import CreateTaskModal from '@/views/Tasks/CreateNewTask.vue'; // Ensure the import path is correct
  import TaskModal from '@/views/Tasks/TaskModal.vue'; // Ensure the import path is correct
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
  
  const tasks = computed(() => tasksStore.tasks);
  
  onMounted(async () => {
    await fetchTasks();
  });
  </script>
  
  <style scoped>
  /* Add any additional styling here */
  </style>
  