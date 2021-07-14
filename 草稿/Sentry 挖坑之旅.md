---
title: Sentry 挖坑之旅
---

当项目上线之后，如果线上报错导致的页面无法正常渲染，或者由于报错导致操作无反应。当你的页面面对庞大的用户访问量，根本无法及时获取用户碰到的问题，这时就需要一个异常监控服务可以及时报警通知、提供有效信息和报错堆栈等排查问题。

调研了部分异常监控服务以及自研成本之后，决定选择自行搭建 [Sentry](https://github.com/getsentry/sentry) 这款异常监控服务。Sentry 提供的服务也提供自行搭建部署，并且搭建部署也是非常简单方便，基于 Docker 部署，在功能使用上面也非常全面易用、支持多平台。

当然，市面上也还有其他优秀的异常监控服务：[阿里云 ARMS](https://help.aliyun.com/document_detail/58652.html?spm=a2c4g.11174283.3.2.4316668c4gv6Cg)、[岳鹰](https://yueying.effirst.com/index)、[腾讯 Badjs](http://betterjs.github.io/)、[Fundebug](https://github.com/Fundebug)、[FrontJS](https://www.frontjs.com/) 等等。

## 安装

Sentry 官方提供了一个 Docker 的镜像仓库，使用 Docker Compose 编排多容器，我们可以基于这个仓库快速搭建 Sentry 的服务。

[Sentry 提供的镜像 GitHub](https://github.com/getsentry/onpremise)

[镜像文档](https://develop.sentry.dev/self-hosted/)

```bash
# down 项目
git clone git@github.com:getsentry/onpremise.git
cd onpremise

# 添加钉钉通知等插件
cd sentry && vim requirements.example.txt
# 加入如下内容:
# sentry-dingchat
# django-smtp-ssl~=1.0
# redis-py-cluster==1.3.4

# 修改 nginx.conf 文件的 server 配置，类似如下
cd ../nginx && vim nginx.conf

# 回到 onpremise 目录，执行如下命令进行容器启动
cd .. && bash install.sh
```

Nginx 配置:

```conf
server {
  listen 80;
  server_name sentry.xx.com;
  proxy_set_header Host $http_host;
  proxy_set_header X-Forwarded-Proto $scheme;
  proxy_set_header X-Forwarded-For $remote_addr;
  proxy_redirect off;
  proxy_send_timeout 5s;
  send_timeout 10s;
  resolver_timeout 5s;
  client_body_timeout 5s;

  client_max_body_size 4096m;
  client_header_buffer_size 10m;
  large_client_header_buffers 4 10m;
  access_log /var/log/nginx/sentry.xx.com.access.log main;
  error_log /var/log/nginx/sentry.xx.com.error.log;
  # 反代到 sentry 项目
  location / {
    proxy_pass http://sentry;
  }
}
```

容器构建结束之后，使用 docker-compose 启动容器

```bash
# 后台启动应用
docker-compose up -d
```

[使用 Docker Compose 编排容器](/blog/docker-compose-orchestrate-containers)

<!-- https://www.cnblogs.com/moxiaoan/p/9299404.html -->

## 常用配置

- 邮箱

  邮箱配置参考这个 <http://oxxd.github.io/sentry-deploy/>
  <https://blog.csdn.net/MacwinWin/article/details/116924514>

## 前端应用

- SourceMap

- nuxt sentry
  <https://juejin.cn/post/6844904051692453895#heading-4>
  https://blog.csdn.net/wenziyin/article/details/89921749
