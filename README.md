#  generator-enjoy-vue

这是一个帮助你快速地创建一个Vue.js APP的脚手架，采用[webpack](http://webpack.github.io/docs/)作为打包工具，在vue-cli初始化的项目的基础上做了大量二次开发，可通过它你可以启动一个单页面应用，也可以启动一个多页面应用，也就是说是支持混合单页和多页开发的。

另外，本脚手架内部集成了对filter、directive、util的打包，而且无需你手动import你所添加的filter、directive、util。

## 安装

``` bash
npm i -g generator-enjoy-vue
```

## 使用

```
yo enjoy-rollup
```

本内部集成了对directive、util、filter的打包，而且你无需手动import。

如果你需要增加一个filter，只需要在filters文件夹下添加一个以你所需要增加的filter命名的文件夹，并在内部创建filter.js文件即可。在组件内部，你可以通过this.$filter.<filter name>即可访问该filter。对于directive、util也做了同样的处理。使用方法以此类推。

脚手架自带一些常用的工具方法（见utils目录下），你可以在vue实例中通过this.$utils.<util name>拿到这些方法。

对于本脚手架所生成的项目的具体配置和运行等的说明，详见所生成项目的README.md文件，这里不再赘述。