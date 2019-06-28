import Store from '@/store/store.js'
import Login from '@/views/user/Login'
import Register from '@/views/user/Register'

export default [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: 'Create account'
    }
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      Store.dispatch('logout')
    }
  }
]
