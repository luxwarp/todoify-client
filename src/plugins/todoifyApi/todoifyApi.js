// Todoify Server API plugin for VueJS.
import Axios from 'axios'

class TodoifyApi {
  constructor (options) {
    const defaultConfig = {
      baseURL: 'https://todoify.luxwarp.info/api',
      headers: {
        'Content-Type': 'application/json'
      },
      reqHandler: this.reqHandler,
      resHandler: this.resHandler,
      errorHandler: this.errorHandler
    }
    const config = { ...defaultConfig, ...options }
    this.request = Axios.create({
      baseURL: config.baseURL,
      headers: config.headers
    })

    this.request.interceptors.request.use(config.reqHandler, config.errorHandler)

    this.request.interceptors.response.use(config.resHandler, config.errorHandler)
  }

  reqHandler = (config) => {
    return config
  }

  resHandler = (response) => {
    return response
  }

  errorHandler = (error) => {
    return Promise.reject(error)
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

  deleteTodo = (data) => {
    return this.request.delete('/todos/' + data)
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
    const todoify = new TodoifyApi(options)

    Vue.prototype.$todoify = todoify

    if (typeof window !== 'undefined') {
      window.$todoify = todoify
    }
  }
}
