import objectId from "bson-objectid";

const state = {
  todos: []
};

const getters = {
  getTodos(state) {
    function compare(a, b) {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      }
      if (a.updatedAt < b.updatedAt) {
        return 1;
      }
      return 0;
    }
    return state.todos.sort(compare);
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
  async syncTodos({ commit, state }) {
    try {
      const localTodos = state.todos;
      const response = await window.$todoify.getTodos();
      const remoteTodos = response.data.data;

      let syncedTodos = [];

      // If no local todos all remote todos adds to state.
      if (!localTodos.length) {
        commit("setTodos", remoteTodos);
        return;
      }

      // If no remote todos. Sending all local todos to server.
      if (!remoteTodos.length) {
        localTodos.forEach(async localTodo => {
          const response = await window.$todoify.createTodo(localTodo);
          syncedTodos.push(response.data.data);
        });
        commit("setTodos", syncedTodos);
        return;
      }

      // Start going through remoteTodos to match localTodos.
      remoteTodos.forEach(async remoteTodo => {
        const foundLocal = localTodos.find(
          localTodo => localTodo._id === remoteTodo._id
        );
        if (foundLocal) {
          // A matching local todo was found.
          if (remoteTodo.updatedAt >= foundLocal.updatedAt) {
            // if the remote todo is newer or the same, save the remote todo.
            syncedTodos.push(remoteTodo);
          } else {
            // if the local todo is newer, update the server and save the response.
            const response = await window.$todoify.updateTodo(
              foundLocal._id,
              foundLocal
            );
            syncedTodos.push(response.data.data);
          }
        } else {
          // No local todo found. This remote todo needs to be synced to client.
          syncedTodos.push(remoteTodo);
        }
      });

      // Start going through localTodos to see if they exist in remoteTodos.
      localTodos.forEach(async localTodo => {
        const foundRemote = remoteTodos.find(
          remoteTodo => remoteTodo._id === localTodo._id
        );
        if (!foundRemote) {
          // LocalTodo not found in remoteTodos. Send it to server and save response.
          const response = await window.$todoify.createTodo(localTodo);
          syncedTodos.push(response.data.data);
        }
      });

      // All done. Todos should be synced and updated. Now set them to state.
      commit("setTodos", syncedTodos);
    } catch (error) {
      commit("createNotifier", { type: "error", message: error.message });
      console.log(error);
      return;
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
