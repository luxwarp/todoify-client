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
  async createCategory({ commit, dispatch }, title) {
    try {
      const newCategeory = {
        _id: objectId.generate(),
        title: title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      commit("addCategory", newCategeory);
      commit("createNotifier", {
        type: "success",
        message: "Category created."
      });
      await window.$todoify.createCategory(newCategeory);
      dispatch("getCategories");
    } catch (error) {
      commit("createNotifier", {
        type: "error",
        message: error.message
      });
      console.log(error);
    }
  },
  async deleteCategory({ commit, dispatch, state }, id) {
    try {
      const categoriesKeep = state.categories.filter(
        category => category._id !== id
      );
      commit("setCategories", categoriesKeep);
      commit("createNotifier", {
        type: "success",
        message: "Category deleted."
      });
      await window.$todoify.deleteCategory(id);
      dispatch("getCategories");
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
