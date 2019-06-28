import Todoify from '@/services/todoifyServer.js'
import Router from '@/router'
const state = {
  token: window.$cookies.get('token') || null
}

const getters = {
  getToken (state) {
    return state.token
  },
  isAuth: (state) => () => {
    return (state.token && window.$cookies.isKey('token'))
  }
}

const mutations = {
  setToken (state, token) {
    state.token = token
  }

}

const actions = {
  async login ({ commit }, data) {
    try {
      const response = await Todoify.post('/users/authenticate', data)
      commit('setToken', response.data.data.token)
      window.$cookies.set('token', response.data.data.token, '1h')
      Router.push('/user')
    } catch (error) {
      commit('createNotifier', { type: 'error', message: error.response.data.errors.message })
    }
  },
  async register ({ commit }, data) {
    try {
      const response = await Todoify.post('/users/register', data)
      commit('createNotifier', { type: 'success', message: response.data.message })
      Router.push('/login')
    } catch (error) {
      commit('createNotifier', { type: 'error', message: error.response.data.errors.message })
    }
  },
  async getUserInfo ({ commit }) {
    try {
      const response = await Todoify.get('/users')
      commit('setUserInfo', response.data.data)
    } catch (error) {
      commit('createNotifier', { type: 'error', message: error.response.data.errors.message })
    }
  },
  async updateUser ({ commit }, data) {
    try {
      const response = await Todoify.patch('/users', data)
      commit('setUserInfo', response.data.data)
      Router.push('/user')
    } catch (error) {
      commit('createNotifier', { type: 'error', message: error.response.data.errors.message })
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
