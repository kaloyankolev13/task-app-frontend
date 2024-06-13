<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-xs">
      <!-- <ReloadButton v-if="user.message" /> -->
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text" name="username" id="username" v-model="user.username" placeholder="Username">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email" name="email" id="email" v-model="user.email" placeholder="Email">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            class="shadow appearance-none border focus:border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password" name="password" v-model="user.password" id="password" placeholder="Password">
        </div>
        <div class="flex  items-center justify-between">
          <button class="btn-dark" type='button' @click='registerUser(user)'>
            Register
          </button>
          </div>
        <p>Or if you have account <RouterLink class='text-indigo-600' to='/login'>Log In</RouterLink></p>
      </form>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import type { IUser } from '@/types/User';
// import ReloadButton from '@/components/ReloadButton.vue';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const registerUser = async (user: IUser) => {
  await userStore.register(user);
}
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}
</style>
