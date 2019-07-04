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
  },
  pwa: {
    name: 'Todoify',
    themeColor: '#0E2B44',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
    }
  }
}
