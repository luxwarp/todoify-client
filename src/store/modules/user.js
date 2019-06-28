import Router from '@/router'
const state = {
  userInfo: {}
}

const getters = {
  getUserInfo (state) {
    return state.userInfo
  }
}

const mutations = {
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  logout ({ commit }) {
    commit('setToken', null)
    window.$cookies.remove('token')
    commit('createNotifier', { type: 'success', message: 'Logout successful' })
    Router.push('/login')
  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
