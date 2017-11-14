require('./check-versions')();

process.env.NODE_ENV = 'production';

var ora = require('ora');
var rm = require('rimraf'); // The UNIX command rm -rf for node.
var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var config = require('../config');
var webpackConfig = require('./webpack.prod.conf');

var spinner = ora('building for production...');
spinner.start();

// console.log('>>>>>>>>>>\n webpack.prod.conf.js文件的内容', JSON.stringify(webpackConfig));

// 先清空打包输出目录，再进行打包
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err;

  //调用webpack打包的入口
  webpack(webpackConfig, function (err, stats) {
    spinner.stop();
    if (err) throw err;

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ));
  })
})
