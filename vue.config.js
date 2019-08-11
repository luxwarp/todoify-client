// vue.config.js
module.exports = {
  publicPath: "/",
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        data: `@import "~@/styles/_theme.scss";`,
        implementation: require("sass")
      }
    }
  },
  pwa: {
    name: "Todoify",
    themeColor: "#0E2B44",
    msTileColor: "#0E2B44",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    iconPaths: {
      favicon32: "img/icons/favicon-32x32.png",
      favicon16: "img/icons/favicon-16x16.png",
      appleTouchIcon: "img/icons/apple-touch-icon.png",
      maskIcon: "img/icons/safari-pinned-tab.svg",
      msTileImage: "img/icons/mstile-150x150.png"
    },
    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "src/service-worker.js",
      // ...other Workbox options...
      exclude: []
    }
  }
};
