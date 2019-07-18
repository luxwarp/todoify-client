import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import User from "./modules/user";
import Todos from "./modules/todos";
import Categories from "./modules/categories";
import Interface from "./modules/interface";
import Server from "./modules/server";
import Network from "./modules/network";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "todoify-state",
  modules: ["Categories", "Todos"]
});

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  plugins: [vuexPersist.plugin],
  modules: {
    User,
    Todos,
    Categories,
    Interface,
    Server,
    Network
  }
});
