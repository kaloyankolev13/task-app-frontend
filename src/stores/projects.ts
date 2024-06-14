import { defineStore } from 'pinia'
import axios from 'axios'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [] as any[],
    error: ''
  }),
  actions: {
    async fetchProjects() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects`)
        this.projects = response.data
      } catch (error: any) {
        this.error = 'Error fetching projects: ' + error.message
      }
    },
    async createProject(projectData: { title: string, description: string, tags?: string[] }) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/projects`, projectData)
        this.projects.push(response.data)
        return response.data
      } catch (error: any) {
        this.error = 'Error creating project: ' + error.message
      }
    }
  }
})
