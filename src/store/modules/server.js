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
      Router.push('/')
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
