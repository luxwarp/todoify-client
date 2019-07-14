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
      if (todo.category) {
        return todo.category._id === id;
      } else {
        return todo.category === id;
      }
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
  async createTodo({ commit, dispatch }, data) {
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
      console.log(newTodo);
      const response = await window.$todoify.createTodo(newTodo);
      console.log(response.data.data);
      dispatch("getTodos");
    } catch (error) {
      commit("createNotifier", {
        type: "error",
        message: error.message
      });
      console.log(error);
    }
  },
  async deleteTodo({ commit, dispatch, state }, id) {
    try {
      const todosKeep = state.todos.filter(todo => todo._id !== id);
      commit("setTodos", todosKeep);
      commit("createNotifier", { type: "success", message: "To-do deleted." });
      await window.$todoify.deleteTodo(id);
      dispatch("getTodos");
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
