---
title: vue-cli 配置不同环境
tags:
  - vue
  - vue-cli
category:
  - 编程笔记
slug: vue-cli-is-configured-in-different-environments
thumbnail: '../../thumbnails/vue.png'
date: 2019-07-01 12:11:55
---

## 根据配置文件

`vue-cli@3^`中使用 `dotenv` 加载 `.env` 文件，其中只会载入以 `VUE_APP_`开头的变量，也可以通过 `cross-env` 写入临时环境变量

根据配置文件区分不同的环境

我们在项目根目录创建如下文件:

`.env.development` 和 `.env.production` 和 `.env.test`

每个文件的内容

`.env.development`

```js
// VUE_APP_CURRENT_MODE 当前环境变量
VUE_APP_CURRENT_MODE = 'development'
// 或者可以设置为
NODE_ENV = 'development'

VUE_APP_LOGOUT_URL = '自己的地址 '
VUE_APP_PARAMS = '自定义的参数'
```

`.env.production`

```js
// VUE_APP_CURRENT_MODE 当前环境变量
VUE_APP_CURRENT_MODE = 'production'
// 或者可以设置为
NODE_ENV = 'production'

VUE_APP_LOGOUT_URL = '自己的地址 '
VUE_APP_PARAMS = '自定义的参数'
```

...

## 如何进入我们定义环境

```json
"serve": "vue-cli-service serve --mode development",
"build": "vue-cli-service build --mode production",
// 也可以写入变量，要记得以 VUE_APP_ 开头
"dev":"cross-env VUE_APP_TARGET_PLATFORM=nginx npm run serve"
```

## 在应用中如何访问环境中的定义的变量

```js
const { NODE_ENV, VUE_APP_PARAMS } = process.env
console.log(NODE_ENV) // development
```
