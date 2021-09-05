---
title: Vue diff 和 React diff 区别
date: 2020-08-26 20:55:23
category:
  - 编程笔记
tags: ['Vue', 'React']
slug: vue-diff-and-react-diff-difference
thumbnail: ''
---

所谓 diff，就是计算两颗树形结构差异并进行转换的过程。

Vue 和 React 都是根据 jsx 或者 template 编译成类 createElement 函数后生成虚拟的 dom 节点，然后这些虚拟 dom 节点放在一起生成一棵虚拟 dom 树，当数据发生变化时，会生成一棵新的虚拟 dom 树，然后通过 diff 算法，找出两棵树中的最小差别，然后实现更新到真实 dom 上，实现在真实 dom 的最小更新。
