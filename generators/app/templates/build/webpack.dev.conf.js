var path = require('path');
var utils = require('./utils');
var webpack = require('webpack');
var config = require('../config');
var dllCfg = config.dev.dll;
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

var plugins = [
  new webpack.DefinePlugin({
    'process.env': config.dev.env
  }),

  // split vendor js into its own file
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module, count) {
      // any required modules inside node_modules are extracted to vendor
      return (
        module.resource &&
        /\.js$/.test(module.resource) &&
        module.resource.indexOf(
          path.join(__dirname, '../node_modules')
        ) === 0
      )
    }
  }),
  // extract webpack runtime and module manifest to its own file in order to
  // prevent vendor hash from being updated whenever app bundle is updated
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: ['vendor']
  }),

  new webpack.optimize.OccurrenceOrderPlugin(),

  // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),

  // // webpack dllplugin
  // new webpack.DllReferencePlugin({
  //   context: __dirname,
  //   manifest: require( path.resolve(dllCfg.basePath, dllCfg.manifestFileName) ),
  // }),
  //
  // new AddAssetHtmlPlugin([{
  //   filepath: path.resolve(dllCfg.basePath, dllCfg.fileName),
  //   outputPath: path.join(dllCfg.outputPath),
  //   publicPath: path.join(dllCfg.publicPath),
  //   includeSourcemap: config.dev.cssSourceMap
  // }]),

  new FriendlyErrorsPlugin()
];

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

Object.keys(config.pageEntries).map((item) => {
  /**
   * 将抽取好的js和css公用文件插入到html页面中
   */
  // https://github.com/ampedandwired/html-webpack-plugin
  console.log('>>>>>>>>>>\n 每一个页面的名称:', item);
  var htmlPlugin = new HtmlWebpackPlugin({
    filename: `${item}.html`,//若要修改在地址栏中访问的地址，则需要修改这里。比如如果想用localhost/html/xxx.html访问，则这里要写成html/${item}.html
    template: path.resolve(config.alias.pages, `./${item}/page.html`),
    chunks: ['vendor', 'manifest', item], //指定包含哪些chunk(含JS和CSS)，不指定的话，它会包含打包后输出的所有chunk
    hash: false, // 为静态资源生成hash值
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency',
    inject: true
  });

  plugins.push(htmlPlugin);
});


module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: plugins
})
