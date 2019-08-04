const UserView = () =>
  import(/* webpackChunkName: "router-user" */ "@/views/UserView");
const UserLogin = () =>
  import(/* webpackChunkName: "router-user" */ "@/views/user/UserLogin");
const UserRegister = () =>
  import(/* webpackChunkName: "router-user" */ "@/views/user/UserRegister");
const UserProfile = () =>
  import(/* webpackChunkName: "router-user" */ "@/views/user/UserProfile");
const UserEdit = () =>
  import(/* webpackChunkName: "router-user" */ "@/views/user/UserEdit");
const UserLogout = () =>
  import(/* webpackChunkName: "router-user" */ "@/views/user/UserLogout");
const UserDelete = () =>
  import(/* webpackChunkName: "router-user" */ "@/views/user/UserDelete");
const UserResetPassword = () =>
  import(/* webpackChunkName: "router-user" */ "@/views/user/UserResetPassword");
const UserActivate = () =>
  import(/* webpackChunkName: "router-user" */ "@/views/user/UserActivate");
const UserResendActivationCode = () =>
  import(/* webpackChunkName: "router-user" */ "@/views/user/UserResendActivationCode");
export default [
  {
    path: "/user",
    component: UserView,
    redirect: { name: "user.profile" },
    meta: {},
    children: [
      {
        path: "",
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
        path: "activate",
        name: "user.activate",
        component: UserActivate,
        meta: {
          title: "Activate account",
          requiresAuth: false,
          requiresOnline: true
        }
      },
      {
        path: "resendactivationcode",
        name: "user.resendActivationCode",
        component: UserResendActivationCode,
        meta: {
          title: "Resend activation code",
          requiresAuth: false,
          requiresOnline: true
        }
      },
      {
        path: "resetpassword",
        name: "user.reset",
        component: UserResetPassword,
        meta: {
          title: "Reset password",
          requiresAuth: false,
          requiresOnline: true
        }
      },
      {
        path: "logout",
        name: "user.logout",
        component: UserLogout,
        meta: {
          title: "Logout",
          requiresAuth: true,
          requiresOnline: true
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
          title: "Delete user",
          requiresAuth: true,
          requiresOnline: true
        }
      }
    ]
  }
];
