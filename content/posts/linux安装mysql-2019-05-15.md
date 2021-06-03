---
title: linux 安装 mysql
tags:
  - linux
  - mysql
category:
  - 编程笔记
slug: centos-install-mysql
date: 2019-05-15 17:00:28
thumbnail: '../thumbnails/mysql.png'
---

## 使用 yum 安装

- 安装

  ```bash

  # 查询是否安装mysql
  rpm -qa | grep mysql

  # 下载源需要下载
  wget -i -c https://repo.mysql.com/mysql57-community-release-el7.rpm

  # 使当前源生效
  yum -y install mysql57-community-release-el7.rpm

  # 通过yum安装
  yum -y install mysql mysql-server

  # 安装
  yum -y install mysql-community-server

  ```

- 数据库设置

  ```bash
  # 启动 mysql
  systemctl start  mysqld.service

  # 查看 mysql 运行状态
  systemctl status mysqld.service

  # 找到默认root用户密码
  grep "password" /var/log/mysqld.log

  # 使用默认密码登录root用户
  mysql -u root -p

  # 修改 root 密码
  ALTER USER 'root'@'localhost' IDENTIFIED BY 'new password';
  ```

- 移除下载的 yum 源

  ```bash
  yum -y remove mysql57-community-release-el7.rpm
  ```

- 设置开机启动

  ```bash
  systemctl enable mysqld
  systemctl daemon-reload
  ```

- 授权远程访问

  ```bash
  grant all privileges on *.* to root@'%' identified by "password";
  flush privileges;
  ```

## 卸载

### yum 方式

- 检查是否安装

  ```bash
  yum list installed mysql*
  ```

  > 如下图所示 即为安装

  ![background](https://cdn.clearlywind.com/blog-images/images/yum-list-installed-mysql.png)

- yum 卸载

  > 根据上图列表中的名字

  ```bash
  yum remove mysql-community-client.x86_64 mysql-community-common.x86_64 ...
  rm -rf /var/lib/mysql
  rm /etc/my.cnf
  ```

### rpm 方式

- 查看是否安装

  ```bash
  rpm -qa | grep -i mysql
  ```

  > 如下图所示

  ![rpm方式查看是否已经安装mysql](https://cdn.clearlywind.com/blog-images/images/rpm-qa-grep-i-mysql.png)

- 卸载

  ```bash
  rpm -e mysql57-community-release-el7-9.noarch
  rpm -e mysql-community-server-5.7.17-1.el7.x86_64
  rpm -e mysql-community-libs-5.7.17-1.el7.x86_64
  rpm -e mysql-community-libs-compat-5.7.17-1.el7.x86_64
  rpm -e mysql-community-common-5.7.17-1.el7.x86_64
  rpm -e mysql-community-client-5.7.17-1.el7.x86_64
  cd /var/lib/
  rm -rf mysql/
  ```

### 清除其他

```bash
whereis mysql
mysql: /usr/bin/mysql /usr/lib64/mysql /usr/local/mysql /usr/share/mysql /usr/share/man/man1/mysql.1.gz
#删除上面的文件夹
rm -rf /usr/bin/mysql
```

- 删除配置

  ```bash
  rm –rf /usr/my.cnf
  rm -rf /root/.mysql_sercret
  ```

- 剩余配置检查

  ```bash
  # 检查
  chkconfig --list | grep -i mysql

  # 删除检查结果
  chkconfig --del mysqld
  ```
