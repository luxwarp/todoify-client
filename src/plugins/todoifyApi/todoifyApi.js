// Todoify Server API plugin for VueJS.
import Axios from "axios";

class TodoifyApi {
  constructor(options) {
    const defaultConfig = {
      baseURL: "https://todoify.codeiolo.org/api",
      headers: {
        "Content-Type": "application/json"
      },
      reqHandler: this.reqHandler,
      resHandler: this.resHandler
    };
    const config = { ...defaultConfig, ...options };
    this.config = config;
    this.request = Axios.create({
      baseURL: config.baseURL,
      headers: config.headers
    });

    this.request.interceptors.request.use(
      config.reqHandler.config,
      config.reqHandler.error
    );

    this.request.interceptors.response.use(
      config.resHandler.response,
      config.resHandler.error
    );
  }

  reqHandler = {
    config: config => {
      return config;
    },
    error: error => {
      return Promise.reject(error);
    }
  };

  resHandler = {
    response: response => {
      return response;
    },
    error: error => {
      return Promise.reject(error);
    }
  };

  testConnection = (resource = "/", method = "get") => {
    return this.request({ url: resource, method: method });
  };

  customRequest = requestConfig => {
    return this.request.request(requestConfig);
  };

  authenticate = data => {
    return this.request.post("/users/authenticate", data);
  };

  resetPassword = email => {
    return this.request.post("/users/resetpassword", { email: email });
  };

  activateUser = (activationCode = "") => {
    return this.request.post("/users/activate", {
      activationCode: activationCode
    });
  };

  resendActivationCode = email => {
    return this.request.post("/users/resendactivationcode", { email: email });
  };

  refreshToken = (refreshToken = "") => {
    return this.request.post("/users/refreshtoken", {
      refreshToken: refreshToken
    });
  };

  register = data => {
    return this.request.post("/users/register", data);
  };

  getUser = () => {
    return this.request.get("/users");
  };

  updateUser = data => {
    return this.request.patch("/users", data);
  };

  deleteUser = password => {
    return this.request.delete("/users", { data: { password: password } });
  };

  logout = refreshToken => {
    return this.request.post("/users/logout", { refreshToken: refreshToken });
  };

  getTodos = (query = "") => {
    return this.request.get("/todos" + query);
  };

  createTodo = (data, query = "") => {
    return this.request.post("/todos" + query, data);
  };

  deleteTodo = id => {
    return this.request.delete("/todos/" + id);
  };

  updateTodo = (id, data) => {
    return this.request.patch("/todos/" + id, data);
  };

  getCategories = (query = "") => {
    return this.request.get("/categories" + query);
  };

  createCategory = data => {
    return this.request.post("/categories", data);
  };

  deleteCategory = id => {
    return this.request.delete("/categories/" + id);
  };

  updateCategory = (id, data) => {
    return this.request.patch("/categories/" + id, data);
  };
}

export default {
  install(Vue, options) {
    const todoify = new TodoifyApi(options);

    Vue.prototype.$todoify = todoify;

    if (typeof window !== "undefined") {
      window.$todoify = todoify;
    }
  }
};
