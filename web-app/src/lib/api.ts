import axios from 'axios'

export const api = axios.create({
  // baseURL: 'http://localhost:3333', --> commented because we added 0.0.0.0 as host on the server, to be able to run mobile
  baseURL: 'http://192.168.0.7:3333',
})
