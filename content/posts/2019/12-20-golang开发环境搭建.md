---
title: golang 开发环境搭建🌈🌈
date: 2019-12-20 17:56:00
tags: ['golang']
category:
  - 编程笔记
slug: golang-development-environment-to-build
thumbnail: '../../thumbnails/golang.png'
---

`golang` 开发环境搭建：包括切换 `golang` 版本，修改 `golang` 镜像地址，以及其他开发工具添加

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

## ⚡ 配置文件热更新工具

[file 热重载工具](/blog/fileboy-hot-reload-tool)
