import Router from '@/router'
const state = {
  token: window.$cookies.get('token') || null
}

const getters = {
  getToken (state) {
    return state.token
  },
  isAuth: (state, getters) => () => {
    return (getters.getToken && window.$cookies.isKey('token'))
  }
}

const mutations = {
  setToken (state, token) {
    state.token = token
    window.$cookies.set('token', token, '1h')
  }

}

const actions = {
  async login ({ commit, dispatch }, data) {
    try {
      const response = await window.$todoify.authenticate(data)
      commit('setToken', response.data.data.token)
      dispatch('syncWithServer')
      Router.push({ name: 'user.profile' })
    } catch (error) {
      commit('createNotifier', { type: 'error', message: error.response.data.errors.message })
    }
  },
  async register ({ commit }, data) {
    try {
      const response = await window.$todoify.register(data)
      commit('createNotifier', { type: 'success', message: response.data.message })
      Router.push('/login')
    } catch (error) {
      commit('createNotifier', { type: 'error', message: error.response.data.errors.message })
    }
  },
  async syncWithServer ({ dispatch }) {
    dispatch('getUser')
    dispatch('getTodos')
    dispatch('getCategories')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
