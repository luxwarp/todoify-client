import Router from '@/router'
const state = {

}

const getters = {

}

const mutations = {

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
