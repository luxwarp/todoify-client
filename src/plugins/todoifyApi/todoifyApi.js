// Todoify Server API plugin for VueJS.
import Axios from 'axios'

class TodoifyApi {
  constructor(options) {
    const defaultConfig = {
      baseURL: 'https://todoify.luxwarp.info/api',
      headers: {
        'Content-Type': 'application/json'
      },
      reqHandler: this.reqHandler,
      resHandler: this.resHandler
    }
    const config = { ...defaultConfig, ...options }
    this.config = config
    this.request = Axios.create({
      baseURL: config.baseURL,
      headers: config.headers
    })

    this.request.interceptors.request.use(
      config.reqHandler.config,
      config.reqHandler.error
    )

    this.request.interceptors.response.use(
      config.resHandler.response,
      config.resHandler.error
    )
  }

  reqHandler = {
    config: config => {
      return config
    },
    error: error => {
      return Promise.reject(error)
    }
  }

  resHandler = {
    response: response => {
      return response
    },
    error: error => {
      return Promise.reject(error)
    }
  }

  testConnection = (resource = '/', method = 'get') => {
    return this.request({ url: resource, method: method })
  }

  customRequest = requestConfig => {
    return this.request.request(requestConfig)
  }

  authenticate = data => {
    return this.request.post('/users/authenticate', data)
  }

  refreshToken = (refreshToken = '') => {
    return this.request.post('/users/refreshtoken', {
      refreshToken: refreshToken
    })
  }

  register = data => {
    return this.request.post('/users/register', data)
  }

  getUser = () => {
    return this.request.get('/users')
  }

  updateUser = data => {
    return this.request.patch('/users', data)
  }

  deleteUser = password => {
    return this.request.delete('/users', { data: { password: password } })
  }

  getTodos = (query = '') => {
    return this.request.get('/todos' + query)
  }

  createTodo = (data, query = '') => {
    return this.request.post('/todos' + query, data)
  }

  deleteTodo = data => {
    return this.request.delete('/todos/' + data)
  }

  getCategories = (query = '') => {
    return this.request.get('/categories' + query)
  }

  createCategory = data => {
    return this.request.post('/categories', data)
  }

  deleteCategory = data => {
    return this.request.delete('/categories/' + data)
  }
}

export default {
  install(Vue, options) {
    const todoify = new TodoifyApi(options)

    Vue.prototype.$todoify = todoify

    if (typeof window !== 'undefined') {
      window.$todoify = todoify
    }
  }
}
