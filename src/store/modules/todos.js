const state = {
  todos: []
}

const getters = {
  getTodos (state) {
    return state.todos
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
