// vue.config.js
module.exports = {
  publicPath: '/',
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~normalize.css/normalize.css";
        @import "@/styles/_theme.scss";
        @import "@/styles/_layout.scss";`
      }
    }
  }
}
