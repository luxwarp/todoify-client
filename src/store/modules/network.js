const state = {
  isOnline: navigator.onLine
};

const getters = {
  isOnline: state => () => {
    return state.isOnline;
  }
};

const mutations = {
  updateIsOnline(state) {
    state.isOnline = navigator.onLine;
  }
};

const actions = {
  handleOnline({ commit, dispatch, getters }) {
    commit("updateIsOnline");
    const tokens = {
      accessToken: window.$cookies.get("accessToken"),
      refreshToken: window.$cookies.get("refreshToken")
    };
    commit("setTokens", tokens);
    if (getters.isAuth()) {
      dispatch("getUser");
    }
  },
  handleOffline({ commit }) {
    commit("updateIsOnline");
    commit("setUserInfo", {});
    commit("clearStateTokens");
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
