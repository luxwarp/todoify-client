import Router from '@/router'
import JWTDecode from 'jwt-decode'
const state = {
  accessToken: window.$cookies.get('accessToken') || null
}

const getters = {
  getAccessToken (state) {
    return state.accessToken
  },
  isAuth: (state, getters) => () => {
    return (getters.getAccessToken && window.$cookies.isKey('accessToken'))
  }
}

const mutations = {
  setAccessToken (state, token) {
    state.accessToken = token
  }
}

const actions = {
  async login ({ commit, dispatch }, data) {
    try {
      const response = await window.$todoify.authenticate({ ...data, refreshToken: true })
      commit('setAccessToken', response.data.data.accessToken)
      const decodedAccesToken = JWTDecode(response.data.data.accessToken)
      const decodedRefreshToken = JWTDecode(response.data.data.refreshToken)
      let accesstime = new Date(0)
      accesstime.setUTCSeconds(decodedAccesToken.exp)
      let refreshtime = new Date(0)
      refreshtime.setUTCSeconds(decodedRefreshToken.exp)
      window.$cookies.set('accessToken', response.data.data.accessToken, accesstime)
      window.$cookies.set('refreshToken', response.data.data.refreshToken, refreshtime)
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
