---
title: Linux 安装 MongoDB
date: 2019-03-21 22:10:00
tags: ['MongoDB', 'Linux']
category:
  - 编程笔记
slug: install-mongodb-in-linux
thumbnail: '../../thumbnails/mongodb.png'
---

## 安装步骤

1. 添加 MongoDB 镜像到 yum 源中

   在 `/etc/yum.repos.d/` 目录中创建一个名为 `mongodb-org.repo` 存储库配置文件，内容如下:

   ```ini
   [mongodb-org-4.0]
   name=MongoDB Repository
   baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.0/x86_64/
   gpgcheck=1
   enabled=1
   gpgkey=https://www.mongodb.org/static/pgp/server-4.0.asc
   ```

   如果要安装旧版本的 MongoDB ，可以使用浏览器访问该 `url` 并且加上对应 `版本号`，查看是否存在

2. 安装

   使用 `yum` 安装 `mongodb-org` 应用程序

   ```bash
   sudo yum install mongodb-org
   ```

   在安装过程中，`yum` 会提示您导入 `MongoDB GPG` 密钥。输入 `y` 并点击 `Enter`

   以下软件包将作为 `mongodb-org` 软件包的一部分安装在您的系统上：

   `mongodb-org-server- mongod` 守护程序以及相应的初始化脚本和配置。
   `mongodb-org-mongos- mongos`守护进程。
   `mongodb-org-shell -mongo shell`，它是 MongoDB 的交互式 js 接口，用于执行命令行中的管理任务。
   `mongodb-org-tools` -包含几个用于导入和导出数据，统计信息以及其他实用程序的 `mongodb` 工具。
   `mongodb-org-mongos`

3. 启动

   安装完成后，启动 MongoDB，并且加入到开机启动

   ```bash
   sudo systemctl start mongod # 启动
   sudo systemctl enable mongod # 加入到开机启动
   ```

4. 验证 MongoDB 是否安装成功

   为了验证安装，我们将使用该 mongo 工具连接到 MongoDB 数据库服务器并打印服务器版本：

   ```bash
   mongo
   ```

   进入 `mongodb shell`，输入以下命令，以显示 MongoDB 版本：

   ```js
   db.version()
   // 输出-> 4.0.1
   ```

## 配置 MongoDB

MongoDB 默认配置文件位于 `/etc/mongo.conf`

修改完配置文件后需要重启 MongoDB

```bash
sudo systemctl restart mongod
```

- 启用登录

  ```yaml
  security:
    authorization: enabled
  ```

- 开启 ip 访问

  ```yaml
  # bindIp:...
  bindIpAll: true
  ```

## 创建管理 MongoDB 用户

如果启用了 MongoDB 身份验证，需要创建一个管理 MongoDB 用户，使用该用户来访问和管理 MongoDB 实例

- 首先使用以下命令访问 `mongo shell`：

  ```bash
  mongo
  ```

- 连接到 `admin` 数据库：

  ```bash
  use admin # switched to db admin
  ```

- 创建一个 **mongo** (用户名)用户,具有 `userAdminAnyDatabase` 角色的新用户：

  ```js
  db.createUser({
    user: 'username',
    pwd: 'password',
    roles: [{ role: 'userAdminAnyDatabase', db: 'admin' }]
  })

  // 先登录admin相关账号，给某个数据库增加用户，先 use xxx
  db.createUser({
    user: 'yunzhu',
    pwd: 'yunzhu1qaz2wsxmongo',
    roles: [{ role: 'readWrite', db: 'yunzhu' }]
  })
  // 回车新建会提示 Successfully added user ...
  ```

- 登录

  ```bash
  mongo -u username -p --password admin

  # 登录成功的话，继续执行
  use admin

  show users
  # 可以查看到所有用户
  ```
