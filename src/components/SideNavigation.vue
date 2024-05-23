<template>
  <aside v-if="isAuthenticated" class="w-64 h-screen bg-indigo-600 text-white fixed">
    <div class="p-4 text-lg font-semibold">
      Side Navigation
    </div>
    <nav class="mt-4">
      <ul>
        <li v-for="item in navItems" :key="item.name" class="p-2 hover:bg-gray-700">
          <div v-if="item.name === 'Projects'" class="relative">
            <button @click="toggleDropdown" class="w-full text-left">
              {{ selectedProjectTitle || item.name }}
            </button>
            <ul v-if="showDropdown" class="absolute left-0 w-full bg-gray-700 mt-2">
              <li v-for="project in projects" :key="project._id" class="p-2 hover:bg-gray-600">
                <RouterLink :to="`/projects/${project._id}`" @click="saveProjectId(project._id, project.title)">
                  {{ project.title }}
                </RouterLink>
              </li>
            </ul>
          </div>
          <div v-else>
            <RouterLink :to="item.link">{{ item.name }}</RouterLink>
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { useProjectsStore } from '../stores/projects';
import { useUserStore } from '../stores/user';

interface NavItem {
  name: string;
  link: string;
}

const navItems = ref<NavItem[]>([
  { name: 'Home', link: '/' },
  { name: 'Projects', link: '#' }, // link is placeholder, actual links are in the dropdown
  { name: 'Tasks', link: '/tasks' },
  { name: 'Contact', link: '/contact' },
]);

const showDropdown = ref(false);
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const projectsStore = useProjectsStore();
const projects = computed(() => projectsStore.projects);

const selectedProjectTitle = ref<string | null>(null);

const saveProjectId = (projectId: string, projectTitle: string) => {
  localStorage.setItem('selectedProjectId', projectId);
  localStorage.setItem('selectedProjectTitle', projectTitle);
  selectedProjectTitle.value = projectTitle;
};

const loadSelectedProjectTitle = () => {
  const savedProjectTitle = localStorage.getItem('selectedProjectTitle');
  if (savedProjectTitle) {
    selectedProjectTitle.value = savedProjectTitle;
  }
};

const userStore = useUserStore();
const isAuthenticated = computed(() => userStore.isAuthenticated);

const initialize = async () => {
  userStore.initializeAuth();
  if (isAuthenticated.value) {
    await projectsStore.fetchProjects();
    loadSelectedProjectTitle();
  }
};

watch(isAuthenticated, async (newVal) => {
  if (newVal) {
    await projectsStore.fetchProjects();
    loadSelectedProjectTitle();
  }
});

onMounted(async () => {
  await initialize();
});
</script>

<style scoped>
/* Add any additional styling here */
</style>
