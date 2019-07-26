import Store from "@/store/store";
const CategoriesView = () =>
  import(/* webpackChunkName: "router-categories" */ "@/views/CategoriesView");
const CategoriesListView = () =>
  import(/* webpackChunkName: "router-categories" */ "@/views/categories/CategoriesListView");
const CategoriesItemView = () =>
  import(/* webpackChunkName: "router-categories" */ "@/views/categories/CategoriesItemView");
const CategoryEdit = () =>
  import(/* webpackChunkName: "router-categories" */ "@/components/categories/CategoryEdit/CategoryEdit");
export default [
  {
    path: "/categories",
    redirect: { name: "categories.list" },
    component: CategoriesView,
    children: [
      {
        path: "",
        name: "categories.list",
        component: CategoriesListView,
        meta: {
          title: "Categories"
        }
      },
      {
        path: ":categoryId",
        name: "categories.item",
        component: CategoriesItemView,
        meta: {
          title: "Category"
        },
        children: [
          {
            path: "edit",
            name: "category.edit",
            component: CategoryEdit,
            meta: {
              title: "Edit category"
            }
          }
        ]
      },
      {
        path: ":categoryId/delete",
        name: "categories.delete",
        meta: {
          title: "Delete category"
        },
        beforeEnter: (to, from, next) => {
          if (
            confirm(
              `Are you sure you want to delete this category?\nTo-do's in this category will not be deleted.`
            )
          ) {
            Store.dispatch("deleteCategory", to.params.categoryId);
            next({ name: "categories.list" });
          } else {
            next(false);
          }
        }
      }
    ]
  }
];
