// vue.config.js
module.exports = {
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
