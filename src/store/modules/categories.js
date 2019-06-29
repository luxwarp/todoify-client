const state = {
  categories: []
}

const getters = {
  getCategories (state) {
    return state.categories
  },
  getCategoryById: (state) => (id) => {
    return state.categories.find(category => category._id === id)
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
