var path = require('path');
var utils = require('./utils');
var webpack = require('webpack');
var config = require('../config');
var dllCfg = config.build.dll;
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglifyJsParallelPlugin = require('webpack-uglify-parallel'); // 并行uglify
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var os = require('os');

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env;

console.log(
  'filepath: ',path.resolve(dllCfg.basePath, dllCfg.fileName),
  'outputPath:', path.posix.join(dllCfg.outputPath),
  'publicPath:', path.posix.join(dllCfg.publicPath),
  'includeSourcemap:', config.dev.cssSourceMap
);

var plugins = [
  // http://vuejs.github.io/vue-loader/en/workflow/production.html
  new webpack.DefinePlugin({
    'process.env': env
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

  // new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     warnings: false,
  //     drop_console: true,
  //     drop_debugger: true
  //   },
  //   sourceMap: true
  // }),

  new UglifyJsParallelPlugin({
    workers: os.cpus().length,
    mangle: true,
    compressor: config.build.compressor,
    sourceMap: config.build.productionSourceMap
  }),

  new webpack.optimize.OccurrenceOrderPlugin(),

  // extract css into its own file
  new ExtractTextPlugin({
    filename: utils.assetsPath('css/[name].[contenthash].css')
  }),
  // Compress extracted CSS. We are using this plugin so that possible
  // duplicated CSS from different components can be deduped.
  new OptimizeCSSPlugin({
    cssProcessorOptions: {
      safe: true
    }
  }),

  // webpack dllplugin
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require(  path.resolve(dllCfg.basePath, dllCfg.manifestFileName) ),
  }),

  // generate dist index.html with correct asset hash for caching.
  // you can customize output by editing /index.html
  // see https://github.com/ampedandwired/html-webpack-plugin
  // new HtmlWebpackPlugin({
  //   filename: process.env.NODE_ENV === 'testing'
  //     ? 'index.html'
  //     : config.build.index,
  //   template: 'index.html',
  //   inject: true,
  //   minify: {
  //     removeComments: true,
  //     collapseWhitespace: true,
  //     removeAttributeQuotes: true
  //     // more options:
  //     // https://github.com/kangax/html-minifier#options-quick-reference
  //   },
  //   chunks: Object.keys(config.pageEntries),
  //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
  //   chunksSortMode: 'dependency'
  // }),

  // new AddAssetHtmlPlugin([{
  //   filepath: path.resolve(dllCfg.basePath, dllCfg.fileName),
  //   outputPath: path.posix.join(dllCfg.outputPath),
  //   publicPath: path.posix.join(dllCfg.publicPath),
  //   includeSourcemap: config.dev.cssSourceMap
  // }]),

  // copy custom static assets
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../src/assets'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*']
    }
  ])
];

Object.keys(config.pageEntries).map((item) => {
  /**
   * 将抽取好的js和css公用文件插入到html页面中
   */
    // https://github.com/ampedandwired/html-webpack-plugin
  var htmlPlugin = new HtmlWebpackPlugin({
    filename: `${config.build.assetsSubDirectory}\/html\/${item}.html`,
    template: path.resolve(config.alias.pages, `./${item}/page.html`),
    chunks: ['vendor', 'manifest', item], //指定包含哪些chunk(含JS和CSS)，不指定的话，它会包含打包后输出的所有chunk
    hash: false, // 为静态资源生成hash值
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    }
  });

  plugins.push(htmlPlugin);
});

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: plugins
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
