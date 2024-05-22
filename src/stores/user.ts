import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'
import type { IUser } from '../types/User'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as IUser,
    error: ''
  }),

  actions: {
    initializeAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        // Optionally, you could refresh the token here or fetch user details
      }
    },
    async login(user: IUser) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, user)
        console.log(response.data)
        const { access_token } = response.data
        localStorage.setItem('token', access_token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        router.push({ name: 'admin' })
      } catch (err) {
        this.error = 'Failed to fetch user'
        console.error('Failed to fetch user:', err)
      }
    },
    async updateUser(user: IUser) {
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/admin`, user)
        this.user = user
      } catch (err) {
        this.error = 'Failed to update user'
        console.error('Failed to update user:', err)
      }
    }
  }
})
