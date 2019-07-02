const state = {
  todos: []
}

const getters = {
  getTodos (state) {
    return state.todos
  },
  getTodosByCategoryId: (state) => (id) => {
    return state.todos.filter(todo => {
      if (todo.category) {
        return todo.category._id === id
      } else {
        return todo.category === id
      }
    })
  }
}

const mutations = {
  setTodos (state, data) {
    state.todos = data
  }
}

const actions = {
  async getTodos ({ commit }) {
    try {
      const response = await window.$todoify.getTodos()
      commit('setTodos', response.data.data)
    } catch (error) {
      console.log(error)
    }
  },
  async createTodo ({ commit, dispatch }, data) {
    try {
      await window.$todoify.createTodo({ title: data.title, category: data.category })
      dispatch('getTodos')
    } catch (error) {
      commit('createNotifier', { type: 'error', message: error.response.data.errors.message })
    }
  },
  async deleteTodo ({ commit, dispatch }, data) {
    try {
      await window.$todoify.deleteTodo(data)
      dispatch('getTodos')
      commit('createNotifier', { type: 'success', message: 'To-do deleted.' })
    } catch (error) {
      commit('createNotifier', { type: 'error', message: error.response.data.errors.message })
    }
  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
