var express = require('express');
var app =express();
var config = require('config');
var ejs =require('ejs');
var path = require('path')
//webpack 配置
var webpack = require('webpack');
var webpackConfig = require('./build/webpack.config.dev.js');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    // options
    
     publicPath:'/',
		  stats: {
		    colors: true,
		    chunks: false
		  }
}));
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})
app.use(webpackHotMiddleware(compiler));
//html路由
app.set('view engine','html');
app.engine('.html',ejs.renderFile)
app.use('/views',function(req,res){
	var renderView = req.path;
	res.render(renderView.slice(1));
})
app.use('/api',function(req,res){
	res.send({
		test:123
	})
})
//
var server = app.listen(config.get('port'), () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})