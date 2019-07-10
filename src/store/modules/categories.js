const state = {
  categories: []
}

const getters = {
  getCategories(state) {
    return state.categories
  },
  getCategoryById: state => id => {
    return state.categories.find(category => category._id === id)
  }
}

const mutations = {
  setCategories(state, data) {
    state.categories = data
  }
}

const actions = {
  async getCategories({ commit }) {
    try {
      const response = await window.$todoify.getCategories('?sort[title]=asc')
      commit('setCategories', response.data.data)
    } catch (error) {
      commit('createNotifier', {
        type: 'error',
        message: 'Could not get categories.'
      })
      console.log(error)
    }
  },
  async createCategory({ commit, dispatch }, title) {
    try {
      await window.$todoify.createCategory({ title })
      dispatch('getCategories')
      commit('createNotifier', {
        type: 'success',
        message: 'Category created.'
      })
    } catch (error) {
      commit('createNotifier', {
        type: 'error',
        message: 'Could not create category.'
      })
      console.log(error)
    }
  },
  async deleteCategory({ commit, dispatch }, id) {
    try {
      await window.$todoify.deleteCategory(id)
      dispatch('getCategories')
      dispatch('getTodos')
      commit('createNotifier', {
        type: 'success',
        message: 'Category deleted.'
      })
    } catch (error) {
      commit('createNotifier', {
        type: 'error',
        message: 'Could not delete category.'
      })
      console.log(error)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
