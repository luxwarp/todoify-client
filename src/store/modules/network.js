const state = {
  isOnline: navigator.onLine
};

const getters = {
  isOnline(state) {
    return state.isOnline;
  }
};

const mutations = {
  updateIsOnline(state) {
    state.isOnline = navigator.onLine;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
