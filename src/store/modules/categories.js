import objectId from "bson-objectid";

const state = {
  categories: []
};

const getters = {
  getCategories(state) {
    const notDeleted = state.categories.filter(category => !category.deleted);

    return notDeleted.sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
    );
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
        // A matching local category was found.
        if (foundLocal) {
          if (foundLocal.deleted === true) {
            // If the local category has key deleted === true it should be deleted on server.
            // And there by can also be safely ignored on client.
            await window.$todoify.deleteCategory(foundLocal._id);
            return;
          }

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

      // Start going through local categories to see if they don't exist in remote categories.
      localCategories.forEach(async localCategory => {
        if (localCategory.deleted === true) {
          // If the localCategory has key deleted === true it
          // can be safely cleared on client and not sent to server.
          return;
        }
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
      if (!getters.isAuth() || !getters.isOnline()) {
        const categoryToDelete = state.categories.find(
          category => category._id === id
        );

        categoryToDelete.deleted = true;
        categoryToDelete.updatedAt = new Date().toISOString();

        commit("updateCategory", categoryToDelete);
        return;
      }

      const categoriesKeep = state.categories.filter(
        category => category._id !== id
      );
      commit("setCategories", categoriesKeep);
      await window.$todoify.deleteCategory(id);
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
