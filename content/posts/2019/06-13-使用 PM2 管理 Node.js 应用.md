---
title: 使用 PM2 管理 Node.js 应用
date: 2019-06-13 22:00:00
tags: ['Node.js', 'PM2']
category:
  - 编程笔记
slug: use-pm2-to-manage-nodejs-applications
thumbnail: '../../thumbnails/pm2.png'
---

## 安装

```bash
npm install pm2 -g
```

## 基础命令

```bash
pm2 start <js|json>  # 启动并添加一个进程
pm2 ls  # 显示所有进程
pm2 delete <name|id|script|all|json|stdin>  # 停止并删除指定的进程

# 此进程使用 kill 无效，因为存在守护进程，所以手动kill掉某个进程后会自动重启
pm2 stop <id|name|all|json|stdin>  # 停止进程
pm2 start <id|name|all|json|stdin>  # 启动指定进程
pm2 restart <id|name|all|json|stdin>  # 重启指定进程 也可使用正则匹配多个进程
```

## 日志查看

```bash
# 实时查看某进程日志
pm2 logs <id|name|all>

# 当没有指定日志目录时，默认在~/.pm2/logs中存放这所有进程日志历史
pm2 flush 清空所有历史应用日志
```

## 负载均衡

```bash
pm2 start app.js -i <number | max> # 启动指定数量的子进程
```

## 生成配置文件

```bash
pm2 init  # 生成 ecosystem.config.js
# 此时 pm2 start  ||  pm2 start ecosystem.config.js 即可使用配置启动
```

配置文件内容

```js
// ecosystem.config.js
// 配置多个环境
module.exports = {
  apps: [
    {
      name: 'app',
      script: './app.js',
      // log start
      output: './out.log',
      error: './error.log',
      log: './combined.outerr.log',
      log_type: 'json', // 将日志按json打出
      log_date_format: 'YYYY-MM-DD',
      merge_logs: true,
      // log end
      // output:  is only standard output (console.log)
      // error: is only error output (console.error)
      // log combines output and error, disabled by default

      // balancing start
      instances: 'max',
      // balancing end

      // watch and reload
      watch: true,
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
// 通过--env 指定环境
// 当进程被启动后 其环境则一般不可变，可通过--update-env 强制改变环境
```

- 简化配置

  ```json
  [
    {
      "name": "app",
      "script": "./app.js",
      "error_file": "/data/app-logs/argus/err.log",
      "out_file": "/data/app-logs/argus/out.log",

      //  单点(fork) 或者 集群(cluster_mode) nodejs 模式下使用 cluster_mode
      "exec_mode": "cluster_mode",
      "listen_timeout": 10000,
      "log_date_format": "YYYY-MM-DD HH:mm:ss.SSS",
      "env": {
        "NODE_ENV": "production"
      }
    }
  ]
  ```

## 保存进程列表

```bash
# 文件目录在 ~/.pm2/dump.pm2  ||  ~/.pm2/dump.pm2.bak
pm2 dump | save  # 保存当前的进程列表
pm2 resurrect   # 恢复之前保存的进程列表

# 进程列表用 json 格式输出
pm2 prettylist
```

[配置文件具体参数](https://pm2.io/doc/en/runtime/reference/ecosystem-file/)

## 开机启动

```bash
pm2 save # 生成 pm2 任务列表：~/.pm2/dump.pm2

# 然后再
pm2 startup
# 停止开机启动

pm2 unstartup
```

## PM2 两个模式区别

fork 模式，单实例多进程，常用于多语言混编，比如 PHP、Python 等，不支持端口复用，需要自己做应用的端口分配和负载均衡的子进程业务代码。
缺点就是单服务器实例容易由于异常会导致服务器实例崩溃。

cluster 模式，多实例多进程，但是只支持 node，端口可以复用，不需要额外的端口配置，0 代码实现负载均衡。
优点就是由于多实例机制，可以保证服务器的容错性，就算出现异常也不会使多个服务器实例同时崩溃。

共同点，由于都是多进程，都需要消息机制或数据持久化来实现数据共享。

## PM2 常用命令

```bash
pm2 start xxx.js              # 启动程序
pm2 start xxx.js -i 4         # 启动4个app.js的应用实例,4个应用程序会自动进行负载均衡
pm2 start app.js --name="api" # 启动应用程序并命名为 "api"
pm2 start app.js --watch      # 当文件变化时自动重启应用
pm2 start script.sh           # 启动 bash 脚本
pm2 list                      # 列表 PM2 启动的所有的应用程序
pm2 monit                     # 显示每个应用程序的CPU和内存占用情况
pm2 show [app-name]           # 显示某个应用程序的所有信息
pm2 logs                      # 显示所有应用程序的日志
pm2 logs [app-name]           # 显示指定应用程序的日志
pm2 stop all                  # 停止所有的应用程序
pm2 stop 100                  # 停止 id为 100的指定应用程序
pm2 restart all               # 重启所有应用
pm2 reload all                # 重启 cluster mode下的所有应用
pm2 delete all                # 关闭并删除所有应用
pm2 delete 0                  # 删除指定应用 id 0
pm2 scale api 10              # 把名字叫api的应用扩展到10个实例
pm2 restart app.js
```

## PM2 远程一键部署应用程序

## PM2 保存应用程序列表

```bash
pm2 save # 保存进程列表到 `/root/.pm2/dump.pm2`
pm2 resurrect # 重新加载保存的应用列表
```

## PM2 自动重启项目

应用开机自启动

```bash
pm2 save # 保存应用列表
pm2 startup  # 创建开机自动重启
pm2 unstartup systemd # 移除开机自动重启
```

## delete 应用 id 自增的问题

```bash
# 重启pm2
# kill 已经删除的应用
pm2 kill id
```
