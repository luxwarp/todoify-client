import objectId from "bson-objectid";

const state = {
  categories: []
};

const getters = {
  getCategories(state) {
    return state.categories;
  },
  getCategoryById: state => id => {
    return state.categories.find(category => category._id === id);
  }
};

const mutations = {
  setCategories(state, data) {
    state.categories = data;
  },
  addCategory(state, newCategeory) {
    state.categories.push(newCategeory);
  }
};

const actions = {
  async getCategories({ commit }) {
    try {
      const response = await window.$todoify.getCategories();
      commit("setCategories", response.data.data);
    } catch (error) {
      commit("createNotifier", {
        type: "error",
        message: error.message
      });
      console.log(error);
    }
  },
  async syncCategories({ commit, state }) {
    try {
      const localCategories = state.categories;
      const response = await window.$todoify.getCategories();
      const remoteCategories = response.data.data;

      let syncedCategories = [];

      // If no local categories all remote categories adds to state.
      if (!localCategories.length) {
        console.log("No local categories. Setting all remote.");
        commit("setCategories", remoteCategories);
        return;
      }

      // If no remote categories. Sending all local categories to server.
      if (!remoteCategories.length) {
        console.log(
          "No remote categories. Sending all local categories to server."
        );
        localCategories.forEach(async localCategory => {
          const response = await window.$todoify.createCategory(localCategory);
          syncedCategories.push(response.data.data);
        });
        commit("setCategories", syncedCategories);
        return;
      }
    } catch (error) {
      commit("createNotifier", { type: "error", message: error.message });
      console.log(error);
      return;
    }
  },
  async createCategory({ commit, getters }, title) {
    try {
      const newCategory = {
        _id: objectId.generate(),
        title: title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      commit("addCategory", newCategory);
      if (getters.isOnline() && getters.isAuth()) {
        await window.$todoify.createCategory(newCategory);
      }
    } catch (error) {
      commit("createNotifier", {
        type: "error",
        message: error.message
      });
      console.log(error);
    }
  },
  async deleteCategory({ commit, state, getters }, id) {
    try {
      const categoriesKeep = state.categories.filter(
        category => category._id !== id
      );
      commit("setCategories", categoriesKeep);
      if (getters.isOnline() && getters.isAuth()) {
        await window.$todoify.deleteCategory(id);
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
