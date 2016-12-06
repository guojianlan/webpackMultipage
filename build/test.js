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
console.log(pages);
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