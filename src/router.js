import Vue from "vue";
import Router from "vue-router";
import Store from "@/store/store";
import UserRoutes from "@/routes/user.routes";
import TodosRoutes from "@/routes/todos.routes";
import CategoriesRoutes from "@/routes/categories.routes";
const HomePage = () =>
  import(/* webpackChunkName: "router-pages" */ "@/views/pages/HomePage");
const AboutPage = () =>
  import(/* webpackChunkName: "router-pages" */ "@/views/pages/AboutPage");
const NotFoundPage = () =>
  import(/* webpackChunkName: "router-pages" */ "@/views/pages/NotFoundPage");

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*index.html*",
      redirect: "/"
    },
    {
      path: "/",
      name: "home.page",
      component: HomePage,
      meta: {
        title: "Welcome"
      }
    },
    {
      path: "/about",
      name: "about.page",
      component: AboutPage,
      meta: {
        title: "About"
      }
    },
    ...UserRoutes,
    ...TodosRoutes,
    ...CategoriesRoutes,
    {
      path: "*",
      component: NotFoundPage,
      meta: {
        title: "Not found"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresOnline)) {
    if (!Store.getters.isOnline()) {
      Store.commit("createNotifier", {
        type: "warning",
        message: "Not allowed while offline."
      });
      return next({ name: "home.page" });
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Store.getters.isAuth()) {
      Store.commit("createNotifier", {
        type: "warning",
        message: "Not authorized, please login."
      });
      Store.commit("clearStateTokens");
      return next({ name: "user.login" });
    }
  }
  next();
});

router.afterEach(to => {
  // Sets the title of the page to the router meta title.
  document.title = to.meta.title + " - " + process.env.VUE_APP_BASE_TITLE;
});

export default router;
