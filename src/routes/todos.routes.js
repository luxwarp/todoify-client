import Store from "@/store/store";
const TodosView = () =>
  import(/* webpackChunkName: "router-todos" */ "@/views/TodosView");
const TodosListView = () =>
  import(/* webpackChunkName: "router-todos" */ "@/views/todos/TodosListView");

export default [
  {
    path: "/todos",
    redirect: { name: "todos.list" },
    component: TodosView,
    children: [
      {
        path: "",
        name: "todos.list",
        component: TodosListView,
        meta: {
          title: `To-do's`
        }
      },
      {
        path: ":todoId/delete",
        name: "todos.delete",
        meta: {
          title: "Delete To-do"
        },
        beforeEnter: (to, from, next) => {
          if (confirm("Are you sure you want to delete this to-do?")) {
            Store.dispatch("deleteTodo", to.params.todoId);
          }
          next(false);
        }
      }
    ]
  }
];
