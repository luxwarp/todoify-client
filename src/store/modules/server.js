import Router from '@/router'
import JWTDecode from 'jwt-decode'
const state = {
  accessToken: window.$cookies.get('accessToken') || null,
  refreshToken: window.$cookies.get('refreshToken') || null
}

const getters = {
  isAuth: state => () => {
    return state.refreshToken && window.$cookies.isKey('refreshToken')
  }
}

const mutations = {
  setTokens(state, tokens) {
    if (tokens.accessToken) {
      const decodedAccesToken = JWTDecode(tokens.accessToken)
      let accesstime = new Date(0)
      accesstime.setUTCSeconds(decodedAccesToken.exp)
      window.$cookies.set('accessToken', tokens.accessToken, accesstime)
      state.accessToken = tokens.accessToken
    }
    if (tokens.refreshToken) {
      const decodedRefreshToken = JWTDecode(tokens.refreshToken)
      let refreshtime = new Date(0)
      refreshtime.setUTCSeconds(decodedRefreshToken.exp)
      window.$cookies.set('refreshToken', tokens.refreshToken, refreshtime)
      state.refreshToken = tokens.refreshToken
    }
  },
  clearTokens(state) {
    window.$cookies.remove('accessToken')
    window.$cookies.remove('refreshToken')
    state.accessToken = null
    state.refreshToken = null
  }
}

const actions = {
  async login({ commit, dispatch }, data) {
    try {
      const response = await window.$todoify.authenticate({
        ...data,
        refreshToken: true
      })
      commit('setTokens', response.data.data)
      dispatch('syncWithServer')
      Router.push({ name: 'user.profile' })
    } catch (error) {
      console.log(error)
    }
  },
  async register({ commit }, data) {
    try {
      const response = await window.$todoify.register(data)
      commit('createNotifier', {
        type: 'success',
        message: response.data.message
      })
      Router.push({ name: 'user.login' })
    } catch (error) {
      console.log(error)
    }
  },
  syncWithServer({ dispatch }) {
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
