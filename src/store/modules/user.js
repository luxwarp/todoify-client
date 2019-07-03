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
  async getUser ({ commit }) {
    try {
      const response = await window.$todoify.getUser()
      commit('setUserInfo', response.data.data)
    } catch (error) {
      commit('createNotifier', { type: 'error', message: error.response.data.errors.message })
    }
  },
  async updateUser ({ commit }, data) {
    try {
      const response = await window.$todoify.updateUser(data)
      commit('setUserInfo', response.data.data)
      Router.push({ name: 'user.profile' })
    } catch (error) {
      commit('createNotifier', { type: 'error', message: error.response.data.errors.message })
    }
  },
  logout ({ commit }) {
    commit('setToken', null)
    window.$cookies.remove('token')
    commit('setUserInfo', {})
    commit('setCategories', [])
    commit('setTodos', [])
    commit('createNotifier', { type: 'success', message: 'Logout successful' })
    Router.push({ name: 'user.login' })
  },
  async deleteUser ({ commit, dispatch }) {
    await window.$todoify.deleteUser()
    commit('createNotifier', { type: 'success', message: 'User account is deleted. Welcome back!' })
    dispatch('logout')
  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
