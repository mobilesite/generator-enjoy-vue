var utils = require('./utils');
var config = require('../config');
var isProduction = process.env.NODE_ENV === 'production';

/**
 * 调用uitl里面的loader生成方法来生成loaders配置文件
 */
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  //??
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
