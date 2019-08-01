import Router from "@/router";
import JWTDecode from "jwt-decode";
import objectId from "bson-objectid";

const state = {
  accessToken: window.$cookies.get("accessToken") || null,
  refreshToken: window.$cookies.get("refreshToken") || null
};

const getters = {
  isAuth: state => () => {
    return state.refreshToken && window.$cookies.isKey("refreshToken");
  }
};

const mutations = {
  setTokens(state, tokens) {
    if (tokens.accessToken) {
      const decodedAccessToken = JWTDecode(tokens.accessToken);
      let accessTime = new Date(0);
      accessTime.setUTCSeconds(decodedAccessToken.exp);
      window.$cookies.set("accessToken", tokens.accessToken, accessTime);
      state.accessToken = tokens.accessToken;
    }
    if (tokens.refreshToken) {
      const decodedRefreshToken = JWTDecode(tokens.refreshToken);
      let refreshTime = new Date(0);
      refreshTime.setUTCSeconds(decodedRefreshToken.exp);
      window.$cookies.set("refreshToken", tokens.refreshToken, refreshTime);
      state.refreshToken = tokens.refreshToken;
    }
  },
  clearTokens(state) {
    window.$cookies.remove("accessToken");
    window.$cookies.remove("refreshToken");
    state.accessToken = null;
    state.refreshToken = null;
  },
  clearStateTokens(state) {
    state.accessToken = null;
    state.refreshToken = null;
  }
};

const actions = {
  async login({ commit, dispatch }, data) {
    try {
      const response = await window.$todoify.authenticate({
        ...data,
        refreshToken: true
      });
      commit("setTokens", response.data.data);
      dispatch("getUser");
      dispatch("syncCategories");
      dispatch("syncTodos");
      Router.push({ name: "user.profile" });
    } catch (error) {
      commit("createNotifier", { type: "error", message: error.message });
      console.log(error);
    }
  },
  async register({ commit }, data) {
    try {
      const newUser = {
        _id: objectId.generate(),
        email: data.email,
        password: data.password,
        name: data.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const response = await window.$todoify.register(newUser);
      commit("createNotifier", {
        type: "success",
        message: response.data.message
      });
      Router.push({ name: "user.activate" });
    } catch (error) {
      commit("createNotifier", { type: "error", message: error.message });
      console.log(error);
    }
  },
  async activateUser({ commit }, activationCode) {
    try {
      const response = await window.$todoify.activateUser(activationCode);
      commit("createNotifier", {
        type: "success",
        message: response.data.message
      });
      Router.push({ name: "user.login" });
    } catch (error) {
      commit("createNotifier", { type: "error", message: error.message });
      console.log(error);
    }
  },
  async resetPassword({ commit }, email) {
    try {
      const response = await window.$todoify.resetPassword(email);
      commit("createNotifier", {
        type: "success",
        message: response.data.message
      });
      Router.push({ name: "user.login" });
    } catch (error) {
      commit("createNotifier", { type: "error", message: error.message });
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
