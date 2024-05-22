<template>
  <div class="flex">
    <SideNav />
    <main class="flex-1 ml-64 p-4">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import SideNav from './components/SideNavigation.vue';
</script>

<style>
/* Add any global styles if needed */
</style>
