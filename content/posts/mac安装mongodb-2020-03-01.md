---
title: mac 安装中 mongodb
date: 2020-03-01 22:10:00
tags: ['mac', 'mongodb']
category:
  - 编程笔记
slug: macos-install-mongodb
thumbnail: '../thumbnails/mongodb.png'
---

如何在 `macos` 中安装 `mongodb`

1. 下载 `mongodb` 所需要的二进制文件

   可以通过 [官网下载](https://www.mongodb.com/download-center/enterprise)

2. 解压下载的文件

   可以双击打开解压 也可以通过命令行方式解压：

   ```bash
   tar -zxvf mongodb-macos-x86_64-4.2.1.tgz
   ```

3. 将解压后的文件复制到目标目录

   ```bash
   mkdir -p /usr/local/mongodb
   sudo mv ./mongodb-macos-x86_64-4.2.3/*  /usr/local/mongodb
   ```

4. 设置环境变量

   为了方便运行，设置 `path` 还是要好一点： 打开 `bash` 配置文件

   ```bash
   code ~/.zshrc
   ```

   在配置文件里面添加 `export PATH=<mongodb 的安装目录>/bin:$PATH` 如：

   ```bash
   export PATH=/usr/local/mongodb/bin:$PATH
   ```

   用以下命令重新载入 `bash` 配置文件：

   ```bash
   source ~/.bash_profile
   ```

5. 运行 `mongodb`

   验证是否 `path` 是否配置成功：

   ```bash
    mongo -version
    # 如果不提示command not found，代表安装成功了
   ```

6. 启动服务

   创建 `mongo` 默认运行的数据库目录，启动服务

   ```bash
   sudo mkdir -p /data/db
   mongod
   ```

   也可以手动指定 dbpath 来运行：

   ```bash
   mongod --dbpath <path to data directory>
   mongod --dbpath ~/Downloads/mongodb/data/db
   ```

7. 修改权限

   ```bash
   sudo chown -R [username] /data/db
   ```

8. 查看端口并杀死进程

   ```bash
   sudo lsof -i:8095
   sudo kill -9 7748
   ```

## 使用 homebrew 安装

1. 先执行 `brew tap mongodb/brew`

2. 成功后再执行 `brew install <formula>` 即可

   ```bash
   # 我在这里直接安装默认的社区版本
   brew install mongodb-community

   # 或者参考文档安装指定的版本
   brew install mongodb-community@4.2
   ```

这个 `brew tap` 的源无法加速，是从 `mongodb.org` 官方下载的安装包，所以需要多耐心等待一下，如果下载失败，多尝试几次便可安装成功

顺便贴一下安装成功后几个默认配置文件的目录，引用自 [`mongodb/homebrew-brew`](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

```terminal
a configuration file: /usr/local/etc/mongod.conf
a log directory path: /usr/local/var/log/mongodb
a data directory path: /usr/local/var/mongodb
```
