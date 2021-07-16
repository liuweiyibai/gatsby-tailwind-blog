---
title: Centos 安装配置 Jenkins
date: 2020-03-11 20:04:34
category:
  - 编程笔记
tags: ['Centos', 'Jenkins']
slug: jenkins-centos-installation-configuration
thumbnail: '../../thumbnails/jenkins.png'
---

## 简介

Jenkins 是一个开源的、提供友好操作界面的持续集成(CI)工具，起源于 Hudson（Hudson 是商用的），主要用于持续、自动的构建/测试软件项目、监控外部任务的运行（这个比较抽象，暂且写上，不做解释）。Jenkins 用 Java 语言编写，可在 Tomcat 等流行的 Servlet 容器中运行，也可独立运行。通常与版本管理工具(SCM)、构建工具结合使用。常用的版本控制工具有 SVN、GIT，构建工具有 Maven、Ant、Gradle。

## CI/CD

![CI](https://cdn.clearlywind.com/blog-images/images/ci.webp)

CI(Continuous integration，中文意思是持续集成)是一种软件开发时间。持续集成强调开发人员提交了新代码之后，立刻进行构建、（单元）测试。根据测试结果，我们可以确定新代码和原有代码能否正确地集成在一起。借用网络图片对 CI 加以理解。

![CI/CD](https://cdn.clearlywind.com/blog-images/images/ci-cd.webp)

CD(Continuous Delivery， 中文意思持续交付)是在持续集成的基础上，将集成后的代码部署到更贴近真实运行环境(类生产环境)中。比如，我们完成单元测试后，可以把代码部署到连接数据库的 Staging 环境中更多的测试。如果代码没有问题，可以继续手动部署到生产环境。下图反应的是 CI/CD 的大概工作模式。

## 安装

> 安装 Jenkins 需要有 Java 环境，请先安装并配置好 jdk

- 下载仓库源

  repo 文件是 yum 仓库的配置文件后缀，通常一个 repo 文件中可以设置多个 yum 仓库源。

  ```bash
  wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo
  ```

- 导入秘钥

  ```bash
  rpm --import https://jenkins-ci.org/redhat/jenkins-ci.org.key
  ```

- 安装 Jenkins

  ```bash
  yum install -y jenkins --nogpgcheck
  ```

- 查看安装目录信息

  ```bash
  rpm -ql jenkins
  ```

- 启动

  ```bash
  service jenkins start # 启动
  service jenkins stop # 停止
  service jenkins restart # 重启
  systemctl start jenkins # 重启
  systemctl status jenkins # 查看Jenkins状态

  # Jenkins 也可以通过url访问 ip:8080/restart 进行重启
  ```

- 查看初始密码

  ```bash
  cat /var/lib/jenkins/secrets/initialAdminPassword
  ```

可以修改默认端口，也可使用 Nginx 反代到 Jenkins 的端口，默认端口 8080，记得防火墙打开 8080 端口，可以通过 ip:端口 进行访问

- 修改配置文件

  ```bash
  vim /etc/sysconfig/jenkins
  # 找到文件中 $JENKINS_USER 改为 root
  ```

- 修改权限

  ```bash
  # 如果修改执行角色为 root 的时候
  chown -R root:root /var/lib/jenkins
  chown -R root:root /var/cache/jenkins
  chown -R root:root /var/log/jenkins
  service jenkins restart  # 重启 jenkins
  ps -ef | grep jenkins # 查看 jenkins 运行状态
  ```

**Nginx 反代 Jenkins**

- 根目录反代

  ```conf
    # /etc/nginx/conf.d
    upstream jenkins {
      server 127.0.0.1:8080;
    }
    server {
      listen 80;
      location / {
        proxy_pass http://jenkins;
        proxy_redirect     default;
        proxy_set_header   Host             $host:$server_port;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header X-Forwarded-Host $host:$server_port;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
      }
    }
  ```

- 二级目录

  修改 Jenkins 配置文件

  ```bash
  vim /etc/sysconfig/jenkins
  # 修改 JENKINS_ARGS="--prefix=/jenkins"
  ```

  ```conf
    location ^~ /jenkins/ {
      proxy_pass http://127.0.0.1:8080/jenkins/;
      sendfile off;
      proxy_set_header Host $host:$server_port;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_max_temp_file_size 0;
      client_max_body_size 10m;
      client_body_buffer_size 128k;
      proxy_connect_timeout 90;
      proxy_send_timeout 90;
      proxy_read_timeout 90;
      proxy_temp_file_write_size 64k;
      proxy_http_version 1.1;
      proxy_request_buffering off;
      proxy_buffering off;
    }
  ```
