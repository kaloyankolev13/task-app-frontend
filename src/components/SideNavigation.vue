<template>
  <aside class="w-64 h-screen bg-gray-800 text-white fixed">
    <div class="p-4 text-lg font-semibold">
      Side Navigation
    </div>
    <nav class="mt-4">
      <ul>
        <li v-for="item in navItems" :key="item.name" class="p-2 hover:bg-gray-700">
          <RouterLink :to="item.link">{{ item.name }}</RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

interface NavItem {
  name: string;
  link: string;
}

const navItems = ref<NavItem[]>([
  { name: 'Home', link: '/' },
  { name: 'Projects', link: '/projects' },
  { name: 'Tasks', link: '/tasks' },
  { name: 'Contact', link: '/contact' },
]);
</script>
