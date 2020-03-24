'use strict'
const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const port = 8081

function resolve (dir) {
  return path.join(__dirname, dir)
}

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  lintOnSave: 'warning',
  /**
   * 判断是开发环境还是生产环境
   * 配置打包后静态资源访问路径 /cms/
   * */
  publicPath: process.env.NODE_ENV === 'production' ? '/cms/' : '/',
  devServer: {
    compress: true,
    port: port,
    historyApiFallback: false,
    // overlay: {
    //   warnings: true,
    //   errors: true
    // },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:${port}/mock`,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },
      [process.env.VUE_APP_LOCALSERVER]: {
        target: 'http://localhost:8082',
        pathRewrite: {
          ['^' + process.env.VUE_APP_LOCALSERVER]: ''
        },
        ws: true
      },
      '/tests': {
        target: `http://192.168.20.129:8089`,
        pathRewrite: {
          ['^' + '/tests']: ''
        }
      },
      '/zhangyanbin': {
        target: `http://192.168.120.130:8082`,
        pathRewrite: {
          ['^' + '/zhangyanbin']: ''
        }
      },
      '/caopanpan': {
        target: `http://192.168.120.174:8081`,
        pathRewrite: {
          ['^' + '/caopanpan']: ''
        }
      },
      '/lugong': {
        target: `http://192.168.201.42:8077`,
        pathRewrite: {
          ['^' + '/lugong']: ''
        }
      },
    },
    after: require('./mock/mock-server.js')
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // config.devtool = 'none'
      // config.devtool = 'nosources-source-map'
    }
  },
  chainWebpack (config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    config.module.rules
      .delete('eslint')
      .end()
    config.resolve.alias
      .set('@scss', resolve('src/styles'))
      .set('@image', resolve('src/assets/image'))
      .end()
    config.resolve.modules
      .prepend(path.resolve('node_modules'))
      .end()
      // copy build assets to static
    // config
    //   .plugin('copy-to-assets')
    //   .use(FileManagerPlugin, [{
    //     onEnd: {
    //       copy: [
    //         { source: './dist', destination: resolve('../resources/static') },
    //         { source: './dist/index.html', destination: resolve('../resources/templates') },
    //         { source: './dist/favicon.ico', destination: resolve('../resources/templates') },
    //         { source: './dist/static/*', destination: resolve('../resources/static') }
    //       ]
    //     }
    //   }])
    //   .end()
  }
}
