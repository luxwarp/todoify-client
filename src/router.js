import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store/store'
import UserRoutes from '@/routes/user.routes'
import Home from '@/views/pages/Home'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...UserRoutes,
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Welcome'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.every(record => record.meta.requiresAuth)) {
    if (!Store.getters.isAuth()) {
      next('login')
    }
  }

  // Sets the title of the page to the router meta title.
  document.title = to.meta.title + ' - ' + process.env.VUE_APP_BASE_TITLE
  next()
})

export default router
