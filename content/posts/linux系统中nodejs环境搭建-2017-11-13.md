---
title: linux 系统中 nodejs 环境搭建
date: 2017-11-13 22:00:00
tags: ['nodejs', 'linux']
category:
  - 编程笔记
slug: nodejs-environment-setup-in-linux-environment
thumbnail: '../thumbnails/nodejs.png'
---

## **nvm 安装**

- 下载并且执行安装脚本

  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
  # 或者
  wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
  ```

- 修改 `nvm` 下载镜像为 `taobao` 镜像

  ```bash
  vim ~/.bashrc

  # 粘贴如下内容
  export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node
  ```

- 在当前 `bash` 环境下读取并执行 `.bashrc` 文件

  ```bash
  source ~/.bashrc
  ```

  [参考链接](https://github.com/nvm-sh/nvm#installing-and-updating)

## **npm 安装**

- 使用 `nvm` 安装 `nodejs`

  ```bash
  nvm -h # 检查nvm命令是否已经安装成功
  nvm ls # 查看 已安装的 Nodejs 版本
  nvm install 10.1 # 安装 nodejs
  ```

## **nrm 安装**

- `nrm` 是一个 `npm` 工具，使用 `nrm` 来管理 `npm` 所有下载镜像

  ```bash
  # 使用淘宝镜像全局安装 nrm
  npm i nrm -g --registry=http://registry.npm.taobao.org
  nrm ls # nrm 查看所有的镜像地址
  nrm use taobao # 切换到淘宝镜像
  ```
