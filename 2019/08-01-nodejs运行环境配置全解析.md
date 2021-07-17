---
title: nodejs 运行环境配置全解析
date: 2019-08-01 12:00:00
tags: ['npm', 'yarn']
category:
  - 编程笔记
slug: nodejs-mirroring-related-configuration
thumbnail: '../../thumbnails/nodejs.png'
---

通常指代 `npm` 下载镜像配置

## 查看当前镜像

```bash
npm config get registry
yarn config get registry
```

## 查看所有 npm 配置

```bash
npm config ls # 获取所有 npm 配置
npm config get registry
yarn config get registry
npm config ls -i # 查看配置文件
```

## 永久修改镜像配置

- 通过命令配置

  ```bash
  npm config set registry https://registry.npm.taobao.org
  yarn config set registry https://registry.npm.taobao.org
  # 设置特定资源的镜像地址为 淘宝镜像
  npm config set disturl https://npm.taobao.org/dist/
  npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
  npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
  npm config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/
  npm config set chromedriver_cdnurl https://npm.taobao.org/mirrors/chromedriver/
  npm config set operadriver_cdnurl https://npm.taobao.org/mirrors/operadriver/
  npm config set python_mirror https://npm.taobao.org/mirrors/python/
  npm config set electron_builder_binaries_mirror https://npm.taobao.org/mirrors/electron-builder-binaries/
  npm config set node_sqlite3_binary_host_mirror https://npm.taobao.org/mirrors
  ```

- 通过配置文件修改镜像地址

  修改 `~/.npmrc`

  ```bash
  registry=https://registry.npm.taobao.org
  electron_mirror=https://npm.taobao.org/mirrors/electron/
  ```

  修改 `~/.yarnrc`

  ```bash
  registry "https://registry.npm.taobao.org"
  electron_mirror "https://npm.taobao.org/mirrors/electron/"
  ```

- 给某个包设置临时镜像

  比如安装 `express` 使用临时镜像

  ```bash
  npm --registry https://registry.npm.taobao.org install express
  yarn save express --registry https://registry.npm.taobao.org
  ```

## 特殊包的镜像设置

- `electron` 镜像设置

  ```bash
  npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
  yarn config set electron_mirror https://npm.taobao.org/mirrors/electron/
  ```

- `node-sass` 安装

  [淘宝镜像](https://npm.taobao.org/mirrors/)

  - 方案 1

    `node-sass`时在 `node scripts/install` 阶段会从 `github.com` 上下载一个 `.node` 文件，大部分安装不成功的原因都源自这里，因为 `GitHub Releases` 里的文件都托管在 `s3.amazonaws.com` 上面，而这个网址在国内总是网络不稳定，所以我们需要通过第三方服务器下载这个文件。

    首先，我们需要提前下载 `node-sass` 的二进制文件，这个文件可以去 `cnpm` 仓库下载或者 `node-sass` 的 `github` 上去下载，在下载之前我们需要先查看电脑的系统的版本，来确定适合哪个版本的二进制文件，查看版本的指令如下：

    ```bash
    node -p "[process.platform, process.arch, process.versions.modules].join('-')"
    ```

    输入这个指令后会弹出一个系统版本，比如我这弹出的是 `win32-x64-48`，则我就需要去以下两个地址中任意一个下载 ![win32-x64-48_binding.node]这个文件（后缀为 `.node` 的文件）到本地：

    [cnpm](https://npm.taobao.org/mirrors/node-sass/)

    [github](https://github.com/sass/node-sass/releases)

    下载完保存到任意位置，最好放置到 `package.json` 所在位置。然后我们需要手动指定 `node-sass` 二进制文件的下载源为下载的那个文件。比如我的是在 `e盘` 下的 `web` 文件夹内，以下是 `npm` 与 `yarn` 的指令：

    ```bash
    # npm 命令:
    npm config set sass-binary-path e:/web/

    # yarn 命令:
    yarn config set sass-binary-path e:/web/win32-x64-48_binding.node
    ```

    > 然后我们即可用正常指令下载了。注意：此方法会绑定为本地文件，即无法更新 `node-sass` 了。如果不希望这么做，请使用第二种方案。

  - 方案 2

    - 通过修改文件 `.npmrc` 和 `.yranrc` 两个文件 👍

      ```env
      sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
      phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
      electron_mirror=https://npm.taobao.org/mirrors/electron/
      chromedriver_cdnurl=http://npm.taobao.org/mirrors/chromedriver
      operadriver_cdnurl=http://npm.taobao.org/mirrors/operadriver
      node_sqlite3_binary_host_mirror=http://npm.taobao.org/mirrors
      puppeteer_download_host=https://npm.taobao.org/mirrors
      ```

    - 通过命令修改

      ```bash
      # npm
      npm config set sass-binary-site http://npm.taobao.org/mirrors/node-sass

      # yarn
      yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass
      ```

    - 直接写入环境变量配置文件中

      `.bashrc`、`.bash_profile` 等文件中修改，必须要大写变量名

      ```bash
      ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
      SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/
      PHANTOMJS_CDNURL=https://npm.taobao.org/mirrors/phantomjs/
      ```

## 其他问题

- `npm` 下载权限问题

  ```bash
  npm install electron --unsafe-perm=true
  ```

- 显示下载进度

  通过`--verbose`参数显示下载进度

  ```bash
  npm install --verbose electron
  yarn add --verbose electron
  ```

### MacOS 安装 node-gyp 出现的错误

在执行 `npm install` 的时候出现了下面的错误:

```bash
> npm install
...
No receipt for 'com.apple.pkg.CLTools_Executables' found at '/'.
No receipt for 'com.apple.pkg.DeveloperToolsCLILeo' found at '/'.
No receipt for 'com.apple.pkg.DeveloperToolsCLI' found at '/'.
...
```

如何解决：

- 安装 `Xcode`
- 执行 `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`
