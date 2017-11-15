var path = require('path');
var fs = require('fs');
var os = require('os');
var webpack = require('webpack');
var ProgressBarPlugin = require('progress-bar-webpack-plugin'); //显示打包进度条
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

var utils = require('./utils');
var isDebug = process.env.NODE_ENV === 'development';
console.log('>>>>>>>>>>\n node env is development:', isDebug);
var config = require('../config/index');
var dllCfg = isDebug ? config.dev.dll : config.build.dll;
var vueLoaderConfig = require('./vue-loader.conf');

var entries = Object.assign(
    {},
    config.pageEntries,
    config.commonLibDependencies
);

var filterEntries = config.filterEntries; // 所有过滤器的入口文件
var directiveEntries = config.directiveEntries; // 所有指令的入口文件
var utilEntries = config.utilEntries; // 所有指令的入口文件

console.log('>>>>>>>>>>\n entries:', entries);
// console.log('>>>>>>>>>>\n pageEntries:', pageEntries);
// console.log('>>>>>>>>>>\n filterEntries:', filterEntries);
// console.log('>>>>>>>>>>\n utilEntries:', utilEntries);

(function() {
    /**
   * 自动生成src/filters/main.js文件，避免添加了filter时烦人的手工配置与引入
   * 自动生成src/directives/main.js文件，避免添加了directive时烦人的手工配置与引入
   * 自动生成src/utils/main.js文件，避免添加了util时烦人的手工配置与引入
   */
    var types = [
        {
            name: 'util',
            entries: utilEntries
        },
        {
            name: 'filter',
            entries: filterEntries
        },
        {
            name: 'directive',
            entries: directiveEntries
        }
    ];
    types.map(function(type) {
        var lineEnd = '\n'; // 换行符
        var entryFileContent = [];
        var temp = {
            importContent: [],
            registerContent: [],
            exportContent: []
        };

        Object.keys(type.entries).map(key => {
            var fileName = type.entries[key]
                .replace(/\//g, '/')
                .replace(/\\/g, '\\\\'); // 对路径进行转义
            var camelCaseKey = key.replace(/-([a-z])?/g, function(all, letter) {
                return letter.toUpperCase();
            });
            if (type.name !== 'util') {
                temp.importContent.push(
                    `import ${camelCaseKey} from '../../${fileName}';`
                );
                temp.registerContent.push(
                    `Vue.${type.name}('${camelCaseKey}', ${camelCaseKey});`
                );
            } else {
                temp.importContent.push(
                    `import {${camelCaseKey}} from '../../${fileName}';`
                );
            }
            temp.exportContent.push(`${camelCaseKey},`);
        });

        if (type.name !== 'util') {
            entryFileContent.push('import Vue from \'vue\';');
            entryFileContent.push(temp.importContent.join(lineEnd));
            entryFileContent.push(temp.registerContent.join(lineEnd));
        } else {
            entryFileContent.push(temp.importContent.join(lineEnd));
        }

        entryFileContent.push('export default {');
        entryFileContent.push(temp.exportContent.join(lineEnd));
        entryFileContent.push('};');

        fs.writeFile(
            utils.joinPath(config.alias[`${type.name}s`], 'main.js'),
            entryFileContent.join(lineEnd),
            function(err) {
                if (err) throw err;
                console.log(
                    `>>>>>>>>>>\n 自动生成文件：src\/${type.name}s\/main.js is saved!`
                );
            }
        );
    });
})();

module.exports = {
    entry: entries,
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath:
            process.env.NODE_ENV === 'production'
                ? config.build.assetsPublicPath
                : config.dev.assetsPublicPath,
        /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendor_library`
     */
        library: '[name]',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            // todo 这个地方待配置
            vue$: 'vue/dist/vue.esm.js',
            '@': utils.joinPath('src')
        }
    },
    module: {
        rules: [
            // {
            //   test: /\.(js|vue)$/,
            //   loader: 'eslint-loader',
            //   enforce: 'pre',
            //   include: [utils.joinPath('src'), utils.joinPath('test')], // todo 修改路径
            //   options: {
            //     formatter: require('eslint-friendly-formatter')
            //   }
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                // loader: 'babel-loader',
                loader: 'happypack/loader?id=happybabel',
                include: [utils.joinPath('src'), utils.joinPath('test')] // todo 修改路径
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('images/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new HappyPack({
            id: 'happybabel',
            loaders: ['babel-loader'],
            threadPool: happyThreadPool,
            cache: true,
            verbose: true
        }),
        // webpack dllplugin
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(path.resolve(
                dllCfg.basePath,
                dllCfg.manifestFileName
            ))
        }),

        new AddAssetHtmlPlugin([
            {
                filepath: path.resolve(dllCfg.basePath, dllCfg.fileName),
                outputPath: path.posix.join(dllCfg.outputPath),
                publicPath: dllCfg.publicPath,
                includeSourcemap: config.dev.cssSourceMap
            }
        ])

        // new webpack.ProvidePlugin({
        //   $: 'zepto',
        //   Zepto: 'zepto',
        //   'window.zepto': 'zepto',
        //   'window.$': 'zepto'
        // })
    ]
};
