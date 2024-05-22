import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'

const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: [],
        error: ''
    }),
})