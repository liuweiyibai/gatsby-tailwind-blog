---
title: mac 中使用 brew 管理 go 版本
date: 2020-05-30 19:59:40
category:
  - 编程笔记
tags: ['mac', 'brew', 'go']
slug: the-use-of-the-brew-management-go-version-mac
thumbnail: '../../thumbnails/homebrew.png'
---

Brew 是 Mac 上包管理工具，和 Linux 上的 apt 、yum、rpm 一样，可以提供非图形化软件的安装，我们也可以使用 brew 管理 Go 的版本。

也可以通过第三方 [g](/blog/golang-development-environment-to-build) 管理 Go 版本。

本文记录一下使用 Brew 管理 Go 版本

1. brew install

   ```bash
   brew install go
   # 默认安装一个 go 的最新版本，之后再安装指定版本，使用 brew switch 命令切换就可以了
   ```

2. brew switch

   使用 brew info go 命令你可以看到当前目前的 go 可以切换的版本，接下来就安装多个版本并且切换到对应的版本。

   ```bash
   brew info go
   # go: stable 1.15.3 (bottled), HEAD
   ```

   ```bash
   # 安装指定 go 版本
   brew install go@<version>

   # 比如：
   brew install go@1.12.17
   # 安装好了之后使用 brew info go 查看是否可以切换了
   ```

   ```bash
   brew switch go 1.12.17
   ```

   单纯的使用上面的命令你会发现，go 不能使用了，并且会出现下面的提示：

   ```bash
   brew switch go 1.12.17
   # Cleaning /usr/local/Cellar/go/1.12.17
   # Cleaning /usr/local/Cellar/go/1.15.3
   # 0 links created for /usr/local/Cellar/go/1.12.17
   ```

   创建了零个连接，就代表着没有成功的将 go 版本指向你所需要的版本下，问题是什么呢？现将 go 版本切回 go 1.15.3，你会发现可以切换并正常使用：

   ```bash
   brew switch go 1.15.3
   # Cleaning /usr/local/Cellar/go/1.12.17
   # Cleaning /usr/local/Cellar/go/1.15.3
   # 3 links created for /usr/local/Cellar/go/1.15.3
   ```

   ```bash
   go version
   # go version go1.15.3 darwin/amd64
   ```

   定位这个原因你需要看看为什么没有给 go 1.12.17 版本创建软连接，首先要找一下 go 默认安装的位置，使用 go env 查看安装目录：

   ```bash
   go env
   # /usr/local/Cellar/go/ 查看在系统中安装的位置
   ```

   进入到目录之后在 go 目录下只有刚才默认安装的 1.15.3 版本，并没有自己安装的版本，退出父级目录看到了下载的 go@1.12.17 版本，由于软连接连接的是上方的路径，需要将这个目录移动至 go 目录下：

   ```bash
   # 打开默认目录
   cd /usr/local/Cellar/go/

   # 退出目录
   cd ..

   # 移动目录至 go 目录下
   mv go@1.12.17 go/

   # 接下来重命名文件夹
   mv go@1.12.17 1.12.17

   # 接下来使用切换命令
   brew switch go <version> # 就可以切换环境了。
   ```
