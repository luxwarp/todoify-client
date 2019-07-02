// Todoify Server API plugin for VueJS.
import Axios from 'axios'

class TodoifyApi {
  constructor (options) {
    const defaultConfig = {
      baseURL: 'https://todoify.luxwarp.info/api',
      headers: {
        'Content-Type': 'application/json'
      },
      token: null
    }
    const config = { ...defaultConfig, ...options }
    this.request = Axios.create({
      baseURL: config.baseURL,
      headers: config.headers
    })

    this.request.interceptors.request.use(reqConfig => {
      if (config.token) {
        reqConfig.headers.Authorization = config.token
      }
      return reqConfig
    }, error => {
      return Promise.reject(error)
    })

    this.request.interceptors.response.use(response => {
      return response
    }, (error) => {
      return Promise.reject(error)
    })
  }

  testConnection = (resource = '/', method = 'get') => {
    return this.request({ url: resource, method: method })
  }

  authenticate = (data) => {
    return this.request.post('/users/authenticate', data)
  }

  register = (data) => {
    return this.request.post('/users/register', data)
  }

  getUser = () => {
    return this.request.get('/users')
  }

  updateUser = (data) => {
    return this.request.patch('/users', data)
  }

  getTodos = () => {
    return this.request.get('/todos')
  }

  createTodo = (data) => {
    return this.request.post('/todos', data)
  }

  getCategories = () => {
    return this.request.get('/categories')
  }

  createCategory = (data) => {
    return this.request.post('/categories', data)
  }
}

export default {
  install (Vue, options) {
    console.log('installing Todoify Api Plugin')

    const todoify = new TodoifyApi(options)

    Vue.prototype.$todoify = todoify

    if (typeof window !== 'undefined') {
      window.$todoify = todoify
    }
  }
}
