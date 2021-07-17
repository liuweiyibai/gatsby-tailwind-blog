---
title: nodejs 开发记录
date: 2017-11-16 22:00:00
tags: ['nodejs']
category:
  - 编程笔记
slug: developing-with-nodejs
thumbnail: '../../thumbnails/nodejs.png'
---

## 开发简介

简单的说 nodejs 就是运行在服务端的 js。nodejs 是一个基于 Chrome v8 运行时建立的一个平台。是一个事件驱动 I/O 服务端 js 运行环境。本文总结一下自己使用 nodejs 开发时使用到的模块以及遇到的问题。

## 常用原生模块

- path 模块

  ```js
  /**
   * 文件操作过程中必须物理路径（绝对路径，以盘符开头）
   */
  const path = require('path')
  const basePath = path.join(__dirname, '../node/fs.js')

  // 基本名称，获取文件名(文件名,[是否删除扩展名.js])
  path.basename('./fs.js')

  // 获取不同操作系统中默认的路径分隔符
  console.log(path.delimiter) // ; 或者 :

  // node中获取环境变量
  console.log(process.env.path.split(path.delimiter))

  // 获取目录名称 (文件地址)
  console.log(path.dirname(basePath)) // C:\Users\Administrator\Desktop\Node

  // 获取扩展名(文件地址)
  console.log(path.extname(basePath)) // .js 包含点.

  // 将一个路径字符串转换为一个对象，包含文件目录，路径，扩展名
  let obj = path.parse(basePath)
  console.log(obj)

  // 将对象路径转换为路径字符串(obj)
  path.format(obj)

  // 判断一个路径是不是一个绝对路径
  console.log(path.isAbsolute(basePath)) //  true

  // 拼合路径(n个参数);
  path.join(__dirname, '')

  // 常规化一个路径(针对于window设计)；根据操作系统
  let a = path.normalize('c://dev')

  // (from,to)获取从to相对于from的一个相对路径
  console.log(path.relative(__dirname, 'C:UsersAdministratorDesktopNodepath.js'))

  // 于join不同
  path.resolve(__dirname, '../', '/code')

  // 路径里的分隔符，当前操作系统中的路径成员分隔符
  console.log(path.sep) // / or \

  // win 指的就是windows
  // 允许在任意操作系统使用widow的方式操作路径
  console.log(path.win32)
  console.log(path === path.win32) // true
  var a = {
    win32: p
  }
  a.win32 = a
  // 允许在任意操作系统使用linux的方式操作路径
  console.log(path.posix)
  ```

- os 模块

  获取操作系统相关信息，获取当前机器在当前局域网下的 ip 地址

  ```js
  const os = require('os')

  var dealTime = seconds => {
    var seconds = seconds | 0
    var day = (seconds / (3600 * 24)) | 0
    var hours = ((seconds - day * 3600) / 3600) | 0
    var minutes = ((seconds - day * 3600 * 24 - hours * 3600) / 60) | 0
    var second = seconds % 60
    day < 10 && (day = '0' + day)
    hours < 10 && (hours = '0' + hours)
    minutes < 10 && (minutes = '0' + minutes)
    second < 10 && (second = '0' + second)
    // join 将数组中元素拼接为一个字符串。
    return [day, hours, minutes, second].join(':')
  }

  var dealMem = mem => {
    var G = 0,
      M = 0,
      KB = 0
    mem > 1 << 30 && (G = (mem / (1 << 30)).toFixed(2))
    mem > 1 << 20 && mem < 1 << 30 && (M = (mem / (1 << 20)).toFixed(2))
    mem > 1 << 10 && mem > 1 << 20 && (KB = (mem / (1 << 10)).toFixed(2))
    return G > 0 ? G + 'G' : M > 0 ? M + 'M' : KB > 0 ? KB + 'KB' : mem + 'B'
  }

  //cpu架构
  const arch = os.arch()
  console.log('cpu架构：' + arch)

  //操作系统内核
  const kernel = os.type()
  console.log('操作系统内核：' + kernel)

  //操作系统平台
  const pf = os.platform()
  console.log('平台：' + pf)

  //系统开机时间
  const uptime = os.uptime()
  console.log('开机时间：' + dealTime(uptime))

  //主机名
  const hn = os.hostname()
  console.log('主机名：' + hn)

  //主目录
  const hdir = os.homedir()
  console.log('主目录：' + hdir)

  //内存
  const totalMem = os.totalmem()
  const freeMem = os.freemem()
  console.log('内存大小：' + dealMem(totalMem) + ' 空闲内存：' + dealMem(freeMem))

  //cpu
  const cpus = os.cpus()
  console.log('*****cpu信息*******')
  cpus.forEach((cpu, idx, arr) => {
    var times = cpu.times
    console.log(`cpu${idx}：`)
    console.log(`型号：${cpu.model}`)
    console.log(`频率：${cpu.speed}MHz`)
    console.log(`使用率：${((1 - times.idle / (times.idle + times.user + times.nice + times.sys + times.irq)) * 100).toFixed(2)}%`)
  })

  //网卡
  console.log('*****网卡信息*******')
  const networksObj = os.networkInterfaces()
  for (let nw in networksObj) {
    let objArr = networksObj[nw]
    console.log(`\r\n${nw}：`)
    objArr.forEach((obj, idx, arr) => {
      console.log(`地址：${obj.address}`)
      console.log(`掩码：${obj.netmask}`)
      console.log(`物理地址：${obj.mac}`)
      console.log(`协议族：${obj.family}`)
    })
  }

  // 局域网ip地址
  function getIpAddress() {
    // 在开发环境中获取局域网中的本机 iP 地址
    const interfaces = require('os').networkInterfaces()
    let IPAddress = ''
    for (let name in interfaces) {
      let iFace = interfaces[name]
      for (let i = 0; i < iFace.length; i++) {
        let alias = iFace[i]
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          IPAddress = alias.address
        }
      }
    }
    console.log('本机IP地址： IPAddress')
    return IPAddress
  }
  ```

- 网络

  - http

    ```js
    const http = require('http')
    http
      .creatServer(function (req, res) {
        res.writeHead(200, { 'Cotent-Type': 'text/plain' })
        res.end('ending')
      })
      .listen(3000)
    ```

  - socket

    ```js
    // 浏览器从地址栏到显示页面，发生了什么
    // 请求和相应，就是两个端之间的通信
    // net 模块 和 http 模块 的区别
    const net = require('net');
    // 创建一个服务器
    const server = net.createServer(socket);
    function socket(par) {
      log(par.address()) // 访问者的ip地址
      log(par.remotePort);
    };
    // 收发消息
    // 监听端口
    server.listen(9090, (err) => {
      console.log('running in port 9090');
        if(!!err){
          // 参数是0，随机分配 端口
          server.listen(0,() => {})
        }
    });
    process.stdin.on('data', funciton(chunk){})
    // 通过telnet 来访问node服务程序
    ```

- fs 模块

  - 监听文件变化

    ```js
    // 利用 fs 模块监控 markdown 然后通过工具转化为 html
    var fs = rquire('fs')
    var path = reqire('path')
    // 将 md 转为 html
    var marked = require('marked')

    var template = `html 模板<style>github的markdown样式</style>`
    const target = path.join(__dirname, process.argv[2] || '../readme.md')
    // 监视文件变化
    fs.watchFile(target, (current, prevent) => {
      console.log(current)
      if ((current.mtime = prevent.mtime)) {
        return false
      }
      // 读取文件
      fs.readFile(target, 'utf8', function (err, data) {
        if (!!err) return false
        var html = marked(data, '')
        template.replace('{{{content}}}', html)
        fs.writeFile(target.reaplace('.md', '.html'), html)
      })
    })
    ```

  - 文件流

    使用文件流的方式来存取大文件

    ```js
    // 文件的复制
    // 通过简单的先读后写的方式
    const fs = require('fs')
    const path = require('path')
    fs.readFile(
      path.join(__dirname, 'xx.txt', (err, data) => {
        // 向里边写入data
        fs.writeFile('demo.txt', (data, err) => {
          if (!!err) return false
          else {
            console.log('拷贝完成')
          }
        })
      })
    )

    // 使用流的方式读取
    // 1. 创建文件读取流
    var readline = require('readline')
    var reader = fs.createReadStream(path.join(__dirname, 'xx.txt'))
    // 获取文件的信息
    fs.stat('xx.txt', (err, data) => {
      console.log(data.size)
    })
    // 创建写入流
    var writer = fs.createWriteStream('x11x.txt')
    // 通过 readline 读取流
    // var rl = readline.createInteraface({input: reader});

    // 通过 readline 的事件进行读取
    // rl.on('line',(line) => {
    //  console.log(line);
    // });

    var total = 0
    // 事件 data 我读到了一点文件，就会触发这个 data 事件
    reader.on('data', chunk => {
      // 每次读了多少，chunk 是一个 buffer(字节数组，存储在缓存区中)
      console.log((total += chunk.length))
      // 4.  写入流
      writer.write(chunk, err => {
        if (!!err) return false
      })
    })

    // pipe 的认识
    var reader = fs.createReadStream(path.join(__dirname, 'xx.txt'))
    var writer = fs.createWriteStream('x11x.txt')
    // 读取流 流向（pipe） 写入流 可以继续 流 式操作
    reader.pipe(writer).pipe(xx)
    reader.on('end', function (err) {
      // 事件，end事件
    })
    writer.on('pipe', src => {})
    ```

## 第三方模块

- 支持 gbk 编码

  ```js
  npm i iconv-lite
  ```

- `json-server` 用来快速模拟 `api`

- 定时任务

  应用场景：定时发送、定时导出数据、定时备份数据、爬虫定时启动

  安装：

  ```js
  npm install node-schedule --save
  ```

  使用：

  - Cron 风格定时器

    ```js
    // 规则参数详解:
    // 秒、分、时、日、月、周几
    // 默认是 * 表示通配符，匹配任意，当秒是 * 时，表示任意秒数都触发，其他类推。
    * * * * * *
    ┬ ┬ ┬ ┬ ┬ ┬
    │ │ │ │ │ |
    │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
    │ │ │ │ └───── month (1 - 12)
    │ │ │ └────────── day of month (1 - 31)
    │ │ └─────────────── hour (0 - 23)
    │ └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, OPTIONAL)
    ```

    ```js
    const schedule = require('node-schedule')
    const scheduleCronstyle = () => {
      // 每分钟的第30秒定时执行一次:
      schedule.scheduleJob('30 * * * * *', () => {
        console.log('scheduleCronstyle:' + new Date())
      })
    }
    scheduleCronstyle()

    // 每隔 12 个小时: 0 0 */12 * * *

    // 每天的凌晨0点10分: 0 10 0 * * *

    // 每分钟的第30秒触发： '30 * * * * *'

    // 每小时的1分30秒触发 ：'30 1 * * * *'

    // 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'

    // 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'

    // 2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'

    // 每周1的1点1分30秒触发 ：'30 1 1 * * 1'
    ```

  - Cron 风格定时器-范围触发

    ```js
    // 定时占位符可以传入范围
    var schedule = require('node-schedule')

    function scheduleCronstyle() {
      // 每分钟的1-10秒都会触发
      schedule.scheduleJob('1-10 * * * * *', function () {
        console.log('scheduleCronstyle:' + new Date())
      })
    }
    scheduleCronstyle()
    ```

  - 递归规则定时器

    另一种风格的定时器

    ```js
    var schedule = require('node-schedule')
    function scheduleRecurrenceRule() {
      var rule = new schedule.RecurrenceRule()
      // rule.dayOfWeek = 2;
      // rule.month = 3;
      // rule.dayOfMonth = 1;
      // rule.hour = 1;
      // rule.minute = 42;
      rule.second = 0
      // 从结果中可以看出，每分钟第60秒时就会触发
      schedule.scheduleJob(rule, function () {
        console.log('scheduleRecurrenceRule:' + new Date())
      })
    }
    scheduleRecurrenceRule()
    ```

  - 对象文本语法定时器

    ```js
    const schedule = require('node-schedule')
    function scheduleObjectLiteralSyntax() {
      // dayOfWeek
      // month
      // dayOfMonth
      // hour
      // minute
      // second
      // 每周一的下午16：11分触发，其它组合可以根据我代码中的注释参数名自由组合
      schedule.scheduleJob({ hour: 16, minute: 11, dayOfWeek: 1 }, function () {
        console.log('scheduleObjectLiteralSyntax:' + new Date())
      })
    }
    scheduleObjectLiteralSyntax()
    ```

  - 取消定时器

    调用定时器对象的 cancel 方法

    ```js
    var schedule = require('node-schedule')

    function scheduleCancel() {
      var counter = 1
      var j = schedule.scheduleJob('* * * * * *', function () {
        console.log('定时器触发次数：' + counter)
        counter++
      })

      setTimeout(function () {
        console.log('定时器取消')
        j.cancel()
      }, 5000)
    }

    scheduleCancel()
    ```

## 性能优化

- `fast-json-stringify` 加快 `json` 序列化

  ```js
  // 细节看官方文档
  const fastJson = require('fast-json-stringify')
  ```

- 提升 promise 的性能

  ```js
  // 原生的 Promise 性能低于 callback 的方式
  // 可以在代码中将Promise 换为 地三方库的 Promise
  global.Promise = require('bluebird')
  ```

- 正确的编写异步代码

  ```js
  /**
   * Promise 来运行多个异步程序
   * Promise.all([])
   * Promise.race([])
   * Promise.any([])
   */
  async function aa() {
    return await Promise.all([a(), b()])
  }
  ```

- 优化 v8 引擎的垃圾回收机制
- 使用 redis 代替大对象的查询

- 修改最大内存限制

  ```bash
  node --max-semi-space-size=128 app.js
  ```

- 正确的使用流操作

  使用流操作来完成 io 操作

  ```js
  /*
   * Stream
   * 文件读写流
   * io流
   * 使用 stream.pipeline 管理流
   */
  ```

## 部署相关

部署可以使用 nginx 反代到多个应用实例上，通过 nginx 负载，结合 Jenkins 和 docker 自动部署。
