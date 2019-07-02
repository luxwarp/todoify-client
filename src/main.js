import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import TodoifyApi from '@/plugins/todoifyApi/todoifyApi'
import router from '@/router'
import store from '@/store/store'
import 'material-design-icons/iconfont/material-icons.css'
import 'normalize.css'
import '@/styles/_layout.scss'

Vue.config.productionTip = false

Vue.use(VueCookies)
Vue.use(TodoifyApi, {
  baseURL: process.env.VUE_APP_TODOIFY_API_URL,
  token: store.getters.isAuth() ? store.getters.getToken : null
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
