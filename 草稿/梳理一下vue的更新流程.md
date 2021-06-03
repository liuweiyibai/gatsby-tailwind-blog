---
title: 梳理一下 vue 的更新流程
---

## 简介

结合 vue 源码, 分析一下 vue 中, 当数据更新时, 数据是如何驱动视图发生变化的

## 初始化

vue 在初始化阶段做了挺多事情, 配置合并, 初始化生命周期相关信息, 初始化事件中心, 初始化 data, 初始化 props, 初始化 computed, 初始化 watcher.

vue 在初始化 data 时进行了数据的 get、set 绑定，并创建了一个 Dep 对象

什么是Dep对象，Dep 对象用于依赖收集，它实现了一个发布订阅模式，完成了数据 Data 和渲染视图 Watcher 的订阅，我们一起来剖析一下

[图解 Vue 异步更新原理](https://segmentfault.com/a/1190000023649590)

[图解 Vue 响应式原理](https://segmentfault.com/a/1190000023514437)
