import Store from "@/store/store";
const UserView = () =>
  import(/* webpackChunkName: "router-user" */ "@/views/UserView");
const UserLogin = () =>
  import(/* webpackChunkName: "router-user" */ "@/components/user/UserLogin");
const UserRegister = () =>
  import(/* webpackChunkName: "router-user" */ "@/components/user/UserRegister");
const UserProfile = () =>
  import(/* webpackChunkName: "router-user" */ "@/components/user/UserProfile");
const UserEdit = () =>
  import(/* webpackChunkName: "router-user" */ "@/components/user/UserEdit");
const UserDelete = () =>
  import(/* webpackChunkName: "router-user" */ "@/components/user/UserDelete");

export default [
  {
    path: "/user",
    component: UserView,
    redirect: { name: "user.profile" },
    meta: {},
    children: [
      {
        path: "profile",
        name: "user.profile",
        component: UserProfile,
        meta: {
          title: "Profile",
          requiresAuth: true,
          requiresOnline: true
        }
      },
      {
        path: "login",
        name: "user.login",
        component: UserLogin,
        meta: {
          title: "Login",
          requiresAuth: false,
          requiresOnline: true
        }
      },
      {
        path: "register",
        name: "user.register",
        component: UserRegister,
        meta: {
          title: "Create account",
          requiresAuth: false,
          requiresOnline: true
        }
      },
      {
        path: "logout",
        name: "user.logout",
        meta: {
          requiresAuth: false,
          requiresOnline: true
        },
        beforeEnter: (to, from, next) => {
          let allDevices = false;
          if (confirm("Do you want to logout all devices?")) {
            allDevices = true;
          }
          Store.dispatch("logout", allDevices);
        }
      },
      {
        path: "edit",
        name: "user.edit",
        component: UserEdit,
        meta: {
          title: "Edit user",
          requiresAuth: true,
          requiresOnline: true
        }
      },
      {
        path: "delete",
        name: "user.delete",
        component: UserDelete,
        meta: {
          requiresAuth: true,
          requiresOnline: true,
          title: "Delete user"
        }
      }
    ]
  }
];
