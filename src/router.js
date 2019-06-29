import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store/store'
import Home from '@/views/pages/Home'
import UserRoutes from '@/routes/user.routes'
import TodosRoutes from '@/routes/todos.routes'
import CategoriesRoutes from '@/routes/categories.routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Welcome'
      }
    },
    ...UserRoutes,
    ...TodosRoutes,
    ...CategoriesRoutes
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Store.getters.isAuth()) {
      next({ name: 'user.login', query: { redirect: to.fullPath } })
    }
  }

  // Sets the title of the page to the router meta title.
  document.title = to.meta.title + ' - ' + process.env.VUE_APP_BASE_TITLE
  next()
})

export default router
