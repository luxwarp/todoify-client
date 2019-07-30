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

    const notDeleted = state.todos.filter(todo => !todo.deleted);

    return notDeleted.sort(compare);
  },
  getTodosByCategoryId: (state, getters) => id => {
    return getters.getTodos.filter(todo => {
      return todo.category === id;
    });
  },
  belongToCategory: (state, getters) => id => {
    const category = getters.getCategoryById(id);
    return category ? category.title : "Uncategorized";
  }
};

const mutations = {
  setTodos(state, data) {
    state.todos = data;
  },
  addTodo(state, newTodo) {
    state.todos.push(newTodo);
  },
  updateTodo(state, updatedTodo) {
    const allOthers = state.todos.filter(todo => todo._id !== updatedTodo._id);

    allOthers.push(updatedTodo);
    state.todos = allOthers;
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
          if (foundLocal.deleted === true) {
            // If the local todo has key deleted === true it should be deleted on server.
            // And there by can also be safely ignored on client.
            await window.$todoify.deleteTodo(foundLocal._id);
            return;
          }

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
        if (localTodo.deleted === true) {
          // If the localTodo has key deleted === true it
          // can be safely cleared on client and not sent to server.
          return;
        }

        const foundRemote = remoteTodos.find(
          remoteTodo => remoteTodo._id === localTodo._id
        );
        if (!foundRemote) {
          // localTodo not found in remoteTodos.
          // check if localTodo don't have an __v key, if so it should be created on server. Otherwise
          // it has been deleted on the server and there by should not be created again.
          if (!localTodo.hasOwnProperty("__v")) {
            // Send it to server and save response.
            const response = await window.$todoify.createTodo(localTodo);
            syncedTodos.push(response.data.data);
          }
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
        const response = await window.$todoify.createTodo(newTodo);
        commit("updateTodo", response.data.data);
      }
    } catch (error) {
      commit("createNotifier", {
        type: "error",
        message: error.message
      });
      console.log(error);
    }
  },
  async updateTodo({ commit, state, getters }, payload) {
    try {
      const todoToUpdate = await state.todos.find(
        todo => todo._id === payload._id
      );

      const patch = {
        ...todoToUpdate,
        ...payload,
        updatedAt: new Date().toISOString()
      };

      commit("updateTodo", patch);

      if (getters.isOnline() && getters.isAuth()) {
        const response = await window.$todoify.updateTodo(payload._id, patch);
        commit("updateTodo", response.data.data);
      }
    } catch (error) {
      commit("createNotifier", { type: "error", message: error.message });
      console.log(error);
    }
  },
  async deleteTodo({ commit, state, getters }, id) {
    try {
      if (!getters.isAuth() || !getters.isOnline()) {
        const todoToDelete = state.todos.find(todo => todo._id === id);

        todoToDelete.deleted = true;
        todoToDelete.updatedAt = new Date().toISOString();

        commit("updateTodo", todoToDelete);
        return;
      }

      const todosKeep = state.todos.filter(todo => todo._id !== id);
      commit("setTodos", todosKeep);
      await window.$todoify.deleteTodo(id);
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
