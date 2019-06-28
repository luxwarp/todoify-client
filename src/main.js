import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import router from '@/router'
import store from '@/store/store'
import 'material-design-icons/iconfont/material-icons.css'

Vue.config.productionTip = false

Vue.use(VueCookies)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
