#  <%= projectName %>
## 一、安装依赖：

``` bash
npm i
npm i -g cross-env
npm i -g karma
npm i -g webpack
```

## 二、开发调试

支持热加载的调试：

```
anywhere -p 9090
npm run dll-dev
```

值得注意的是，这里需要进行hosts的配置：

```
127.0.0.1 <%= projectHost %>
127.0.0.1 <%= projectStaticHost %>
```

访问地址：

[http://<%= projectHost %>](http://<%= projectHost %>/) 或者 [https://<%= projectHost %>](https://<%= projectHost %>/)

## 三、进行测试

```
#run unit or e2e tests (ignore it, of no use now)
sudo npm run unit
sudo run e2e tests
#or 
npm test
```

## 四、打包

```
npm run dll-build --report
```

配置完公共库之后，需要执行一次上述dll打包命令。

dll打包命令会将公共库打包到/dll/目录下，｀npm run dll-dev｀会打包到/dll/dev/下，而｀npm run dll-build｀会打包到/dll/prod/下，分别对应的是开发环境和生产环境。

虽然上述命令已经集成了将修改后的公共库配置打入项目各个页面的功能（详见package.json中，其中有 && sudo npm run dev 、 && sudo npm run build就是），但是需要注意的是/dll/目录只是一个过度性的目录，并非最终线上引用公共库打包文件的目录。

## 五、Nginx的配置

通过Nginx配置两个地址，<%= projectHost %>指向html目录，<%= projectStaticHost %>指向附属的静态资源（static目录）。

考虑到有的站点需要支持https，所以下面配了http和https两套服务器反向代理。

```
# http server
server {
    listen       80;
    server_name  <%= projectHost %>;

    location / {
        root   <%= projectCwd %>/static/html/;
        try_files $uri $uri/ /index.html;
    }
}

server {
    listen       80;
    server_name  <%= projectStaticHost %>;

    location / {
        add_header 'Access-Control-Allow-Methods' 'GET,OPTIONS,PUT,DELETE' always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;
        add_header 'Access-Control-Allow-Origin' '$http_origin' always;
        add_header 'Access-Control-Allow-Headers'  'Authorization,DNT,User-Agent,Keep-Alive,Content-Type,accept,origin,X-Requested-With,platform' always;
        if ($request_method = OPTIONS) {
            return 200;
        }

        root   <%= projectCwd %>/static/;
        index  index.html;
    }
}

# https server
server {
    listen       443 ssl;
    server_name  <%= projectHost %>;

    ssl_certificate      server.crt;
    ssl_certificate_key  server.key;

    location / {
        add_header 'Access-Control-Allow-Methods' 'GET,OPTIONS,PUT,DELETE' always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;
        add_header 'Access-Control-Allow-Origin' '$http_origin' always;
        add_header 'Access-Control-Allow-Headers'  'Authorization,DNT,User-Agent,Keep-Alive,Content-Type,accept,origin,X-Requested-With,platform' always;
        if ($request_method = OPTIONS) {
            return 200;
        }
        root   <%= projectCwd %>/static/html/;
        try_files $uri $uri/ /index.html;
        index  index.html index.htm;
    }
}

server {
    listen       443 ssl;
    server_name  <%= projectStaticHost %>;

    ssl_certificate      server.crt;
    ssl_certificate_key  server.key;

    location / {
        add_header 'Access-Control-Allow-Methods' 'GET,OPTIONS,PUT,DELETE' always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;
        add_header 'Access-Control-Allow-Origin' '$http_origin' always;
        add_header 'Access-Control-Allow-Headers'  'Authorization,DNT,User-Agent,Keep-Alive,Content-Type,accept,origin,X-Requested-With,platform' always;
        if ($request_method = OPTIONS) {
            return 200;
        }
        root   <%= projectCwd %>/static/;
        index  index.html;
    }
}
```
