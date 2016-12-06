var webpack = require('webpack')
var merge = require('webpack-merge')
var path = require('path');
var baseWebpackConfig = require('./webpack.config.base.js')
var glob = require('glob')
var utils = require('./utils.js');
var entries = getEntry(path.join(__dirname,'../assets/js/**/**/*.js'));
var pages = getEntry(path.join(__dirname,'../assets/js/**/**/*.html'));
var utils = require('./utils')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var plugins = [];
Object.keys(pages).forEach(function (pathname) {
  var conf = {
    filename: pathname + '.html',
    template: pages[pathname],   // 模板路径
    inject: true,          
  }
  if (pathname in entries) {
    conf.chunks = [pathname];
    conf.hash = true;
  }
  plugins.push(new HtmlWebpackPlugin(conf))
})
// add hot-reload related code to entry chunks
Object.keys(entries).forEach(function (name) {
  entries[name] = ['./build/dev-client'].concat(entries[name])
})
plugins.push(new webpack.optimize.OccurenceOrderPlugin())
plugins.push(new webpack.HotModuleReplacementPlugin())
plugins.push(new webpack.NoErrorsPlugin())
baseWebpackConfig.module.loaders.push({
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          publicPath:'/',
          name: 'static/images/[name].[hash:7].[ext]'
        }
      })
baseWebpackConfig.module.loaders.push({
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        loader: 'file-loader',
        query: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]',
          prefix:'font'
        }
      })
module.exports = merge(baseWebpackConfig, {
  // eval-source-map is faster for development
  entry:entries,
  module: {
    loaders: utils.styleLoaders({ sourceMap: false })
  },
  plugins:plugins,
  devtool: '#eval-source-map',
})
function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
    entries[pathname] = entry;
  });
  return entries;
}