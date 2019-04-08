const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        THREE: 'three'
      })
    ]
  },
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store;

    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: 'src/assets/scss/_base.scss'
        })
        .end()
    })
  }
};