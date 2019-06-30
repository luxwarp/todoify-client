import Todos from '@/views/TodosView'
import TodosAll from '@/components/todos/TodosAll'
import TodosSingle from '@/components/todos/TodosSingle'

export default [
  {
    path: '/todos',
    redirect: { name: 'todos.all' },
    component: Todos,
    children: [
      {
        path: '',
        name: 'todos.all',
        component: TodosAll,
        meta: {
          title: `To-do's`,
          requiresAuth: true
        }
      },
      {
        path: ':todoId',
        name: 'todos.single',
        component: TodosSingle,
        meta: {
          requiresAuth: true,
          title: 'To-do'
        }
      }
    ]
  }
]
