import Todos from '@/views/todos/Todos'
import All from '@/components/todos/All'
import Id from '@/components/todos/Id'

export default [
  {
    path: '/todos',
    redirect: { name: 'todos.all' },
    component: Todos,
    children: [
      {
        path: '',
        name: 'todos.all',
        component: All,
        meta: {
          title: `To-do's`,
          requiresAuth: true
        }
      },
      {
        path: ':todoId',
        name: 'todos.id',
        component: Id,
        meta: {
          requiresAuth: true,
          title: 'To-do'
        }
      }
    ]
  }
]
