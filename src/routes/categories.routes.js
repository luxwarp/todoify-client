import Store from '@/store/store'
import Categories from '@/views/CategoriesView'
import CategoriesAll from '@/components/categories/CategoriesAll'
import CategoriesSingle from '@/components/categories/CategoriesSingle'
export default [
  {
    path: '/categories',
    redirect: { name: 'categories.all' },
    component: Categories,
    children: [
      {
        path: '',
        name: 'categories.all',
        component: CategoriesAll,
        meta: {
          requiresAuth: true,
          title: 'Categories'
        }
      },
      {
        path: ':categoryId',
        name: 'categories.single',
        component: CategoriesSingle,
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
          if (confirm(`Are you sure you want to delete this category ?\nTo-do's will not be deleted.`)) {
            Store.dispatch('deleteCategory', to.params.categoryId)
            next({ name: 'categories.all' })
          } else {
            next(false)
          }
        }
      }
    ]
  }
]
