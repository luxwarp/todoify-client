import Todos from '@/views/todos/Todos'
import All from '@/components/todos/All'
export default [
  {
    path: '/todos',
    component: Todos,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'todos.all',
        component: All,
        meta: {
          title: `All To-do's`,
          requiresAuth: true
        }
      }
    ]
  }
]
