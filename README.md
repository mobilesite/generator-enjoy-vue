# generator-enjoy-vue

这是一个帮助你快速地创建一个Vue.js HTML5 APP，支持单页面和多页面应用开发，高度集成的脚手架，一个[Yeoman](http://yeoman.io/)生成器（generator）。

由于官方的vue-cli所初始化的项目是非常基础的，适合高度定制，但要想在此基础上快速开始业务开发，还需要做大量的二次开发和配置工作，不能满足业务上有时需要快速启动一个新项目的需求。正是基于此，有了本项目的诞生。

通过本脚手架，你可以启动一个单页面应用，也可以启动一个多页面应用（注：多页面应用在部署时，在单页面应用的基础上，还需要在Nginx服务器上对路径进行单独的配置），也就是说是支持混合单页和多页开发的。

另外，本脚手架内部集成了对filter（过滤器）、directive（指令）、util（工具方法）的自动打包，而且无需你手动去`import`你所添加的filter、directive、util。

## 一、技术选型

本项目所采用的技术选型如下：

（1）打包工具：

Webpack 2.3.3

在打包方面，除了支持热加载之外，还采用了webpack.DllPlugin和happypack等技术对打包速度进行了优化。

（2）项目框架：

Vue.js 2.5.2，同时集成了 vue-router（3.0.1）、vuex（3.0.1）、vue-axios（2.0.2）这些常用的Vue.js配件。

由于基于Vue.js的开发方式在DOM操作上的量相比传统开发方式大为减少，同时也为了是项目更轻量，所以目前并没有自动集成Zepto.js这样的DOM操作库，如果你的项目中有需要用到，可以自己集成一个进去。

（3）代码检查和代码风格

在代码检查上采用了Eslint工具，代码风格选择上的是以[standard](https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style)风格为蓝本做了简单的扩展。不过，考虑到项目开发的速度，默认并没有开启Eslint检查的功能。如果你的项目需要该功能，只需在.eslintignore中做简单的配置即可启用。

## 二、安装

首先，你需要确保安装过[node.js](https://nodejs.org/zh-cn/)和[Yeoman](http://yeoman.io/)。

然后运行如下命令安装本脚手架：

```bash
npm i -g generator-enjoy-vue
```

## 三、使用

### 3.1 如何用本脚手架工具初始化一个项目？

####（1）项目初始化

```bash
yo enjoy-vue
```

然后按照提示依次输入如下各项信息：

    ? Project name (abc): test

    ? Project version (1.0.0): 1.0.0

    ? Project description: A new project

    ? Project Main file (src/pages/index/app.js): src/pages/index/app.js

    ? Author Name(xxx): xxx

    ? Author Email(xxx@xxx.xxx): xxx@xxx.xxx

    ? License: MIT

    ? Host of your pages: m.test.com

    ? Host of your static resources: static.test.com

    ? Host of the backend APIs: api.test.com

其中：

Project Main file 是指定项目的入口文件，一般情况下选择默认即可；

Host of your pages 是前端页面所用的域名；

Host of your static resources 是静态资源的域名；

Host of the backend APIs 是后端接口域名。

待终端中命令执行完成，控制台中没有报错，你将看到“Generator-enjoy-env has inited a project for you!”的提示，说明你已经完成了一个项目的初始化，同时安装好了项目的内部依赖。

#### (2) 项目目录结构

项目的目录结构如下：

```
ProjectName
├─.babelrc
├─.editorconfig
├─.eslintignore
├─.eslintrc.js
├─.gitignore
├─.postcssrc.js
├─README.md
├─package-lock.json
├─package.json
├─reset.sh                                          # 重置文件权限相关命令行
├─test                                              # 测试相关路径
├─static
|   ├─js                                            # 打包后JavaScript的路径
|   | ├─0.8136defef1c930b990c9.js
|   | ├─1.6756976dea0137c13db1.js
|   | ├─2.02e7c2337f04569139ad.js
|   | ├─3.cbffd8d7517ddfc536a0.js
|   | ├─4.700678fda52f36013c10.js
|   | ├─5.d17d459f26f657d9e238.js
|   | ├─index.dfef3f6596e9d39c624b.js
|   | ├─manifest.576879fffd5036d0b6a9.js
|   | ├─vendor.82a7d8c39a2c9526e9e4.js
|   | ├─dll
|   |    └libs.js
|   ├─images                                        # 打包后图片的路径
|   |   └test-icon-logo.481ecab.png
|   ├─icons                                         # 打包后icon的路径
|   |   ├─icon-logo.png
|   |   └test-icon-logo.png
|   ├─html                                          # 打包后HTML页面的路径
|   |  └index.html
|   ├─css                                           # 打包后CSS文件的路径
|      └index.ee87280b9012d7b9a98fdc8330704b3e.css
├─src                                               # 项目源码目录
   ├─utils                                          # 工具方法
   |   ├─main.js
   |   ├─verify
   |   |   └util.js
   |   ├─url
   |   |  └util.js
   |   ├─throttle
   |   |    └util.js
   |   ├─storage
   |   |    └util.js
   |   ├─raf
   |   |  └util.js
   |   ├─objectExt
   |   |     └util.js
   |   ├─isType
   |   |   └util.js
   |   ├─filterChars
   |   |      └util.js
   |   ├─evt
   |   |  └util.js
   |   ├─env
   |   |  └util.js
   |   ├─dom
   |   |  └util.js
   |   ├─cookie
   |   |   └util.js
   |   ├─arrayExt
   |   |    └util.js
   ├─styles                                        # 通用UI样式目录
   |   ├─enjoy-ui
   |   |    ├─main.less
   |   |    ├─variables
   |   |    ├─reset
   |   |    |   └main.less
   |   |    ├─mixins
   |   |    ├─iconfont
   ├─server                                        # 如果需要用到JSONP，可以把这个目录下的jsonp文件import到你的项目文件中
   |   └jsonp.js
   ├─plugins                                       # Vue插件目录
   |    ├─vue-extension.js
   |    └vue-toast.js
   ├─pages                                         # 项目中的页面
   |   ├─index
   |       ├─Page.vue
   |       ├─main.js
   |       ├─page.html
   |       ├─store
   |       |   ├─actions.js
   |       |   ├─getters.js
   |       |   ├─index.js
   |       |   └mutation-types.js
   |       ├─router
   |       |   └index.js
   |       ├─mock
   |           └test.js
   ├─globalVars                                    # 项目的全局变量
   |     └index.js
   ├─filters                                       # Vue过滤器目录
   |    ├─main.js
   |    ├─datetime
   |         └filter.js
   ├─directives                                    # Vue指令目录
   |     ├─main.js
   |     ├─lazyload
   |          └directive.js
   ├─commonComponents                              # Vue通用组建目录
   |        ├─Toast
   |        |   └main.vue
   |        ├─Tab
   |        |  └main.vue
   |        ├─Modal
   |        |   └main.vue
   |        ├─Loading
   |        |    └main.vue
   |        ├─FooterNav
   |        |     └main.vue
   ├─businessComponents                            # Vue非通用组件目录
   |         ├─NotFound
   |         |    └main.vue
   |         ├─Help
   |            ├─Main.vue
   |            ├─Tab1.vue
   |            └Tab2.vue
   ├─assets
   |   ├─icons                                     # 项目icon目录
   |   |   ├─icon-logo.png
   |   |    └test-icon-logo.png
   |   ├─images                                    # 项目图片目录
   ├─apis                                          # 项目API目录，所有的接口均配置在此文件中
      └main.js
```

### 3.2 项目初始化之后，如何让项目跑起来？

#### （1）安装依赖：

```bash
npm i -g cross-env karma webpack anywhere
```

#### （2）开发调试

支持热加载的调试：

```bash
anywhere -p 9090
npm run dll-dev
```

值得注意的是，这里需要进行hosts的配置：

```
127.0.0.1 <Host of your pages>                  # 项目前端页面域名
127.0.0.1 <Host of your static resources>       # 项目静态资源域名
xxx.xxx.xxx.xxx <Host of the backend APIs>      # 项目后端接口IP及域名
```

访问地址：

[`http://<Host of your pages>`](`http://<Host of your pages>/`) 或者 [`https://<Host of your pages>`](`https://<Host of your pages>/`)

上面形如`<Host of your pages>`的部分需替换成你自己项目的相应信息。
#### （3）进行测试（若需要）

```bash
#run unit or e2e tests (ignore it, of no use now)
sudo npm run unit
sudo run e2e tests
#or 
npm test
```

### 3.3 如何添加一个页面？

这里指的添加一个页面，是指打包后多一个html文件，而不是一个view。如果你构建的是一个单页面应用，那么无需再添加页面，用默认的即可。只有当你想构建一个多页面应用的时候，才会需要添加页面。具体方法如下：

在/src/pages目录下，新建一个以你的页面名称命名的文件夹，在其中新建main.js、page.html和Page.vue等文件，文件夹内的文件可以从/src/pages/index中拷贝过来。

### 3.4 如何添加和删除一个filter（过滤器）、directive（指令）、util（工具方法）？

本脚手架内部集成了对filter（过滤器）、directive（指令）、util（工具方法，主要是各种常用的JavaScript工具函数）的自动打包，无需你手动去`import`你所添加的filter、directive、util，只需要遵循一定的命名以下命名规则添加到指定目录即可：

添加和删除filter（过滤器），在生成的项目的/src/filters目录下新建一个以该filter的名称命名的文件夹，然后在里面新建一个filter.js文件即可，filter.js文件编写格式参见/src/filters这个目录所提供的现有filter，如果你的新项目中并不需要现有的某个filter，你可以将该filter的文件夹整个删除掉。

添加和删除directive（指令），在生成的项目的/src/directives目录下新建一个以该directive的名称命名的文件夹，然后在里面新建一个directive.js文件即可，directive.js文件编写格式参见/src/directives这个目录所提供的现有directive，如果你的新项目中并不需要某个directive，你可以将该directive的文件夹整个删除掉。

添加和删除util（工具方法），在生成的项目的/src/utils目录下新建一个以该util的名称命名的文件夹，然后在里面新建一个util.js文件即可，util.js文件编写格式参见/src/utils这个目录所提供的现有util，如果你的新项目中并不需要某个util，你可以将该util的文件夹整个删除掉。

### 3.5 如何使用这些filter（过滤器）、directive（指令）、util（工具方法）？

这些filter（过滤器）、directive（指令）、util（工具方法）都挂载到了Vue和Vue的实例上，在组件中，中你可以通过`this.$filters.<filter name>`、`this.$directives.<directive name>`、`this.$utils.<util name>`获取到它们。

### 3.6 如何添加和删除一个Vue组件？

项目中有两个目录是用来放置Vue组件的，/src/commonComponents 和 /src/businessComponents，前者用来放置可复用性较高的组件（通常是一些可以跨业务复用的组件），后者用来放置可复用性较低的组件（与业务有耦合的组件）。

### 3.7 如何进行项目打包和打包后的预览？
#### （1）执行打包

先在`anywhere -p 9090`和`npm run dll-dev`这两个命令正在执行的终端中按`control + c`键终止它们的执行，然后执行如下命令：

```bash
npm run dll-build
```

注：`npm run dll-dev`会打包到/dll/dev/下，而`npm run dll-build`会打包到/dll/prod/下，分别对应的是开发和build过程中文件。/dll/目录只是一个过度性的目录，并非最终线上引用公共库打包文件的目录。

#### （2）Nginx的配置

在预览打包时，需要先关闭掉开发阶段对于host的配置，然后对Nginx进行如下配置：

通过Nginx配置两个地址，<Host of your pages>指向html目录，<Host of your static resources>指向附属的静态资源（static目录）。

考虑到有的站点需要支持https，而有的则仅需支持http即可，所以配了http和https两套服务器的反向代理。

下面是Nginx配置代码片段：

```
# http server
server {
    listen       80;
    server_name  <Host of your pages>;

    location / {
        root   <Local root path of your project>/static/html/;
        try_files $uri $uri/ /index.html;
    }
}

server {
    listen       80;
    server_name  <Host of your static resources>;

    location / {
        root   <Local root path of your project>/static/;
        index  index.html;
    }
}

# https server
server {
    listen       443 ssl;
    server_name  <Host of your pages>;

    ssl_certificate      server.crt;
    ssl_certificate_key  server.key;

    location / {
        root   <Local root path of your project>/static/html/;
        try_files $uri $uri/ /index.html;
        index  index.html index.htm;
    }
}

server {
    listen       443 ssl;
    server_name  <Host of your static resources>;

    ssl_certificate      server.crt;
    ssl_certificate_key  server.key;

    location / {
        root   <Local root path of your project>/static/;
        index  index.html;
    }
}
```

上述形如`<Host of your static resources>`内的部分需要替换成为你自己的相关信息。其中`<Local root path of your project>`是指你的本地项目根目录。

### 3.8 字体图标的使用

默认项目是集成了字体图标的，字体图标在高清屏幕下锐度更清晰，而且更方便变换颜色。如果你的项目中不想用它，可以在/src/styles/enjoy-ui/main.less中将`@import "./iconfont/main.less";`注释掉。

## 四、参与完善本项目

可以fork出来一份，检出一个分支，添加完成后[Pull Request](https://www.zhihu.com/question/21682976)。

对于通用性强的filter、directive、util 和 公用的Vue component都可以补充上去。目前这几个方面还比较欠缺。

注意：组件内抛出的事件请以组件名加短连接线作为前缀（比如，我有一个Tab组件，那么其中抛出的事件就以tab-作为前缀）。

## 五、常见问题处理

#### 5.1 Error: EACCES: permission denied, open 'xxxxxxxxx'错误的处理

执行`npm run dll-dev`或者`npm run dll-build`命令时，有时可能会遇到如下错误

Error: EACCES: permission denied, open 'xxxxxxxxx'

这时可能是打包时出现了文件权限问题，通常执行`bash reset.sh`命令即可，这个命令行里面会自动帮你重置相关文件的权限。

#### 5.2 在热重载（hotreload）的情况下，添加一个文件或文件夹后，控制台报找不到相应的模块

在热重载（hotreload）的情况下，添加一个文件或文件夹后，需要先结束`npm run dll-dev`的运行，再重新执行`npm run dll-dev`，以检测到文件的变更。这一点与vue-cli生成的项目是一样的。