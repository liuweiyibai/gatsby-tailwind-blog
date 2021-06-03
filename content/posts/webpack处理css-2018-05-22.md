---
title: webpack 处理 css
tags:
  - webpack
  - css
category:
  - 编程笔记
slug: webpack-handles-css
date: 2018-05-22 17:04:45
thumbnail: '../thumbnails/webpack.png'
---

![webpack 处理 css 流程](https://cdn.clearlywind.com/blog-images/images/webpack-handle-css.png)

使用 `webpack` 处理 `css`

## 安装

在项目中安装 `loader` 用来解析 `css`

```bash
npm install css-loader style-loader --save-dev
```

## 添加配置

然后在 `webpack.config.js` 的配置中添加：

```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          option: {
            module: true,
          },
        },
      ],
      // 先用 css-loader 加载 css 文件，再用 style-loader 添加在页面中
    },
  ];
}
```

## 两个 loader 的作用

- `css-loader` 使你能够使用类似`@import`和`url(...)`的方法实现 `require` 的功能
- `style-loader` 将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入 `webpack` 打包后的 `js` 文件中
- 我们这样配置后，遇到后缀为`.css`的文件， `webpack` 先用 `css-loader` 加载器去解析这个文件，遇到`@import`等语句就将相应样式文件引入（所以如果没有`css-loader`，就没法解析这类语句），最后计算完的 `css` ，将会使用 `style-loader` 生成一个内容为最终解析完的 `css` 代码的 `style` 标签，放到 `head` 标签里
- 需要注意的是， `loader` 是有顺序的， `webpack` 肯定是先将所有 `css` 模块依赖解析完得到计算结果再创建 `style` 标签。因此应该把 `style-loader` 放在 `css-loader` 的前面（ `Webpack loader` 的执行顺序是从右到左）

[关于 css-modules](/blog/about-css-modules)

## 单独将 css 文件打包

- 安装

  ```bash
  # webpack 4.0 以下
  npm install extract-text-webpack-plugin --save-dev

  # webpack 4.0 推荐使用
  npm i mini-css-extract-plugin --save-dev
  ```

  [mini-css-extract-plugin 文档地址](https://webpack.js.org/plugins/mini-css-extract-plugin/)

- 添加配置 `webpack@4.0` 以下

  ```js
  // 配置可以添加到 production 环境中，因为在生产环境最好将文件分离
  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  // loaders 配置中也应该使用该插件
  module:{
    rules:[{
        test:/\.css$/,
        use: ExtractTextPlugin.extract({
            // fallback: 编译后用什么loader来提取css文件
            fallback:"style-loader",
            use:[
                "css-loader",
                'autoprefixer-loader'
                ]
            // autoprefixer-loader是自动补充浏览器前缀，达到css兼容的目的
        }),
        test:/\.less$/,
        use: ExtractTextPlugin.extract({
            fallback:"style-loader",
            use:[
                    "css-loader",
                    'autoprefixer-loader',
                    'less-loader'
                ]
            // autoprefixer-loader是自动补充浏览器前缀，达到css兼容的目的
        })
    },
    // ...其他 loader
    ],
  },
  plugins:[
    new ExtractTextPlugin({
      // 打包输出的文件由配置文件中的 output 属性指定
      filename: "[name][hash].css"
    })
  ]
  ```

- `webpack@4.0` 配置

  都是通过 `loader` 来处理

  ```js
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const devMode = process.env.NODE_ENV !== 'production';

  module.exports = {
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/, // 可以打包后缀为sass/scss/css的文件
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // 这里可以指定一个 publicPath
                // 默认使用 webpackOptions.output 中的 publicPath
                // publicPath 的配置，和 plugins 中设置的filename和chunkFilename的名字有关
                // 如果打包后，background属性中的图片显示不出来，请检查 publicPath 的配置是否有误
                publicPath: './',
                // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
                hmr: devMode, // 仅dev环境启用HMR功能
              },
            },
            'css-loader',
            'post-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        // 这里的配置和webpackOptions.output中的配置相似
        // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
        filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
        chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
      }),
    ],
  };
  ```

## 关于 postcss

[关于 postcss](/blog/what-is-postcss)
