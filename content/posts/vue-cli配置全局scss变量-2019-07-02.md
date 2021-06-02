---
title: vue-cli 配置全局 scss 变量
tags:
  - vue
  - vue-cli
  - scss
category:
  - 编程笔记
slug: vue-cli-configures-the-global-scss-variable
thumbnail: '../thumbnails/vue.png'
date: 2019-07-02 13:22:55
---

在 `vue.config.js` 文件中增加：

```js
// 此处配置只在 .vue 文件中生效，在单独的 .scss 文件中需要单独引入
module.exports = {
  // ...
  css: {
    loaderOptions: {
      sass: {
        /**
         * 这里引入只对于 .vue 文件中使用变量起作用，.scss 文件中需要单独引入
         */
        prependData: '@import "~@/styles/var.scss";',
      },
      // 是否开启 css module
    },
  },
  // ...
};
```
