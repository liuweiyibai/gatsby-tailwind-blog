---
title: docker-compose 构建容器
date: 2021-01-01 13:16:59
category:
  - 编程笔记
tags: ['docker', 'docker-compose']
slug: docker-compose-to-build-the-container
thumbnail: '../thumbnails/docker.png'
---

## docker-compose

`docker-compose` 可以一次性开启多个 `docker` 实例，这一点比 `Dockerfile` 来构建 `docker` 容器要方便的多。`docker-compose` 的重点是对 `yml` 和 `yaml` 文件的配置。`yml` 文件的配置需要注意的是严格控制缩进。

## 使用环境变量

- 可以通过 `env` 的方式来设置环境变量

  ```env:title=.env
  MONGO_USER = admin
  ```

- 在 `yaml` 中如何使用环境变量

  ```yaml
  mongodb:
    image: mongo:latest
    restart: always
    volumes:
      - /Users/root/docker/mongo/db:/data/db
      - /Users/root/docker/mongo/log:/var/log/mongodb
    ports:
      - 27018:27017
    environment:
      # 使用环境变量
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}%
  ```

## 启动 mongodb

`mongodb` 容器构建其实很简单，就是需要指定镜像来源，如果需要开启认证，需要配置环境变量 `MONGO_INITDB_ROOT_USERNAME` 和 `MONGO_INITDB_ROOT_PASSWORD`。一般我们希望对镜像中的磁盘做外部映射，这样即使容器退出了，下次启动，容器中保留的数据不会丢失

下面给出 `mongodb` 的 `docker-compose` 配置 `docker-compose-mongodb.yml`

```yaml
version: '3'
services:
  mongodb:
    image: mongo:latest
    restart: always
    volumes:
      - /data/mongo/db:/data/db
      - /data/mongo/log:/var/log/mongodb
    ports:
      - 27018:27017
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: admin
```

这里给出的端口映射将容器中的 `27017` 映射为了 `27018`，因为本机安装了 `mongodb`，这里为了避免端口占用冲突，所以将它用了 `27018`

我们要启动容器，需要先准备文件夹 `/data/mongo/db` 以及 `/data/mongo/log`

在配置文件所在目录，我们执行这样的命令就可以启动容器

```bash
docker-compose -f docker-compose-mongodb.yml up -d
```

如果本地镜像列表中不存在 `mongo:latest` 镜像，那么会从远程仓库拉取，会耗费一些时间。

这样的启动，我们默认使用了 `admin` 用户和 `admin` 密码做初始认证用户和密码。

一般在使用中，我们会创建一个用户，但是创建用户需要注意的是，我们需要切换到 `admin` 数据库下 `use admin`，然后认证 `db.auth("admin","admin")`，返回 `1`，表示认证成功。接着，我们需要创建一个用户给一个数据库使用，这时候我们还需要切换到别的数据库下，比如 `foods` ，切换命令为 `use foots`
这时候我们通过命令 `db.createUser({user:'food',pwd:'123456',roles:[{role:'dbOwner',db:'foods'}]})` 创建 `food` 用户并指定密码

以上创建新用户必须要注意切换到用户所管理的数据库上。否则当我们使用的时候，可能会报错，默认不切换，我们创建的用户是管理的 `admin` 数据库

## 启动 redis

- 贴出配置

  ```yaml
  redis:
    image: redis:latest
    container_name: redis01
    restart: always
    command: redis-server /etc/redis/redis.conf
    volumes:
      - /Users/root/docker/redis/redis01/redis.conf:/etc/redis/redis.conf
      - /Users/root/docker/redis/redis01/data:/data
    ports:
      - 6379:6379
  ```

- redis 配置

  ```conf:title=redis.conf
  # bind 127.0.0.1 # 注释掉这部分，这是限制redis只能本地访问
  # protected-mode no # 默认yes，开启保护模式，限制为本地访问
  # daemonize no # 默认no，改为yes意为以守护进程方式启动，可后台运行，除非kill进程，改为yes会使配置文件方式启动redis失败
  # databases 16 # 数据库个数
  # redis 持久化（可选）
  appendonly yes
  # 启用密码
  requirepass 1qaz2wsx
  ```

## 常用命令

```bash
docker-compose up -d # 后台运行
```

```bash
docker-compose ps # 查看状态
docker ps # 查看状态
```

```bash
docker-compose stop # 停止服务
docker-compose down
```

```bash
docker-compose restart # 重启容器
```
