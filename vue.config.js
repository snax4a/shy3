// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path');

module.exports = {
  assetsDir: 'src/assets',

  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options['transformAssetUrls'] = {
          img: 'src',
          image: 'xlink:href',
          // 'b-img': 'src',
          // 'b-img-lazy': ['src', 'blank-src'],
          // 'b-card': 'img-src',
          // 'b-card-img': 'img-src',
          // 'b-card-img-lazy': ['src', 'blank-src'],
          'b-carousel-slide': 'img-src',
          'b-embed': 'src'
        }

        return options
      })
  },

  configureWebpack: {
    plugins: [
      // new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, './src/index.html'),
          path.join(__dirname, './**/*.vue'),
          path.join(__dirname, './src/**/*.js')
        ])
      })
    ]
  },

  css: {
    loaderOptions: {
      scss: {
        data: '@import "@/scss/variables.scss";'
      }
    }
  },

  // devServer: {
  //   watchOptions: {
  //     poll: true
  //   }
  // },

  pwa: {
    name: 'Schoolhouse Yoga',
    themeColor: '#5f4884',
    msTileColor: '#5f4884'
  }
};