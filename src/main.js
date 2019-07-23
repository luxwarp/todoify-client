import Vue from "vue";
import App from "./App.vue";
import VueCookies from "vue-cookies";
import VueAnalytics from "vue-analytics";
import TodoifyApi from "@/plugins/todoifyApi/todoifyApi";
import router from "@/router";
import store from "@/store/store";
import resHandler from "@/helpers/resHandler";
import reqHandler from "@/helpers/reqHandler";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/styles/_layout.scss";
import "./registerServiceWorker";

Vue.config.productionTip = false;

// Register a global custom directive called `v-focus`
Vue.directive("focus", {
  // When the bound element is inserted into the DOM...
  inserted: function(el) {
    // Focus the element
    el.focus();
  }
});

Vue.use(VueCookies);
Vue.use(VueAnalytics, {
  id: "UA-105792327-7",
  router
});
Vue.use(TodoifyApi, {
  baseURL: process.env.VUE_APP_TODOIFY_API_URL,
  reqHandler: reqHandler,
  resHandler: resHandler
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
