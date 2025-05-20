import axios from 'axios'

const baseURL = 'http://localhost:8085/'

const api = axios.create({
  baseURL,
})

export { api }
