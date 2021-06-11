---
title: vue 中 data 为什么是个函数
slug: why-is-data-a-function-in-vue
tags:
  - vue
category:
  - 编程笔记
thumbnail: '../../thumbnails/vue.png'
date: 2018-12-01 21:11:08
---

在学习 `vue` 的时候，一直纳闷一件事：组件的 `data` 数据为什么必须要以函数返回的形式，为什么不是简单的对象形式呢？遂带着问题去翻官方文档，文档中自然也写明了这么做的原因，本篇博文以官方文档给出的原因为基础，并加上具体的例子，来阐述这么设计的原因。

组件是可复用的 `vue` 实例，一个组件被创建好之后，就可能被用在各个地方，而组件不管被复用了多少次，组件中的 `data` 数据都应该是相互隔离，互不影响的，基于这一理念，组件每复用一次， `data` 数据就应该被复制一次，之后，当某一处复用的地方组件内 `data` 数据被改变时，其他复用地方组件的 `data` 数据不受影响，如下面这个例子：

```html
<template>
  <div class="title">
    <h1>按钮被点击了{{ count }}次</h1>
    <button v-on:click="count++">点击</button>
  </div>
</template>
<script>
  export default {
    name: 'BtnCount',
    data() {
      return {
        count: 0
      }
    }
  }
</script>
<style scoped>
  .title {
    background-color: red;
  }
</style>
```

该组件被复用了三次，但每个复用的地方组件内的 count 数据相互不受影响，它们各自维护各自内部的 count。

这是因为当 `data` 如此定义后，这就表示所有的组件实例共用了一份 `data` 数据，因此，无论在哪个组件实例中修改了 `data` ,都会影响到所有的组件实例。

组件中的 `data` 写成一个函数，数据以函数返回值形式定义，这样每复用一次组件，就会返回一份新的 `data` ，类似于给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。而单纯的写成对象形式，就使得所有组件实例共用了一份 `data` ，就会造成一个变了全都会变的结果。
