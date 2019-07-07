import Router from '@/router'
import JWTDecode from 'jwt-decode'
const state = {
}

const getters = {
  isAuth: (state) => () => {
    return window.$cookies.isKey('refreshToken')
  }
}

const mutations = {
  setTokens (state, tokens) {
    const decodedAccesToken = JWTDecode(tokens.accessToken)
    const decodedRefreshToken = JWTDecode(tokens.refreshToken)
    let accesstime = new Date(0)
    accesstime.setUTCSeconds(decodedAccesToken.exp)
    let refreshtime = new Date(0)
    refreshtime.setUTCSeconds(decodedRefreshToken.exp)
    window.$cookies.set('accessToken', tokens.accessToken, accesstime)
    window.$cookies.set('refreshToken', tokens.refreshToken, refreshtime)
  },
  clearTokens (state) {
    window.$cookies.remove('accessToken')
    window.$cookies.remove('refreshToken')
  }
}

const actions = {
  async login ({ commit, dispatch }, data) {
    try {
      const response = await window.$todoify.authenticate({ ...data, refreshToken: true })
      commit('setTokens', response.data.data)
      dispatch('syncWithServer')
      Router.push({ name: 'user.profile' })
    } catch (error) {
      console.log(error)
    }
  },
  async register ({ commit }, data) {
    try {
      const response = await window.$todoify.register(data)
      commit('createNotifier', { type: 'success', message: response.data.message })
      Router.push({ name: 'user.login' })
    } catch (error) {
      console.log(error)
    }
  },
  syncWithServer ({ dispatch }) {
    dispatch('getUser')
    dispatch('getTodos')
    dispatch('getCategories')
    dispatch('refreshToken')
  },
  async refreshToken ({ commit }) {
    try {
      if (window.$cookies.isKey('refreshToken')) {
        const response = await window.$todoify.refreshToken(window.$cookies.get('refreshToken'))
        commit('setTokens', response.data.data)
        return true
      } else {
        throw Error('No refresh token.')
      }
    } catch (error) {
      Router.push({ name: 'user.logout' })
      return false
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
