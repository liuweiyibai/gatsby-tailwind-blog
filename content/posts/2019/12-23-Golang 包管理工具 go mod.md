---
title: Golang 包管理工具 go mod 🧨
date: 2019-12-21 17:56:00
tags:
  - Golang
category:
  - 编程笔记
slug: golang-package-management-tool-go-mod
thumbnail: '../../thumbnails/golang.png'
---

## 准备工作 📦

`go mod` 是 `go` 语言内置的包管理工具，集成在 `go tool` 中，安装好 `go` 就可以使用

> 注意： `go version >= 1.11` 引入。在 `1.12` 版本中正式使用，所以 `1.12` 在版本之前，使用 `Go modules` 之前需要环境变量 `GO111MODULE`

关于 `GO111MODULE`：

1. `GO111MODULE=off`: 不使用 `modules` 功能。

2. `GO111MODULE=on`: 使用 `modules` 功能，不会去 `GOPATH` 下面查找依赖包。

3. `GO111MODULE=auto`: `Golang` 自己检测是不是使用 `modules` 功能。

如何设置 `GO111MODULE`:

```bash
go env -w GO111MODULE=on
```

### 开始使用 👀

- 创建目录，初始化项目

  初始化很简单，在项目根目录执行命令 `go mod init go-mod-demo`

  ```bash
  mkdir go-mod-demo
  cd go-mod-demo
  go mod init go-mod-demo # 使用 go mod 初始化项目
  ```

  然后会生成一个 `go.mod` 文件如下:

  ```terminal
  module go-mod-demo

  go 1.14
  ```

  这里比较关键的就是这个 `go.mod` 文件，这个文件中标识了我们的项目的依赖的 `package` 的版本。执行 `init` 暂时还没有将所有的依赖管理起来。我们需要将程序 `run` 起来（比如执行 `go run/test`），或者 `build` （执行命令 `go build`）的时候，才会触发依赖的解析。

- 安装依赖

  ```bash
  go get -u github.com/gin-gonic/gin
  ```

  `go.mod` 文件，同时项目目录下多了一个 `go.sum` 用来记录每个 `package` 的版本和哈希值。`go.mod` 文件正常情况会包含 `module` 和 `require` 模块，除此之外还可以包含 `replace` 和 `exclude` 模块

  ```terminal
  module go-mod-demo

  go 1.14

  require (
          github.com/gin-gonic/gin v1.6.3 // indirect
          github.com/golang/protobuf v1.4.1 // indirect
          github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd // indirect
          github.com/modern-go/reflect2 v1.0.1 // indirect
          golang.org/x/sys v0.0.0-20200511232937-7e40ca221e25 // indirect
          gopkg.in/yaml.v2 v2.3.0 // indirect
  )
  ```

  这些 `package` 并不是直接存储到 `$GOPATH/src` ，而是存储到 `$GOPATH/pkg/mod` 下面，不同版本并存的方式。并且是文件权限是只读的 `-r--r--r--` 😂

  ![go-mod地址](https://cdn.clearlywind.com/blog-images/images/gomod.jpg)

- 依赖升级降级

  如果我想要升级（降级）某个 `package` 则只需要 `go get` 即可，比如：

  ```bash
  go get package@version
  ```

  除了指定版本，我们还可以使用如下命名使用最近的可行的版本：

  ```bash
  go get -u  # 使用最新的 `minor` 或者 `patch` 版本
  go get -u=patch # 使用最新的 `patch` 版本
  ```

- 关于 `vendor` 模式

  `go mod` 是不推荐使用 `vendor` 目录的，而是直接使用 `source` 或 `cache` 中的包

  `module mode`下默认忽略 vendor 目录。通过 `flag-mod=vendor` 设置 `vendor` 模式，依赖只从顶层的 `vendor` 中查找。可以通过环境变量 `GOFLAGS=-mod=vendor` 来设置 `flag`

  [文档地址](https://github.com/golang/go/wiki/Modules#how-do-i-use-vendoring-with-modules-is-vendoring-going-away)

  - `vendor` 模式下 `get` 报错

    `goland` 编辑器勾选 `vender` 后会开启 `vendor` 模式

    ```bash
    # go get: disabled by -mod=vendor
    # mod 有三个取值: "" || "readonly" || "vendor"
    # 有两种赋值方式：
    # 1. -mod=''
    # 2. -mod ''
    ```

- 其他命令

  - 清缓存

    ```bash
    go clean -modcache
    ```

  - 下载依赖

    ```bash
    go mod download
    ```

  - 同步依赖包，添加需要的，移除多余的

    ```bash
    go mod tidy
    ```

  - 将依赖包放入 `vendor`

    ```bash
    go mod vendor
    ```

- `go.mod` 和 `go.sum`

  `go.mod`：依赖列表和版本约束。`go mod` 不推荐使用 `vendor` ，不要将 `vendor` 提交到版本控制。
  `go.sum`：记录 `module` 文件 `hash` 值，用于安全校验。
  `git` 可以提交 `go.mod`，应忽略 `go.sum`，因为会根据校验 `sum` 跨平台可能报错

### 命令总结

- `download` 下载依赖的 `module` 到本地 `cache`
- `edit` 编辑 `go.mod` 文件
- `graph` 打印模块依赖图
- `init` 在当前文件夹下初始化一个新的 `module` ， 创建 `go.mod` 文件
- `tidy` 增加丢失的 `module` ，去掉未用的 `module`
- `vendor` 将依赖复制到 `vendor` 下
- `verify` 校验依赖
- `why` 解释为什么需要依赖

### 其他特性 🧲

- `replace`

  `replace` 主要为了解决某些包发生改名的问题。

  对于另外一种场景有的时候也是有用的，比如对于有些 `golang.org/x/` 下面的包由于某些原因在国内是下载不了的，但是对应的包在 `github` 上面是有一份拷贝的，这个时候我们就可以将 `go.mod` 中的包进行 `replace` 操作。

  让原本依赖的 `github.com/repo/pkg` 包，实际使用 `github.com/your-fork/pkg@v`

- `GoProxy`

  [Golang 开发环境搭建 🌈🌈](/blog/golang-development-environment-to-build)
