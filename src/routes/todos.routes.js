import Todos from '@/views/TodosView'
import TodosAll from '@/components/todos/TodosAll'
import Store from '@/store/store'

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
        path: ':todoId/delete',
        name: 'todos.delete',
        meta: {
          requiresAuth: true,
          title: 'Delete To-do'
        },
        beforeEnter: (to, from, next) => {
          if (confirm('Are you sure you want to delete ?')) {
            Store.dispatch('deleteTodo', to.params.todoId)
          }
          next(false)
        }
      }
    ]
  }
]
