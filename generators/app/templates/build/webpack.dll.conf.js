const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var utils = require('./utils');
const webpack = require('webpack');
var config = require('../config');
const commonLibDependencies = require('../config/common-lib-dependencies');
const isDebug = process.env.NODE_ENV === 'development';

const outputPath = isDebug ? config.dev.dll.basePath : config.build.dll.basePath;

const plugin = [
  new webpack.DllPlugin({
    /**
     * path
     * 定义 manifest 文件生成的位置
     */
    path: path.join(outputPath, 'manifest.json'),
    /**
     * name
     * dll bundle 输出到那个全局变量上
     * 和 output.library 一样即可。
     * [name]的部分由entry的名字替换
     */
    name: '[name]',
    context: __dirname
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery'
  })
];

if (!isDebug) {
  plugin.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': config.build.env,
    })
  );
  plugin.push(
    new ExtractTextPlugin('[name].css') // 打包css/less的时候会用到ExtractTextPlugin
  );
  plugin.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['$', 'jQuery', 'exports', 'require']
      },
      exclude: /\.min\.js$/,
      compress: {warnings: false},
      output: {comments: false}
    })
  )
};

module.exports = {
  devtool: 'source-map',
  entry: {
    libs: commonLibDependencies
  },
  output: {
    path: outputPath,
    filename: '[name].js',
    /**
     * output.library
     * 将会定义为 window.${output.library}
     */
    library: '[name]'
  },
  resolve: {
    extensions: ['.js'],
    alias: config.dllAlias
  },
  plugins: plugin,
  module: {
    rules: [
      {
        test: /jquery(.min)?.js$/,  // 此loader配置项的目标是NPM中的jquery
        use: [
          'expose-loader?$!expose-loader?jQuery', // 先把jQuery对象声明成为全局变量`jQuery`，再通过管道进一步又声明成为全局变量`$`
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('images/[name].[hash:7].[ext]')
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      },
      /**
       * 处理css（处理之后会通过postcss进行进一步处理，这里配置了autoprefixer插件来进行处理）
       */
      {
        test: /\.css$/,
        // include: srcPath,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMaps: true,
              modules: true,
              importLoaders: 1, //??
              // localIdentName: '[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: { //这里暂时只能用query，不能用options，否则会报错：Module build failed: ModuleBuildError: Module build failed: Error: No PostCSS Config found in: h5app\src
              config: {
                path: config.postcssConfigPath
              }
            }
          }
        ],
        // exclude: excludeReg
      }
    ]
  }
};
