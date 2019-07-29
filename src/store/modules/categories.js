import objectId from "bson-objectid";

const state = {
  categories: []
};

const getters = {
  getCategories(state) {
    function compare(a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    }

    return state.categories.sort(compare);
  },
  getCategoryById: state => id => {
    return state.categories.find(category => category._id === id);
  }
};

const mutations = {
  setCategories(state, data) {
    state.categories = data;
  },
  addCategory(state, newCategory) {
    state.categories.push(newCategory);
  },
  updateCategory(state, updatedCategory) {
    const allOthers = state.categories.filter(
      category => category._id !== updatedCategory._id
    );

    allOthers.push(updatedCategory);
    state.categories = allOthers;
  }
};

const actions = {
  async syncCategories({ commit, state }) {
    try {
      const localCategories = state.categories;
      const response = await window.$todoify.getCategories();
      const remoteCategories = response.data.data;

      let syncedCategories = [];

      // If no local categories all remote categories adds to state.
      if (!localCategories.length) {
        commit("setCategories", remoteCategories);
        return;
      }

      // If no remote categories. Sending all local categories to server.
      if (!remoteCategories.length) {
        localCategories.forEach(async localCategory => {
          const response = await window.$todoify.createCategory(localCategory);
          syncedCategories.push(response.data.data);
        });
        commit("setCategories", syncedCategories);
        return;
      }

      // Start going through remoteCategories to match localCategories.
      remoteCategories.forEach(async remoteCategory => {
        const foundLocal = localCategories.find(
          localCategory => localCategory._id === remoteCategory._id
        );
        if (foundLocal) {
          // A matching local category was found.
          if (remoteCategory.updatedAt >= foundLocal.updatedAt) {
            // if the remote category is newer or the same, save the remote category.
            syncedCategories.push(remoteCategory);
          } else {
            // if the local category is newer, update the server and save the response.
            const response = await window.$todoify.updateCategory(
              foundLocal._id,
              foundLocal
            );
            syncedCategories.push(response.data.data);
          }
        } else {
          // No local category found. This remote category needs to be synced to client.
          syncedCategories.push(remoteCategory);
        }
      });

      // Start going through local categories to see if they exist in remote categories.
      localCategories.forEach(async localCategory => {
        const foundRemote = remoteCategories.find(
          remoteCategory => remoteCategory._id === localCategory._id
        );
        if (!foundRemote) {
          // localCategory not found in remoteCategories.
          // check if localCategory don't have an __v key, if so it should be created on server. Otherwise
          // it has been deleted on the server and there by should not be created again.
          if (!localCategory.hasOwnProperty("__v")) {
            // Send it to server and save response.
            const response = await window.$todoify.createCategory(
              localCategory
            );
            syncedCategories.push(response.data.data);
          }
        }
      });

      // All done. Categories should be synced and updated. Now set them to state.
      commit("setCategories", syncedCategories);
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
        const response = await window.$todoify.createCategory(newCategory);
        commit("updateCategory", response.data.data);
      }
    } catch (error) {
      commit("createNotifier", {
        type: "error",
        message: error.message
      });
      console.log(error);
    }
  },
  async updateCategory({ commit, state, getters }, payload) {
    try {
      const categoryToUpdate = await state.categories.find(
        category => category._id === payload.id
      );
      categoryToUpdate.title = payload.newTitle;
      categoryToUpdate.updatedAt = new Date().toISOString();

      commit("updateCategory", categoryToUpdate);

      if (getters.isOnline() && getters.isAuth()) {
        const response = await window.$todoify.updateCategory(
          payload.id,
          categoryToUpdate
        );
        commit("updateCategory", response.data.data);
      }
    } catch (error) {
      commit("createNotifier", { type: "error", message: error.message });
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
