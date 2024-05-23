<template>
    <div class="create-project-form p-6">
      <h2 class="text-2xl font-semibold mb-4">Add New Project</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="title">Title</label>
          <input v-model="title" class="w-full p-2 border border-gray-300 rounded" type="text" id="title" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="description">Description</label>
          <textarea v-model="description" class="w-full p-2 border border-gray-300 rounded" id="description" required></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="tags">Tags (comma-separated)</label>
          <input v-model="tags" class="w-full p-2 border border-gray-300 rounded" type="text" id="tags" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="tasks">Tasks (comma-separated)</label>
          <input v-model="tasks" class="w-full p-2 border border-gray-300 rounded" type="text" id="tasks" />
        </div>
        <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500" type="submit">Create Project</button>
      </form>
      <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useProjectsStore } from '../../stores/projects'
  import { useRouter } from 'vue-router'
  
  const projectsStore = useProjectsStore()
  const router = useRouter()
  
  const title = ref('')
  const description = ref('')
  const tags = ref('')
  const tasks = ref('')
  const error = ref('')
  
  const submitForm = async () => {
    const projectData = {
      title: title.value,
      description: description.value,
      tags: tags.value.split(',').map(tag => tag.trim()),
      tasks: tasks.value.split(',').map(task => task.trim())
    }
    try {
      await projectsStore.createProject(projectData)
      router.push({ name: 'ProjectsPage' }) // Assuming you have a ProjectsPage route
    } catch (err) {
      error.value = 'Failed to create project'
      console.error('Failed to create project:', err)
    }
  }
  </script>
  
  <style scoped>
  /* Add any additional styling here */
  </style>
  