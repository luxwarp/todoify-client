import Vue from "vue";
import Vuex from "vuex";
import User from "./modules/user";
import Todos from "./modules/todos";
import Categories from "./modules/categories";
import Interface from "./modules/interface";
import Server from "./modules/server";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    User,
    Todos,
    Categories,
    Interface,
    Server
  }
});
