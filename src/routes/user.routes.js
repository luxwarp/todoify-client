import Store from '@/store/store.js'
import Login from '@/views/user/Login'
import Register from '@/views/user/Register'
import Profile from '@/views/user/Profile'
import Edit from '@/views/user/Edit'

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
  },
  {
    path: '/user',
    name: 'user.profile',
    component: Profile,
    meta: {
      title: 'Profile',
      requiresAuth: true
    }
  },
  {
    path: '/user/edit',
    name: 'user.edit',
    component: Edit,
    meta: {
      title: 'Edit user',
      requiresAuth: true
    }
  }
]
