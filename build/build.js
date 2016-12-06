var path = require('path')
var webpack = require('webpack')
process.env.NODE_ENV = 'production'
var webpackConfig = require('./webpack.config.prov.js')
require('shelljs/global')

var ora = require('ora')

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(__dirname, '../dist/static');
rm('-rf', path.join(__dirname, '../dist/static/',process.argv[2]))
mkdir('-p', path.join(__dirname, '../dist/static/',process.argv[2]))
// cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})

