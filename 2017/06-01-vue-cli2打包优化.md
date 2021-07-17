---
title: vue-cli2 打包优化
tags:
  - vue
  - webpack
category:
  - 编程笔记
slug: vue-cli2-packaging-optimization
date: 2017-06-01 22:13:45
thumbnail: '../../thumbnails/vue.png'
---

平时我们开发时，`npm run dev`的环境是开发环境；而部署到线上时，`npm run build`的环境是生产环境，代码会被打包，放到新生成的 `dist` 文件夹下，但是有有时候打包出来的文件过大，我们就要想办法减少打包出来的项目体积

- 在`webpack.base`配置中新增图片压缩

  ```js
  //图片压缩
  new ImageminPlugin({
    // 在 development 环境下不可用，在 production 环境中可用
    disable: process.env.NODE_ENV !== 'production',
    pngquant: {
      quality: '95-100'
    }
  }),
  ```

- 在`webpack.pro`中新增配置优化，优化 `UglifyJs` 配置

  ```js
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      /*不显示控制台打印信息*/
      drop_debugger: true,
      drop_console: true,
      pure_funcs: ['console.log']
    },
    sourceMap: false
  })
  ```

- 在`webpack.pro`中隐藏源码`sourceMap`

  ```js
  // productionSourceMap: true改为productionSourceMap：false即可。
  ```

- 开启 `gZip` 压缩

  ```js
  productionGzip: true
  ```

- `Vue` 的异步组件和 `Webpack` 的代码分割功能，轻松实现路由组件的懒加载

  ```js
  // 路由肯定要按需加载
  component: resolve => require(['path/component.name'], resolve)
  // 如果某组件在多个地方引用到，那么最好是将组件抽成公共组件，在main.js中注册全局组件
  Vue.component('component-name', componentName)
  // 这样组件可在全局直接引用，不用每次先import又局部注册。
  ```

- 公共的 `css` 文件也是同样的道理

  > 对于一些公共的方法也可以使用 `mixin` 来进行混入

  ```js
  // css样式可以全局引入main.js中
  import base.css;
  import Echarts from 'echarts';
  // 引入方法注册在vue 原型上
  Vue.prototype = Echarts;
  ```
