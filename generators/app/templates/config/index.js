// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
var glob = require('glob');

var exportObj;

function joinPath(currentDir, subDir) {
    if (arguments.length > 1) {
        return path.join(currentDir, subDir);
    } else {
        return path.join(__dirname, '..', currentDir);
    }
}

exportObj = {
    dev: {
        env: require('./dev.env'),
        port: 80,
        autoOpenBrowser: false,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            // todo 待配置
            '/dll/libs.js': {
                target: 'http://localhost:9090',
                changeOrigin: true,
                pathRewrite: {
                    '^/dll/': 'dll/dev/'
                }
            }
            // ,
            // '/api': {
            //   target: 'http://localhost:8545/',
            //   changeOrigin: true,
            //   pathRewrite: {
            //     '^/api': ''
            //   }
            // }
        },
        // CSS Sourcemaps off by default because relative paths are 'buggy'
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false, // css source map
        dll: {
            basePath: path.resolve(__dirname, '../dll/dev'), //执行NODE_ENV=development webpack --config  build/webpack.dll.conf.js --progress时的输出目录
            fileName: 'libs.js',
            manifestFileName: 'manifest.json',
            outputPath: '/dll/', // 生成目录，是相对于assetsSubDirectory的目录
            publicPath: '../../dll/' // 注入地址，是相对于assetsSubDirectory的目录
        }
    },
    build: {
        env: require('./prod.env'), // NODE_ENV
        index: path.resolve(__dirname, '../static/html/index.html'), // index page
        assetsRoot: path.resolve(__dirname, '../static'), // assets root path
        assetsSubDirectory: './', // assets directory
        assetsPublicPath: '//<%= projectStaticHost %>/', // assets public path
        productionSourceMap: false, // 是否生成source map
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        compressor: {
            warnings: false,
            drop_console: true,
            drop_debugger: true
        },
        productionGzip: false, // 是否开启Gzip
        productionGzipExtensions: ['js', 'css'], // Gzip后缀名
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report, // ??process.env.npm_config_report获取的是--report参数吗

        dll: {
            basePath: path.resolve(__dirname, '../dll/prod'), //执行NODE_ENV=production webpack --config  build/webpack.dll.conf.js --progress时的输出目录
            fileName: 'libs.js',
            manifestFileName: 'manifest.json',
            outputPath: '/js/dll/', // 生成目录，是相对于assetsSubDirectory的目录
            publicPath: '//<%= projectStaticHost %>/js/dll/' // 注入地址，是相对于assetsSubDirectory的目录
        }
    },
    // 公共库的依赖配置
    commonLibDependencies: require('./common-lib-dependencies'),
    dllAlias: {
        // todo 这个地方待配置
        vue$: 'vue/dist/vue.esm.js',
        '@': joinPath('src'),
        '@busi': joinPath('src/businessComponents'),
        '@com': joinPath('src/commonComponents')
    },
    alias: {
        pages: joinPath('src/pages'),
        utils: 'src/utils',
        filters: 'src/filters',
        directives: 'src/directives'
    },
    postcssConfigPath: path.resolve(__dirname, './postcss.config.js')
    // ,
    // pageEntries: {
    //   app: './src/main.js'
    // }
};

var globArr = [
    {
        name: 'page',
        filename: 'main'
    },
    {
        name: 'util',
        filename: 'util'
    },
    {
        name: 'filter',
        filename: 'filter'
    },
    {
        name: 'directive',
        filename: 'directive'
    }
];

var filePath = [];
var globInstance = [];

globArr.forEach((item, index) => {
    filePath[item.name] = exportObj.alias[item.name + 's'];
    globInstance[item.name] = new glob.Glob('**/' + item.filename + '.js', {
        cwd: filePath[item.name],
        sync: true // 这里不能异步，只能同步
    });

    exportObj[item.name + 'Entries'] = {};

    globInstance[item.name].found.forEach(newItem => {
        // console.log('>>>>>>>>>>\n 每一种自动生成的内容的类别：', item.name, filePath[item.name])
        exportObj[item.name + 'Entries'][
            newItem.replace(new RegExp('/' + item.filename + '.js'), '')
        ] = joinPath(filePath[item.name], newItem);
    });
});

module.exports = exportObj;
