<template>
    <div class="projects-page p-6">
      <div class="header flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold">Projects</h1>
        <button @click="addNewProject" class="add-button px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
          Add New Project
        </button>
      </div>
      <div class="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="project in projects" :key="project._id" class="project-card p-4 bg-white rounded shadow flex flex-col justify-between">
          <div>
            <h2 class="text-xl font-semibold mb-2">{{ project.title }}</h2>
            <p class="text-gray-700 mb-4">{{ project.description }}</p>
          </div>
          <div>
            <router-link :to="`/projects/${project._id}`" class="view-button px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
              View Project
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, computed } from 'vue';
  import { useProjectsStore } from '@/stores/projects';
  import { useRouter } from 'vue-router';
  
  const projectsStore = useProjectsStore();
  const router = useRouter();
  
  const addNewProject = () => {
    router.push({ name: 'addProject' });
  };
  
  const projects = computed(() => projectsStore.projects);
  onMounted(async () => {
    await projectsStore.fetchProjects();
  });
  </script>
  
  <style scoped>
  .projects-page {
    background-color: #f9fafb;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .add-button {
    background-color: #1d4ed8;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .add-button:hover {
    background-color: #2563eb;
  }
  
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1.5rem;
  }
  
  .project-card {
    background-color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 200px; /* Fixed height for the cards */
  }
  
  .project-card h2 {
    margin-bottom: 0.5rem;
  }
  
  .project-card p {
    color: #4b5563;
    margin-bottom: 1rem; /* Ensure some space between text and button */
  }
  
  .view-button {
    background-color: #1d4ed8;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    text-align: center;
    display: block;
    transition: background-color 0.3s;
  }
  
  .view-button:hover {
    background-color: #2563eb;
  }
  </style>
  