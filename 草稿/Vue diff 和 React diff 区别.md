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

## 虚拟 DOM

**什么是虚拟 DOM?**

首先，Virtual DOM 并没有完全实现 DOM，Virtual DOM 最主要的还是保留了 Element 之间的层次关系和一些基本属性。因为 DOM 实在是太复杂。所以 Virtual DOM 里每一个 Element 实际上只有几个属性组成了一个棵对象树。

**为什么会出现虚拟 DOM?**

我们都知道一个 HtmlElement 上的属性是很多的，包括事件和常见属性，如果对大量 DOM 元素做操作，可能会导致性能问题，并且 DOM 的几何排列过程可能造成浏览器的多次重排，导致占用过多浏览器资源。

如果我们对前端工作进行抽象的话，主要就是维护状态和更新视图；而更新视图和维护状态都需要对 DOM 进行操作。其实近年来，前端的框架主要发展方向就是解放 DOM 操作的复杂性。

在 jQuery 出现以前，我们直接操作 DOM 元素，这种方法复杂度高，因为要兼容各个浏览器的 API，

有了 jQuery 强大的选择器以及高度封装的 API，我们可以更方便的操作 DOM，jQuery 帮我们处理兼容性问题，同时也使 DOM 操作变得简单；

后来各种 MVVM 框架应运而生，有 AngularJS、Avalon、Vue.js 等。MVVM 使用数据双向绑定，使用数据去驱动视图更新，使得我们完全不需要操作 DOM 了，更新了状态视图会自动更新，更新了视图数据状态也会自动更新，可以说 MMVM 使得前端的开发效率大幅提升。

这些前端框架也引入了 SPA 应用的概念，由前端控制 URL，来展示不同的视图。当应用切换 URL 时，
