<template>
    <div class="flex">
      <aside class="w-64 h-screen bg-gray-800 text-white">
        <div class="p-4 text-lg font-semibold">
        </div>
        <nav class="mt-4">
          <ul>
            <li v-for="item in navItems" :key="item.name" class="p-2 hover:bg-gray-700">
              <a :href="item.link">{{ item.name }}</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main class="flex-1 p-4">
        <slot></slot>
      </main>
    </div>
  </template>

  <script lang="ts" setup>
  import { ref } from 'vue';
  interface NavItem {
    name: string;
    link: string;
  }
  const navItems = ref<NavItem[]>([
    { name: 'Home', link: '/' },
    { name: 'Tasks', link: '/about' },
    { name: 'Projects', link: '#' },
    { name: 'Contact', link: '#' },
  ]);
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
  