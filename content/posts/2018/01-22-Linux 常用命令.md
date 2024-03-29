---
title: Linux 常用命令
tags:
  - Linux
category:
  - 编程笔记
slug: linux-common-commands
thumbnail: '../../thumbnails/linux.png'
date: 2018-01-22 09:20:08
---

## 进程管理

- 通过端口号查看 pid

  ```bash
  lsof -i:5000 # 查看在 5000 端口运行的进程
  kill -9 pid # 通过pid杀死进程
  cd /proc/pid # 通过pid查看进程 然后执行 `ls -ail`
  ```

- Linux 查看进程树

  ```bash
  # 获取 gunicorn 进程树
  pstree -ap | grep gunicorn
  kill -9 [pid] # 退出进程
  kill -HUP [pid] # 重启进程
  ```

## CentOS7 修改 yum 镜像

- 步骤 1：备份本地 `yum` 源

  ```bash
  mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo_bak
  ```

- 步骤 2：获取阿里 `yum` 源配置文件

  ```bash
  wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
  ```

- 步骤 3：更新 cache，使新镜像生效

  ```bash
  yum makecache
  ```

- 步骤 4：查看

  ```bash
  yum -y update
  ```

- 完成

## ubuntu 修改 apt-get 源

- 备份

  ```bash
  cp /etc/apt/sources.list /etc/apt/sources.list.bak
  ```

- 修改源

  ```bash
  # 阿里云
  deb http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse
  deb http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse
  deb http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse
  deb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse
  deb http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse
  deb-src http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse
  deb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse
  deb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse
  deb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse
  deb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse

  # 清华大学
  deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial main restricted
  deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-updates main restricted
  deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial universe
  deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-updates universe
  deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial multiverse
  deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-updates multiverse
  deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-backports main restricted universe multiverse
  deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-security main restricted
  deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-security universe
  deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-security multiverse
  ```

- 测试

  ```bash
  sudo apt-get update
  ```

- 完成

## 查看 Linux 系统版本的命令

- 方法 1

  此命令也适用于所有的 Linux 发行版

  ```bash
  cat /etc/issue
  ```

- 方法 2

  这种方法只适合 redhat 系的 Linux

  ```bash
  cat /etc/redhat-release
  ```

- 方法 3

  可列出所有版本信息

  ```bash
  lsb_release -a
  ```

## 查看 Linux 内核版本命令

```bash
cat /proc/version
# 或者
uname -a
```

## 查看磁盘使用情况

`df` 命令作用是列出文件系统的整体磁盘空间使用情况。可以用来查看磁盘已被使用多少空间和还剩余多少空间。
`df` 命令显示系统中包含每个文件名参数的磁盘使用情况，如果没有文件名参数，则显示所有当前已挂载文件系统的磁盘空间使用情况

在默认情况下，磁盘空间是以 `1KB` 为单位进行显示的，但是，如果 `POSIXLY_CORRECT` 环境变量被设置为 `true` ，这种情况下默认使用 `512` 字节为单位显示

- `df` 命令语法

  df [选项][文件名]

  参数：

  - -a：--all，显示所有的文件系统，包括虚拟文件系统
  - -B：--block-size，指定单位大小。比如 1k，1m 等
  - -h：--human-readable，以人们易读的 GB、MB、KB 等格式显示
  - -H：--si，和-h 参数一样，但是不是以 1024，而是 1000，即 1k=1000，而不是 1k=1024
  - -i：--inodes，不用硬盘容量，而是以 inode 的数量来显示
  - -k：以 KB 的容量显示各文件系统，相当于--block-size=1k
  - -m：以 KB 的容量显示各文件系统，相当于--block-size=1m
  - -l：--local，只显示本地文件系统
  - --no-sync：在统计使用信息之前不调用 sync 命令(默认)
  - -sync：在统计使用信息之前调用 sync 命令
  - -P：--portability，使用 POSIX 格式显示
  - -t：--type=TYPE，只显示指定类型的文件系统
  - -T：--print-type，显示文件系统类型
  - -x：--exclude-type=TYPE，不显示指定类型的文件系统
  - --help：显示帮助信息
  - --version：显示版本信息

## 关机重启

关机/重启机器

```bash
shutdown
shutdown -r # 关机重启
shutdown -h # 关机不重启
shutdown now # 立刻关机
shutdown halt # 关机
shutdown reboot # 重启
```

## 压缩相关

打包压缩相关命令

```bash
gzip：
bzip2：
tar: 打包压缩
-c 归档文件
-x 缩文件
-z gzip压缩文件
-j bzip2压缩文件
-v 显示压缩或解压缩过程 v(view)
-f 使用档名
```

具体使用

```bash
tar -cvf /home/abc.tar /home/abc # 只打包，不压缩
tar -zcvf /home/abc.tar.gz /home/abc # 打包，并用 gzip 压缩
tar -jcvf /home/abc.tar.bz2 /home/abc # 打包，并用 bzip2 压缩
# 当然，如果想解压缩，就直接替换上面的命令 tar -cvf / tar -zcvf / tar -jcvf 中的“c” 换成“x” 就可以了。
```

wget 和 curl 区别：

`wget` 是一种下载工具，`wget` 是个专职的下载利器，简单，专一，极致；是 `Linux` 最常用的下载命令。

`curl` 是比 `wget` 工具功能更加丰富的工具，`curl` 是一个利用 `URL` 规则在命令行下工作的文件传输工具，可以说是一款很强大的 `http` 命令行工具。它支持文件的上传和下载，是综合传输工具。

wget 使用
一般的使用方法是: wget + 空格 + 要下载文件的 url 路径

下载文件

```bash
# O大写，不用O只是打印内容不会下载
curl -O http://man.linuxde.net/text.iso

# 不用参数，直接下载文件
wget http://www.linuxde.net/text.iso
```

下载文件并重命名

```bash
# o小写
curl -o rename.iso http://man.linuxde.net/text.iso
# O大写
wget -O rename.zip http://www.linuxde.net/text.iso
```

断点续传

```bash
# C大写
curl -O -C -URL http://man.linuxde.net/text.iso
# c 小写
wget -c http://www.linuxde.net/text.iso
```

显示响应头部信息

```bash
curl -I http://man.linuxde.net/text.iso
wget --server-response http://www.linuxde.net/test.iso
```

打包下载网站

```bash
wget --mirror -p --convert-links -P /var/www/html http://man.linuxde.net/
```

## wget 的使用

```bash
# GNU Wget 1.14，非交互式的网络文件下载工具。
# 用法： wget [选项]... [URL]...

# 长选项所必须的参数在使用短选项时也是必须的。

# 启动：
  -V,  --version           # 显示 Wget 的版本信息并退出。
  -h,  --help              # 打印此帮助。
  -b,  --background        # 启动后转入后台。
  -e,  --execute=COMMAND   # 运行一个“.wgetrc”风格的命令。

# 日志和输入文件：
  -o,  --output-file=FILE    # 将日志信息写入 FILE。
  -a,  --append-output=FILE  # 将信息添加至 FILE。
  -d,  --debug               # 打印大量调试信息。
  -q,  --quiet               # 安静模式 (无信息输出)。
  -v,  --verbose             # 详尽的输出 (此为默认值)。
  -nv, --no-verbose          # 关闭详尽输出，但不进入安静模式。
       --report-speed=TYPE   # Output bandwidth as TYPE.  TYPE can be bits.
  -i,  --input-file=FILE      # 下载本地或外部 FILE 中的 URLs。
  -F,  --force-html          # 把输入文件当成 html 文件。
  -B,  --base=URL            # 解析与 URL 相关的
                            # html 输入文件 (由 -i -F 选项指定)。
       --config=FILE         # Specify config file to use.

# 下载：
  -t,  --tries=NUMBER            # 设置重试次数为 NUMBER (0 代表无限制)。
       --retry-connrefused       # 即使拒绝连接也是重试。
  -O,  --output-document=FILE    # 将文档写入 FILE。
  -nc, --no-clobber              # skip downloads that would download to existing files (overwriting them).
  -c,  --continue                # 断点续传下载文件。
       --progress=TYPE           # 选择进度条类型。
  -N,  --timestamping            # 只获取比本地文件新的文件。
  --no-use-server-timestamps     # 不用服务器上的时间戳来设置本地文件。
  -S,  --server-response         # 打印服务器响应。
       --spider                  # 不下载任何文件。
  -T,  --timeout=SECONDS         # 将所有超时设为 SECONDS 秒。
       --dns-timeout=SECS        # 设置 DNS 查寻超时为 SECS 秒。
       --connect-timeout=SECS    # 设置连接超时为 SECS 秒。
       --read-timeout=SECS       # 设置读取超时为 SECS 秒。
  -w,  --wait=SECONDS            # 等待间隔为 SECONDS 秒。
       --waitretry=SECONDS       # 在获取文件的重试期间等待 1..SECONDS 秒。
       --random-wait             # 获取多个文件时，每次随机等待间隔 0.5*WAIT...1.5*WAIT 秒。
       --no-proxy                # 禁止使用代理。
  -Q,  --quota=NUMBER            # 设置获取配额为 NUMBER 字节。
       --bind-address=ADDRESS    # 绑定至本地主机上的 ADDRESS (主机名或是 IP)。
       --limit-rate=RATE         # 限制下载速率为 RATE。
       --no-dns-cache            # 关闭 DNS 查寻缓存。
       --restrict-file-names=OS  # 限定文件名中的字符为 OS 允许的字符。
       --ignore-case             # 匹配文件/目录时忽略大小写。
  -4,  --inet4-only              # 仅连接至 IPv4 地址。
  -6,  --inet6-only              # 仅连接至 IPv6 地址。
       --prefer-family=FAMILY    # 首先连接至指定协议的地址 FAMILY 为 IPv6，IPv4 或是 none。
       --user=USER               # 将 ftp 和 http 的用户名均设置为 USER。
       --password=PASS           # 将 ftp 和 http 的密码均设置为 PASS。
       --ask-password            # 提示输入密码。
       --no-iri                  # 关闭 IRI 支持。
       --local-encoding=ENC      # IRI (国际化资源标识符) 使用 ENC 作为本地编码。
       --remote-encoding=ENC     # 使用 ENC 作为默认远程编码。
       --unlink                  # remove file before clobber.

# 目录：
  -nd, --no-directories           # 不创建目录。
  -x,  --force-directories        # 强制创建目录。
  -nH, --no-host-directories      # 不要创建主目录。
       --protocol-directories     # 在目录中使用协议名称。
  -P,  --directory-prefix=PREFIX  # 以 PREFIX/... 保存文件
       --cut-dirs=NUMBER          # 忽略远程目录中 NUMBER 个目录层。

# HTTP 选项：
       --http-user=USER        # 设置 http 用户名为 USER。
       --http-password=PASS    # 设置 http 密码为 PASS。
       --no-cache              # 不在服务器上缓存数据。
       --default-page=NAME     # 改变默认页 (默认页通常是“index.html”)。
  -E,  --adjust-extension      # 以合适的扩展名保存 html/CSS 文档。
       --ignore-length         # 忽略头部的‘Content-Length’区域。
       --header=STRING         # 在头部插入 STRING。
       --max-redirect          # 每页所允许的最大重定向。
       --proxy-user=USER       # 使用 USER 作为代理用户名。
       --proxy-password=PASS   # 使用 PASS 作为代理密码。
       --referer=URL           # 在 HTTP 请求头包含‘Referer: URL’。
       --save-headers          # 将 HTTP 头保存至文件。
  -U,  --user-agent=AGENT      # 标识为 AGENT 而不是 Wget/VERSION。
       --no-http-keep-alive    # 禁用 HTTP keep-alive (永久连接)。
       --no-cookies            # 不使用 cookies。
       --load-cookies=FILE     # 会话开始前从 FILE 中载入 cookies。
       --save-cookies=FILE     # 会话结束后保存 cookies 至 FILE。
       --keep-session-cookies  # 载入并保存会话 (非永久) cookies。
       --post-data=STRING      # 使用 POST 方式；把 STRING 作为数据发送。
       --post-file=FILE        # 使用 POST 方式；发送 FILE 内容。
       --content-disposition   # 当选中本地文件名时 允许 Content-Disposition 头部 (尚在实验)。
       --content-on-error      # output the received content on server errors.
       --auth-no-challenge     # 发送不含服务器询问的首次等待的基本 HTTP 验证信息。

# HTTPS (SSL/TLS) 选项：
       --secure-protocol=PR    # choose secure protocol, one of auto, SSLv2,SSLv3, TLSv1, TLSv1_1 and TLSv1_2.
       --no-check-certificate   # 不要验证服务器的证书。
       --certificate=FILE       # 客户端证书文件。
       --certificate-type=TYPE  # 客户端证书类型，PEM 或 DER。
       --private-key=FILE       # 私钥文件。
       --private-key-type=TYPE  # 私钥文件类型，PEM 或 DER。
       --ca-certificate=FILE    # 带有一组 CA 认证的文件。
       --ca-directory=DIR       # 保存 CA 认证的哈希列表的目录。
       --random-file=FILE       # 带有生成 SSL PRNG 的随机数据的文件。
       --egd-file=FILE          # 用于命名带有随机数据的 EGD 套接字的文件。

# FTP 选项：
       --ftp-user=USER         # 设置 ftp 用户名为 USER。
       --ftp-password=PASS     # 设置 ftp 密码为 PASS。
       --no-remove-listing     # 不要删除‘.listing’文件。
       --no-glob               # 不在 FTP 文件名中使用通配符展开。
       --no-passive-ftp        # 禁用“passive”传输模式。
       --preserve-permissions  # 保留远程文件的权限。
       --retr-symlinks         # 递归目录时，获取链接的文件 (而非目录)。

# WARC options:
       --warc-file=FILENAME      # save request/response data to a .warc.gz file.
       --warc-header=STRING      # insert STRING into the warcinfo record.
       --warc-max-size=NUMBER    # set maximum size of WARC files to NUMBER.
       --warc-cdx                # write CDX index files.
       --warc-dedup=FILENAME     # do not store records listed in this CDX file.
       --no-warc-compression     # do not compress WARC files with GZIP.
       --no-warc-digests         # do not calculate SHA1 digests.
       --no-warc-keep-log        # do not store the log file in a WARC record.
       --warc-tempdir=DIRECTORY  # location for temporary files created by the WARC writer.

# 递归下载：
  -r,  --recursive          # 指定递归下载。
  -l,  --level=NUMBER       # 最大递归深度 (inf 或 0 代表无限制，即全部下载)。
       --delete-after       # 下载完成后删除本地文件。
  -k,  --convert-links      # 让下载得到的 html 或 CSS 中的链接指向本地文件。
  --backups=N   # before writing file X, rotate up to N backup files.
  -K,  --backup-converted  #  在转换文件 X 前先将它备份为 X.orig。
  -m,  --mirror             # -N -r -l inf --no-remove-listing 的缩写形式。
  -p,  --page-requisites    # 下载所有用于显示 HTML 页面的图片之类的元素。
       --strict-comments    # 用严格方式 (SGML) 处理 html 注释。

# 递归接受/拒绝：
  -A,  --accept=LIST               # 逗号分隔的可接受的扩展名列表。
  -R,  --reject=LIST               # 逗号分隔的要拒绝的扩展名列表。
       --accept-regex=REGEX        # regex matching accepted URLs.
       --reject-regex=REGEX        # regex matching rejected URLs.
       --regex-type=TYPE           # regex type (posix|pcre).
  -D,  --domains=LIST              # 逗号分隔的可接受的域列表。
       --exclude-domains=LIST      # 逗号分隔的要拒绝的域列表。
       --follow-ftp                # 跟踪 HTML 文档中的 FTP 链接。
       --follow-tags=LIST          # 逗号分隔的跟踪的 html 标识列表。
       --ignore-tags=LIST          # 逗号分隔的忽略的 html 标识列表。
  -H,  --span-hosts                # 递归时转向外部主机。
  -L,  --relative                  # 只跟踪有关系的链接。
  -I,  --include-directories=LIST  # 允许目录的列表。
  --trust-server-names             # use the name specified by the redirection url last component.
  -X,  --exclude-directories=LIST  # 排除目录的列表。
  -np, --no-parent                 # 不追溯至父目录。
```

`wget` 主要用于下载文件，在安装软件时会经常用到，以下对 `wget` 做简单说明

- 下载单个文件：

  ```bash
  wget http://www.baidu.com # 命令会直接在当前目录下载一个index.html的文件
  ```

- 将下载的文件存放到指定的文件夹下，同时重命名下载的文件，利用`-O`

  ```bash
  wget -O /home/index http://www.baidu.com
  ```

- 下载多个文件
  首先，创建一个 `url.txt` 文件

  ```bash
  touch url.txt

  # 一个文件里多个 url
  echo "http://www.baidu.com" > url.txt
  echo "http://www.baidu.com" >> url.txt

  # 下载多个文件
  wget -i url.txt

  # 下载多个文件时拒绝下载超过设置大小的文件
  # 注意：此选项只能在下载多个文件时有用，当你下载一个文件时没用
  wget -Q5m -i url.txt
  ```

- 后台下载

  `wget -b url` 命令执行后会，下载的详细信息不会显示在终端，会在当前目录下生成一个 `web-log` 记录下载的详细信息。

  ```bash
  wget -b http://www.baidu.com

  # 查看下载进度
  tail -f wget-log
  ```

  另存下载信息到某个文件

  ```bash
  wget -o dw.txt http://www.baidu.com
  ```

- 断点续传
  使用 `wget -c url` 重启下载中断的文件

  ```bash
  wget -c http://www.baidu.com
  ```

- 限制下载的的速度

  ```bash
  wget --limit-rate=100k -O zfj.html http://www.baidu.com
  ```

- 测试是否能正常访问

  ```bash
  wget --spider http://www.baidu.com
  ```

- 设置下载重试的次数

  ```bash
  wget --tries=3 http://www.baidu.com
  ```

- 下载一个完整的网站，即当前页面所依赖的所有文件

  ```bash
  wget --mirror -p --convert-links -P./test http://localhost

  # --mirror:打开镜像选项
  # -p:下载所有用于显示给定网址所必须的文件
  # --convert-links：下载以后，转换链接用于本地显示
  # -P LOCAL_DIR：保存所有的文件或目录到指定的目录下
  ```

- 下载的过程中拒绝下载指定类型的文件

  ```bash
  wget --reject=png --mirror -p --convert-links -P./test http://localhost
  ```

- 从指定网站中下载所有指定类型的文件

  ```bash
  wget -r -A .png http://www.baidu.com
  ```

- `wget` 下载时，某些资源必须使用 `--no-check-certificate http://www.baidu.com`

- 使用 `wget` 实现 `FTP` 下载

  ```bash
  wget --file-user=USERNAME --file-password=PASSWORD url
  ```

![常用命令总结](https://cdn.clearlywind.com/blog-images/images/linux-commands.png)
