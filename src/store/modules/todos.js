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

}

export default {
  state,
  getters,
  mutations,
  actions
}
