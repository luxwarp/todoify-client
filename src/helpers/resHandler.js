import Store from "@/store/store";
import Router from "@/router";

const responseHandler = {
  response: response => {
    Store.commit("hideRequestStatus");
    return response;
  },
  error: error => {
    Store.commit("hideRequestStatus");

    if (!error.response) {
      return Promise.reject(error);
    }
    // Return any error which is not due to authentication back to the calling service
    if (error.response.status !== 401) {
      return Promise.reject(error.response.data.errors);
    }

    // Logout user if token refresh didn't work.
    if (error.config.url.includes("refreshtoken")) {
      Router.push({ name: "user.login" });
      Store.commit("clearTokens");
      Store.commit("createNotifier", {
        type: "warning",
        message: "Not authorized. Please log in."
      });
      return Promise.reject(error);
    }

    // Try request again with new token
    return window.$todoify
      .refreshToken(window.$cookies.get("refreshToken"))
      .then(response => {
        Store.commit("setTokens", response.data.data);
        // New request with new token
        const config = error.config;
        config.headers.Authorization = response.data.data.accessToken;

        return new Promise((resolve, reject) => {
          window.$todoify
            .customRequest(config)
            .then(response => {
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
        });
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
};

export default responseHandler;
