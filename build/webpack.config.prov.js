var webpack = require('webpack')
var path = require('path')
var merge = require('webpack-merge')
var glob = require('glob')
var utils = require('./utils.js')
var baseWebpackConfig = require('./webpack.config.base.js')
var moduleName= process.argv[2]
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var entries = getEntry(path.join(__dirname,'../assets/js/'+moduleName+'/**/*.js'));
var pages = getEntry(path.join(__dirname,'../assets/js/'+moduleName+'/**/*.html'));
var HtmlWebpackPlugin = require('html-webpack-plugin')
var plugins = [];
Object.keys(pages).forEach(function (pathname) {
  var conf = {
    filename: './static/'+moduleName +'/' +pathname + '.html',
    template: pages[pathname],   // 模板路径
    inject: true,          
  }
  if (pathname in entries) {
    conf.chunks = [pathname];
    conf.hash = true;
  }
  plugins.push(new HtmlWebpackPlugin(conf))
})    
// extract css into its own file

plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }))
plugins.push(new webpack.optimize.OccurenceOrderPlugin())
plugins.push(new ExtractTextPlugin('static/'+moduleName+'/css/[name].[contenthash].css'))
// plugins.push(new webpack.optimize.CommonsChunkPlugin({
//       name: 'vendor',
//       minChunks: function (module, count) {
//         // any required modules inside node_modules are extracted to vendor
//         return (
//           module.resource &&
//           /\.js$/.test(module.resource) &&
//           module.resource.indexOf(
//             path.join(__dirname, '../node_modules')
//           ) === 0
//         )
//       }
//     }))
// plugins.push(new webpack.optimize.CommonsChunkPlugin({
//       name: 'manifest',
//       chunks: ['vendor']
//     }))
baseWebpackConfig.module.loaders.push({
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          publicPath:'/',
          name: '/static/pdfTemplate/'+moduleName+'/images/[name].[hash:7].[ext]'
        }
      })
baseWebpackConfig.module.loaders.push({
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/'+moduleName+'fonts/[name].[hash:7].[ext]'
        }
      })
module.exports = merge(baseWebpackConfig, {
  // eval-source-map is faster for development
  entry:entries,
  module: {
    loaders: utils.styleLoaders({ sourceMap: false, extract: true })
  },
  plugins:plugins,
 	devtool: false,
	output: {
    path: path.join(__dirname, '../dist'),
    filename: 'static/'+moduleName+'/js/[name].[chunkhash].js',
    chunkFilename: 'static/'+moduleName+'/js/[id].[chunkhash].js'
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: false,
      extract: true
    })
  },
})
function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    pathname =  basename; // 正确输出js和html的路径
    entries[pathname] = entry;
  });
  return entries;
}