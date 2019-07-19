import objectId from "bson-objectid";

const state = {
  todos: []
};

const getters = {
  getTodos(state) {
    return state.todos;
  },
  getTodosByCategoryId: state => id => {
    return state.todos.filter(todo => {
      return todo.category === id;
    });
  }
};

const mutations = {
  setTodos(state, data) {
    state.todos = data;
  },
  addTodo(state, newTodo) {
    state.todos.push(newTodo);
  }
};

const actions = {
  async getTodos({ commit }) {
    try {
      const response = await window.$todoify.getTodos();
      commit("setTodos", response.data.data);
    } catch (error) {
      commit("createNotifier", {
        type: "error",
        message: error.message
      });
      console.log(error);
    }
  },
  async createTodo({ commit, getters }, data) {
    try {
      const newTodo = {
        _id: objectId.generate(),
        title: data.title,
        category: data.category || null,
        done: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      commit("addTodo", newTodo);
      if (getters.isOnline() && getters.isAuth()) {
        await window.$todoify.createTodo(newTodo);
      }
    } catch (error) {
      commit("createNotifier", {
        type: "error",
        message: error.message
      });
      console.log(error);
    }
  },
  async deleteTodo({ commit, state, getters }, id) {
    try {
      const todosKeep = state.todos.filter(todo => todo._id !== id);
      commit("setTodos", todosKeep);
      if (getters.isOnline() && getters.isAuth()) {
        await window.$todoify.deleteTodo(id);
      }
    } catch (error) {
      commit("createNotifier", {
        type: "error",
        message: error.message
      });
      console.log(error);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
