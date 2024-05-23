// stores/user.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';
import type { IUser } from '../types/User';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as IUser,
    token: '',
    isAuthenticated: false,
    error: ''
  }),

  actions: {
    initializeAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    },
    async login(user: IUser) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, user);
        console.log(response.data);
        const { access_token } = response.data;
        localStorage.setItem('token', access_token);
        this.token = access_token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        this.isAuthenticated = true;
        router.push({ name: 'projects' });
      } catch (err) {
        this.error = 'Failed to fetch user';
        console.error('Failed to fetch user:', err);
      }
    },
    logout() {
      this.token = '';
      this.isAuthenticated = false;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      router.push({ name: 'login' });
    },
    async updateUser(user: IUser) {
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/admin`, user);
        this.user = user;
      } catch (err) {
        this.error = 'Failed to update user';
        console.error('Failed to update user:', err);
      }
    }
  }
});
