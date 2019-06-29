import Store from '@/store/store.js'
import User from '@/views/user/User'
import Login from '@/components/user/Login'
import Register from '@/components/user/Register'
import Profile from '@/components/user/Profile'
import Edit from '@/components/user/Edit'

export default [
  {
    path: '/user',
    component: User,
    redirect: '/user/profile',
    meta: {
    },
    children: [
      {
        path: 'profile',
        name: 'user.profile',
        component: Profile,
        meta: {
          title: 'Profile',
          requiresAuth: true
        }
      },
      {
        path: 'login',
        name: 'user.login',
        component: Login,
        meta: {
          title: 'Login',
          requiresAuth: false
        }
      },
      {
        path: 'register',
        name: 'user.register',
        component: Register,
        meta: {
          title: 'Create account',
          requiresAuth: false
        }
      },
      {
        path: 'logout',
        name: 'user.logout',
        meta: {
          requiresAuth: true
        },
        beforeEnter: (to, from, next) => {
          Store.dispatch('logout')
        }
      },
      {
        path: 'edit',
        name: 'user.edit',
        component: Edit,
        meta: {
          title: 'Edit user',
          requiresAuth: true
        }
      }
    ]
  }
]
