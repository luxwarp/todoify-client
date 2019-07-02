import Store from '@/store/store'
import UserView from '@/views/UserView'
import UserLogin from '@/components/user/UserLogin'
import UserRegister from '@/components/user/UserRegister'
import UserProfile from '@/components/user/UserProfile'
import UserEdit from '@/components/user/UserEdit'

export default [
  {
    path: '/user',
    component: UserView,
    redirect: { name: 'user.profile' },
    meta: {
    },
    children: [
      {
        path: 'profile',
        name: 'user.profile',
        component: UserProfile,
        meta: {
          title: 'Profile',
          requiresAuth: true
        }
      },
      {
        path: 'login',
        name: 'user.login',
        component: UserLogin,
        meta: {
          title: 'Login',
          requiresAuth: false
        }
      },
      {
        path: 'register',
        name: 'user.register',
        component: UserRegister,
        meta: {
          title: 'Create account',
          requiresAuth: false
        }
      },
      {
        path: 'logout',
        name: 'user.logout',
        meta: {
          requiresAuth: false
        },
        beforeEnter: (to, from, next) => {
          Store.dispatch('logout')
        }
      },
      {
        path: 'edit',
        name: 'user.edit',
        component: UserEdit,
        meta: {
          title: 'Edit user',
          requiresAuth: true
        }
      }
    ]
  }
]
