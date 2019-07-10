import Store from '@/store/store'
import CategoriesView from '@/views/CategoriesView'
import CategoriesListView from '@/views/categories/CategoriesListView'
import CategoriesItemView from '@/views/categories/CategoriesItemView'
export default [
  {
    path: '/categories',
    redirect: { name: 'categories.list' },
    component: CategoriesView,
    children: [
      {
        path: '',
        name: 'categories.list',
        component: CategoriesListView,
        meta: {
          requiresAuth: true,
          title: 'Categories'
        }
      },
      {
        path: ':categoryId',
        name: 'categories.item',
        component: CategoriesItemView,
        meta: {
          requiresAuth: true,
          title: 'Category'
        }
      },
      {
        path: ':categoryId/delete',
        name: 'categories.delete',
        meta: {
          requiresAuth: true,
          title: 'Delete category'
        },
        beforeEnter: (to, from, next) => {
          if (
            confirm(
              `Are you sure you want to delete this category ?\nTo-do's will not be deleted.`
            )
          ) {
            Store.dispatch('deleteCategory', to.params.categoryId)
            next({ name: 'categories.list' })
          } else {
            next(false)
          }
        }
      }
    ]
  }
]
