---
title: linux 编译安装 git
date: 2018-12-14 16:20:00
tags: ['git', 'linux']
category:
  - 编程笔记
slug: install-git-on-linux
thumbnail: '../../thumbnails/git.png'
---

![git](https://cdn.clearlywind.com/blog-images/images/git.png)

通过编译安装方式安装 `git`

## 安装编译所需要的基础包

```bash
yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel
yum install gcc-c++ perl-ExtUtils-MakeMaker
```

## 下载 **git** 源码

```bash
# 在某个目录下
wget https://www.kernel.org/pub/software/scm/git/git-2.7.3.tar.gz # 可以指定版本号
```

## 解压

```bash
tar zxvf git-2.7.3.tar.gz
cd ./git-2.7.3.tar.gz
```

## 编译安装

```bash
# 注意路径变化

cd git-2.7.3
make configure
./configure --prefix=/usr/git ##配置目录
make profix=/usr/git
make install
```

## 加入环境变量

```bash
echo "export PATH=$PATH:/usr/git/bin" >> /etc/profile
source /etc/profile
```

## 检查 git 版本

```bash
git --version
```

## 如果 make configure 报错

`/bin/sh: autoconf: command not found`

```bash
yum install install autoconf automake libtool
```
