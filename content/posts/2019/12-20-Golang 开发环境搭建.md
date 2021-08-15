---
title: Golang 开发环境搭建🌈🌈
date: 2019-12-20 17:56:00
tags: ['Golang']
category:
  - 编程笔记
slug: golang-development-environment-to-build
thumbnail: '../../thumbnails/golang.png'
---

Golang 开发环境搭建：包括切换 Golang 版本，修改 Golang 镜像地址，以及其他开发工具添加

## 🚀 安装 go 版本管理器 g

[文档](https://github.com/voidint/g)

```bash
wget -qO- https://raw.githubusercontent.com/voidint/g/master/install.sh | bash
echo "unalias g" >> ~/.bashrc # 可选。若其他程序（如'git'）使用了'g'作为别名。
source ~/.bashrc # 或者 source ~/.zshrc
```

## 📌 go get 镜像地址修改

- 使用国内七牛云的 `go module` 镜像

  参考 <https://github.com/goproxy/goproxy.cn>

  `golang 1.13` 可以直接执行：

  ```bash
  go env -w GO111MODULE=on
  go env -w GOPROXY=https://goproxy.cn,direct
  ```

- 阿里云

  ```bash
  go env -w GO111MODULE=on
  go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/,direct
  ```

## 开发常用库

- 使用 `godotenv` 库从 `.env` 文件中读取配置

  ```bash
    go get github.com/joho/godotenv
  ```

- `fileboy` 热重载工具

  [github 地址](https://github.com/dengsgo/fileboy)

  [gitee 地址](https://gitee.com/dengsgo/fileboy)
