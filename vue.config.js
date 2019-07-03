// vue.config.js
module.exports = {
  lintOnSave: false,
  publicPath: '/',
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        data: `@import "~@/styles/_theme.scss";`
      }
    }
  }
}
