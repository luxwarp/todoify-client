const state = {
  categories: []
}

const getters = {
  getCategories (state) {
    return state.categories
  }
}

const mutations = {
  setCategories (state, data) {
    state.categories = data
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
