<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SideNavigation from './components/SideNavigation.vue'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>

      <SideNavigation>
      </SideNavigation>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
