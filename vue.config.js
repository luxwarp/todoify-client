// vue.config.js
module.exports = {
  publicPath: '/',
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/styles/_main.scss";`
      }
    }
  }
}
