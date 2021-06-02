---
title: windows 系统中 nodejs 环境搭建
slug: nodejs-development-environment-for-windows
date: 2017-10-13 22:00:00
tags: ['nodejs']
category:
  - 编程笔记
thumbnail: '../thumbnails/nodejs.png'
---

## nvm 安装

- 安装 nvm 。nvm 是 nodejs 的版本管理工具，们可以使用它来同时安装不同版本的 nodejs，在需要的时候直接使用 nvm 切换版本即可。

  1. 下载 nvm 包，地址：[nvm 下载地址](https://github.com/coreybutler/nvm-windows/releases)
  2. 第一个：nvm-noinstall.zip 下载完成后解压到一个地方，比如: C:\develop\nvm。
  3. 解压后文件列表是这样的：`elevate.cmd、elevate.vbs、install.cmd、LICENSE、nvm.exe`
  4. 在刚刚解压的目录 C:\develop\nvm 目录下新建 settings.txt 文本如下：

  ```yaml
  root: C:\develop\nvm
  path: C:\develop\nodejs
  arch: 64
  proxy: none
  node_mirror: http://npm.taobao.org/mirrors/node/
  npm_mirror: https://npm.taobao.org/mirrors/npm/
  ```

- 配置 nvm 环境全局变量,在系统环境变量中 path 中
  ①. 变量名:`NVM_HOME`变量值: `C:\develop\nvm`
  ②. 变量名:`NVM_SYMLINK`变量值: `C:\develop\nodejs`
  ③. 将上面两个变量名放到系统的 path 中：`;%NVM_HOME%;%NVM_SYMLINK%;`

- 在命令行直接输入 nvm -v，会展示出 nvm 的运行版本，说明 nvm 安装成功![nvm](/images/nvm-v.png)
- 通过命令 nvm install latest 安装最新版本 node
- 查看 node 版本列表，nvm list![nvm list](/images/nvm-list.png)
- 通过命令 nvm use node 版本号 来使用这个版本的 node(必须使用 node use 命令选中一个 node 版本投入使用，不然无法在创建 nodejs 快捷方式，导致后面安装出现问题)
- 完成上面操作，接下来安装 npm

## npm 安装

- 按照步骤前面安装过 node 后，在命令行中输入`npm config set prefix "C:\develop\nvm\npm"`，这会在 windows 用户目录下新建出一个`.npmrc`文件，我们通过记事本打开这个文件，文件内容：`prefix=C:\develop\nvm\npm`（配置 npm 的全局安装路径），然后添加文件内容：

  ```yaml
  prefix=C:\develop\nvm\npm
  registry = http://registry.npm.taobao.org
  ```

- 然后继续在命令行中键入`npm install npm -g`在全局中安装 npm

- 给 npm 配置全局的环境变量
  ①. 变量名: `NPM_HOME` 变量值: `C:\develop\nvm\npm`
  ②. 这里要注意：在 Path 的最前面添加`;%NPM_HOME%`，注意了，这个一定要添加在`%NVM_SYMLINK%`之前。
  ③. 最后我们新打开一个命令窗口，输入`npm -v` ，显示出 npm 的版本，此时就可使用 npm 了。

## nrm 的安装

- nrm 就是 npm registry manager 也就是 npm 的镜像源管理工具，有时候国外资源太慢，那么我们可以用这个来切换镜像源。
- 通过 npm install nrm -g 完成安装
- 通过 nrm ls 查看现有源地址
- 通过 nrm use xx 使用某个源

## cnpm

cnpm 是一个国内的镜像源

```bash
npm i cnpm -g
```
