---
title: postcss 是什么
tags:
  - css
  - postcss
  - css3
category:
  - 编程笔记
slug: what-is-postcss
date: 2018-08-16 14:18:16
thumbnail: '../../thumbnails/postcss.png'
---

![postcss](https://cdn.clearlywind.com/blog-images/images/postcss.png)

首先， `postcss` 和 `styl` 、 `Scss` 、以及 `less` 等预处理工具，差别在哪里

## 🚀css 预处理

`css` 是没有变量和作用域的，所以看起来不像一门语言，所以便有了 `css` 预处理器的出现。旨在帮助开发者更爽的写 `css`

## 🚁postcss

它支持静态检查 `css` ，支持变量和混入`mixins`，能让你使用现在还未被浏览器支持的未来 `css` 语法，内联图像等等。例如使用最为广泛的 `Autoprefixer` ，它只是 `postcss` 的一个插件

学过编译型语言的人都知道，代码会被转化成机器码或者中间码，你写的代码，不是最终运行在机器上的代码（二进制）。 `postcss` 就是一种类似编译的过程（应该叫转译）。它的目的是让你的代码更可靠（Bug 更少、兼容性更高甚至功能更强大）。 `postcss` 就可以认为是 `css` 的「编译器」。

- `postcss` 就是 `css` 界的 `babel`
- `postcss` 是用来处理你的 `css` ，让你的 `css` 更加健壮的
- `postcss` 就是用来处理 `css` ，比如，自动给你的 `css` 代码增加浏览器前缀等等

![postcss工作流程](https://cdn.clearlywind.com/blog-images/images/postcss-work-flow.jpg)

## postcss 的配置以及使用

- 不使用 **webpack**

  你使用 `postcss` 是为了用里面的插件来强化你的 `css`

  安装 `postcss` 以及插件

  ```bash
  npm i --save-dev postcss
  npm i --save-dev postcss-cli
  npm i --save-dev autoprefixer
  ```

  新建一个 `style/index.css` 文件 随便写点 `css` 样式放进去

  ```css
  body {
    margin: 0;
    padding: 0;
    transform: translate(3d);
  }
  ```

  然后在项目根目录中跑命令

  ```bash
  npx postcss ./style/index.css -o ./style/dist.css -u autoprefixer
  ```

  将会在 `style/` 中新建一个`dist.css`文件来保存处理后的 `css`

  ```css
  body {
    margin: 0;
    padding: 0;
    -webkit-transform: translate(3d);
    transform: translate(3d);
  }
  ```

  但是为了避免我们每次使用该插件都要在 `shell` 中添加配置，所以在项目根目录要添加一个 `postcss` 的配置文件 `.postcssrc.js`

  ```js
  module.exports = {
    plugins: {
      autoprefixer: {
        browsers: ['last 7 iOS versions', 'last 3 versions', '> 1%']
      }
    }
  }
  ```

  然后直接执行如下命令，能得到和上面处理一样的结果

  ```bash
  npx postcss ./style/index.css -o ./style/dist.css
  ```

- 在 **webpack** 使用

  使用预处理语言 `scss`或者 `less` 等。 `webpack` 的 `loader` 是从右向左加载的，所以要先处理预处理语言，然后在使用 `postcss` 来处理

  ```js
  module.exports = {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'scss-loader']
      },
      {
        test: /\.scss|css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader?sourceMap', 'resolve-url-loader', 'sass-loader?sourceMap']
      }
    ]
  }
  ```
