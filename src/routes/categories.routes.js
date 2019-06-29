import Categories from '@/views/categories/Categories'
import All from '@/components/categories/All'
import Id from '@/components/categories/Id'
export default [
  {
    path: '/categories',
    redirect: { name: 'categories.all' },
    component: Categories,
    children: [
      {
        path: '',
        name: 'categories.all',
        component: All,
        meta: {
          requiresAuth: true,
          title: 'Categories'
        }
      },
      {
        path: ':categoryId',
        name: 'categories.id',
        component: Id,
        meta: {
          requiresAuth: true,
          title: 'Category'
        }
      }
    ]
  }
]
