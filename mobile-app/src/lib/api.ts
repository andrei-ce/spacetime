import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://<your ip address>:3333',
})
