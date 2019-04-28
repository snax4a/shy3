const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path');
const vueSrc = "./src";

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/variables.scss";
        `
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options['transformAssetUrls'] = {
          img: 'src',
          image: 'xlink:href',
          'b-img': 'src',
          'b-img-lazy': ['src', 'blank-src'],
          'b-card': 'img-src',
          'b-card-img': 'img-src',
          'b-card-img-lazy': ['src', 'blank-src'],
          'b-carousel-slide': 'img-src',
          'b-embed': 'src'
        }

        return options
      })
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, vueSrc)
      },
      extensions: ['.js', '.vue', '.json']
    },
    plugins: [
      new MomentLocalesPlugin(),
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, './src/index.html'),
          path.join(__dirname, './**/*.vue'),
          path.join(__dirname, './src/**/*.js')
        ])
      })
    ]
  }
};