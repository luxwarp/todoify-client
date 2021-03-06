import Vue from "vue";
import App from "./App.vue";
import VueCookies from "vue-cookies";
import VueAnalytics from "vue-analytics";
import "normalize.css";
import store from "@/store/store";
import router from "@/router";
import TodoifyApi from "@/plugins/todoifyApi/todoifyApi";
import resHandler from "@/helpers/resHandler";
import reqHandler from "@/helpers/reqHandler";
import "./components/GlobalComponents";
import "@/styles/_layout.scss";
import "@/assets/todoify-icons/css/todoify-icons.css";
import "@/registerServiceWorker";

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
  id: process.env.VUE_APP_GOOGLE_ANALYTICS_ID,
  disabled: process.env.VUE_APP_ENABLE_GOOGLE_ANALYTICS === "false",
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
