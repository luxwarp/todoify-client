import Axios from 'axios'
import Store from '@/store/store'

const todoify = Axios.create({
  baseURL: process.env.VUE_APP_TODOIFY_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

todoify.interceptors.request.use((config) => {
  Store.commit('showRequestStatus')
  if (Store.getters.isAuth()) {
    config.headers.Authorization = window.$cookies.get('token')
  }
  return config
}, (error) => {
  Store.commit('hideRequestStatus')
  Store.commit('createNotifier', { type: 'error', message: 'Request could not be sent to server.' })
  return Promise.reject(error)
})

todoify.interceptors.response.use((response) => {
  Store.commit('hideRequestStatus')
  return response
}, (error) => {
  Store.commit('hideRequestStatus')
  return Promise.reject(error)
})

export default todoify
