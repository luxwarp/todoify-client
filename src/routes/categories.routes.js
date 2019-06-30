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
      }
    ]
  }
]
