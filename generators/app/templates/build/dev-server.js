// 检查node和npm的版本是否符合package.json中的配置要求
require('./check-versions')();

var config = require('../config');
// 如果 Node 的环境无法判断当前是 dev / product 环境
// 使用 config.dev.env.NODE_ENV 作为当前的环境
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV); // 读取config目录下配置的NODE_ENV
}

// Opens stuff like websites, files, executables. Cross-platform.  https://www.npmjs.com/package/opn
var opn = require('opn');
var path = require('path');
// https://www.npmjs.com/package/express
var express = require('express');
var webpack = require('webpack');

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync('./httpscertificate/private.pem', 'utf8');
var certificate = fs.readFileSync('./httpscertificate/file.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };

// https://www.npmjs.com/package/http-proxy-middleware
// app.use('/api', proxy({target: 'http://www.example.org', changeOrigin: true}));
// http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar
var proxyMiddleware = require('http-proxy-middleware');

// 测试环境，使用的配置与生产环境的配置一样
// 非测试环境，即为开发环境，因为此文件只有测试环境和开发环境使用
var webpackConfig =
    process.env.NODE_ENV === 'testing'
        ? require('./webpack.prod.conf')
        : require('./webpack.dev.conf');

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port;

// 是否自动打开浏览器 automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser;

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// 读入config目录下的proxyTable配置
var proxyTable = config.dev.proxyTable;

var app = express();

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
httpServer.listen(port, function() {
    console.log('HTTP Server is running on: http://localhost:%s', port);
});

let httpsPort = 443;
httpsServer.listen(httpsPort, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', httpsPort);
});

var compiler = webpack(webpackConfig);

/**
 * webpack-dev-middleware
 *
 * 这个中间件只能在开发环境中使用！！！它处理时，没有文件写入硬盘，而是写在内存中
 *
 * It's a simple wrapper middleware for webpack. It serves the files emitted from webpack over a connect server. This should be used for development only.
 It has a few advantages over bundling it as files:
 No files are written to disk, it handle the files in memory
 If files changed in watch mode, the middleware no longer serves the old bundle, but delays requests until the compiling has finished. You don't have to wait before refreshing the page after a file modification.
 I may add some specific optimization in future releases.
 * @param compiler - a webpack compiler
 * @param options - 配置选项
 */
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    // public path to bind the middleware to
    // use the same as in webpack
    // 必填
    publicPath: webpackConfig.output.publicPath,
    quiet: true // 为true时将不展示打包时的一些详细信息，使得终端更加简洁
    // // display no info to console (only warnings and errors)
    // noInfo: false,
    // // switch into lazy mode
    // // that means no watching, but recompilation on every request
    // lazy: true,
    // // watch options (only lazy: false)
    // watchOptions: {
    //   aggregateTimeout: 300,
    //   poll: true
    // },
    // the index path for web server
    // index: 'index.html',
    //
    // // custom headers
    // headers: { 'X-Custom-Header': 'yes' },
    //
    // // options for formating the statistics
    // stats: {
    //   colors: true
    // },
    //
    // // Provide a custom reporter to change the way how logs are shown.
    // reporter: null,
    //
    // // Turn off the server-side rendering mode. See Server-Side Rendering part for more info.
    // serverSideRender: false,
});

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    heartbeat: 2000
});

// force page reload when html-webpack-plugin template changes
// 页面自动刷新的入口
compiler.plugin('compilation', function(compilation) {
    //To allow other plugins to alter the HTML the html-webpack-plugin executes the following events:
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        // 发布reload事件，订阅在devclient.js里面
        hotMiddleware.publish({ action: 'reload' });
        cb();
    });
});

// 将 proxyTable 中的请求配置挂在到启动的 express 服务上
// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context];
    // 如果 options 的数据类型为 string，则表示只设置了 url，
    // 所以需要将url设置为对象中的 target 的值
    if (typeof options === 'string') {
        options = { target: options };
    }
    app.use(proxyMiddleware(options.filter || context, options));
});

// 使用 connect-history-api-fallback 可以匹配资源，进行重定向等
// 例如：
// {
//  rewrites: [
//    {
//      from: /^\/libs\/.*$/,
//      to: function(context) {
//        return '/bower_components' + context.parsedUrl.pathname;
//      }
// }
//  ]
// }
// https://github.com/bripkens/connect-history-api-fallback
// handle fallback for HTML5 history API
app.use(
    require('connect-history-api-fallback')({
        index: '/index.html', //覆盖默认的首页设置，默认是/index.html
        rewrites: [
            {
                from: /\/help$/,
                to: '/help.html'
            }
        ],
        verbose: false //为true时将会输出日志
    })
);

// 将暂存到内存中的 webpack 打包后的文件挂在到 express 服务上
// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
var staticPath = path.posix.join(
    config.dev.assetsPublicPath,
    config.dev.assetsSubDirectory
);
//console.log('>>>>>>>>>>\n staticPath:', staticPath);

// 对于访问config.dev.assetsPublicPath/config.dev.assetsSubDirectory(如/static)下的内容，都执行express.static('./static')。大意：请求文件包含/static的时候，才从./static下面提供静态文件服务
// express.static(root, [options])
// The root argument refers to the root directory from which the static assets are to be served
// Mount the middleware at “/static” to serve static content only when their request path is prefixed with “/static”:
app.use(staticPath, express.static('./static'));

var uri = 'http://localhost:' + port;

var _resolve;
var readyPromise = new Promise(resolve => {
    _resolve = resolve;
});

console.log('>>>>>>>>>>\n Starting dev server...');

// 打包成功后进行提示信息输出和启动浏览器等操作
// waitUntilValid(callback) - executes the callback if the bundle is valid or after it is valid again
// https://www.npmjs.com/package/webpack-dev-middleware
devMiddleware.waitUntilValid(() => {
    console.log('>>>>>>>>>>\n Listening at ' + uri + '\n');
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        //自动从浏览器打开服务器地址
        opn(uri);
    }
    _resolve();
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
// var server = app.listen(port);

module.exports = {
    // 抛出promise
    ready: readyPromise,
    // 抛出关闭服务器方法
    close: () => {
        httpServer.close();
        httpsServer.close();
    }
};
