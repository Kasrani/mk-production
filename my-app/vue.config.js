// vue.config.js file to be place in the root of your repository

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/my-app/'
      : '/'
  }

  // vue.config.js
module.exports = {
    configureWebpack: {
      plugins: [
        new MyAwesomeWebpackPlugin()
      ]
    }
  }

  // vue.config.js
module.exports = {
    chainWebpack: config => {
      config.module
        .rule('vue')
        .use('vue-loader')
          .tap(options => {
            // modify the options...
            return options
          })
    }
  }