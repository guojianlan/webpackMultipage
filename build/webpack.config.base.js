var webpack = require('webpack');
var path = require('path');
var utils = require('./utils');
var projectRoot = path.join(__dirname,'../');
module.exports = {
	output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue',
      'assets':path.join(__dirname, '../assets')
    }
  },
  resolveLoader: {
    	fallback: [path.join(__dirname, '../node_modules')]
	},
	module:{
  	loaders:[
  		{
  			test: /\.vue$/,
  			loader:'vue'
  		},
  		{
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
  	]
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: false }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
}
