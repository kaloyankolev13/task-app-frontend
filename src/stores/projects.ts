import { defineStore } from 'pinia'
import axios from 'axios'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [] as { _id: number; title: string }[],
    error: ''
  }),
  actions: {
    async fetchProjects() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects`)
        this.projects = response.data
      } catch (error:any) {
        this.error = 'Error fetching projects: ' + error.message
      }
    }
  }
})
