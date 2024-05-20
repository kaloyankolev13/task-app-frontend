<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable max-len -->
<template>
  <div class="w-full m-auto my-36 max-w-xs">
    <div v-if='user.message'>
      <h1>{{ user.message }}</h1>
      <ReloadButton />
    </div>
    <div v-else>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            username
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text" name="username" id="username" v-model="user.username" placeholder="Username">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            password
          </label>
          <input
            class="shadow appearance-none border  focus:border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password" name="password" v-model="user.password" id="password" placeholder="password">
        </div>
        <div class="flex items-center justify-between">
          <button class="btn-dark" type='button' @click='sendAdmin(user)'>
            Log In
          </button>
        </div>
      </form>
    </div>
  </div>

</template>

<script setup lang='ts'>
// import logIn from '../../api/user';
import { useUserStore } from '../../stores/user';
import { storeToRefs } from 'pinia'
import type { IUser } from '@/types/User';
// import ReloadButton from '../../components/ReloadButton.vue';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const sendAdmin = async (user: IUser) => {
  await userStore.login(user);
}



// const { user, sendAdmin } = logIn();
</script>

<style lang="scss" scoped></style>
@/types/User