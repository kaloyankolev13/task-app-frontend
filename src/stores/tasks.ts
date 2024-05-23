import { defineStore } from 'pinia'
import axios from 'axios'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as any[],
    error: ''
  }),
  actions: {
    async fetchTasks() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${localStorage.getItem('selectedProjectId')}`)
        this.tasks = response.data
      } catch (error:any) {
        this.error = 'Error fetching tasks: ' + error.message
      }
    },
    async createTask(task: any) {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/tasks/${localStorage.getItem('selectedProjectId')}`, task)
        this.fetchTasks()
      } catch (error:any) {
        this.error = 'Error creating task: ' + error.message
      }
    }
  }
})
