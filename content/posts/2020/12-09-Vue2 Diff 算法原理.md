---
title: Vue2 Diff 算法原理
date: 2020-12-09 20:29:44
category:
  - 编程笔记
tags: ['Vue']
slug: vue-2-diff-algorithm-principle
thumbnail: '../../thumbnails/vue.png'
---

## 简介

结合 Vue 源码，分析、梳理一下 Vue 的更新流程。其实主要是 Vue 在数据更新后 diff 的过程。

首先 new Vue()之后会进入初始化阶段，初始化的东西有很多，如我们的常见的生命周期，事件，属性与状态，计算属性与 watch，并实现数据的响应式。

初始化完成之后就是挂载阶段，如果是使用 template 模板并且处于运行时编译的状态，那么会进行编译阶段。

编译阶段由 parse, optimize, generate 组成，分别用来解析模板语法并生成 AST，标记静态节点以优化，将 AST 转化为 render function string 的过程，这样就准备完成了渲染 VNode 所需的 render function。

更新阶段主要由响应式支撑，当 render function string 时，因为会读取所需对象，会触发 getter 函数进行依赖收集，随后修改对象时，setter 会通知之前依赖收集的每一个 watcher，让他们调用 update 来更新视图。

再回到 render function string 那一步，它最终会转化为 VNode 并再度生成真实 DOM Node，而响应式更新后会通过 patch 比较，使用 Diff 算法统一将更新打包到真实的 DOM Tree 上。

这样就走完了整个 Vue 的流程。这里介绍一下 Diff 的过程，包括具体算法，再到具体更新到 dom 上

![Vue 更新流程](https://cdn.clearlywind.com/static/images/vue-update-process.png)

## Diff

当数据发生变化时，Vue 是怎么更新节点的呢？

修改 DOM 的开销是很大的，如果大量修改 DOM，会造成浏览器的回流或者重绘。如果我们只需要修改 DOM 中的某个节点，如何能提高 DOM 树更新效率，每次更新都采取最小更新策略，减少回流、重绘的次数，Diff 算法能够帮助我们。

我们先根据真实 DOM 生成一颗 Virtual DOM，当 Virtual DOM 某个节点的数据改变后会生成一个新的 VNode Vnode 和 oldVnode 作对比，发现有不一样的地方就直接修改在真实的 DOM 上，利用两棵树比较到最小差异来找到 DOM 树的更新点。

在 Vue 的 Diff 过程就是调用名为 patch 的函数，比较新旧节点，一边比较一边给真实的 DOM 打补丁。

当数据更新时会产生一个新的 VNode ，后新老两组 VNode 对比较，比较差别后，将差别更新到真实 DOM 上，VDom 因为是纯粹的 JavaScript 对象，所以操作它会很高效，但是 VDom 的变更最终会转换成 DOM 操作，为了实现高效的 DOM 操作，一套高效的虚拟 DOM Diff 算法显得很有必要。

在这之前，我们先了解完整的 VNode 都有什么属性，举个一个简单的例子:

```html
<div id="v" class="classA">
  <div>对应的 oldVnode 就是</div>
</div>
```

上面结构对应的 VNode

```js
var vnode = {
  // 对真实的节点的引用，本例中就是document.querySelector('#id.classA')
  el: div,

  // 节点的标签
  tagName: 'DIV',

  // 节点的选择器
  sel: 'div#v.classA',

  // 一个存储节点属性的对象，对应节点的el[prop]属性，例如onclick , style
  data: null,

  // 存储子节点的数组，每个子节点也是vnode结构
  children: [
    {
      el: div
      // 其他属性
    }
  ],

  // 如果是文本节点，对应文本节点的 textContent，否则为null
  text: null
}
```

## Diff 流程

![Vue 同级 diff](https://cdn.clearlywind.com/static/images/vue同级diff.png)

这是一张很经典的图，出自《React’s diff algorithm》，Vue 的 Diff 算法也同样，即仅在同级的 VNode 间做 Diff，递归地进行同级 VNode 的 Diff，最终实现整个 DOM 树的更新。那同级 VNode Diff 的细节又是怎样的呢？

在 Vue 中当数据发生改变时，set 方法会让调用 Dep.notify 通知所有订阅者 Watcher，订阅者就会调用 patch 给真实的 DOM 打补丁，更新相应的视图。

![Vue Diff 流程图](https://cdn.clearlywind.com/static/images/vue-diff-fluent.png)

## 具体代码

定义在 `vue/src/core/vdom/patch.js` 中：

```js
// patch 函数有两个参数，vnode 和 oldVnode，也就是新旧两个虚拟节点。
// 在这之前，我们先了解完整的vnode都有什么属性，举个一个简单的例子:
function patch(oldVnode, vnode) {
  // sameVnode 函数就是看这两个节点是否值得比较，代码相当简单：
  if (sameVnode(oldVnode, vnode)) {
    patchVnode(oldVnode, vnode)
  } else {
    // 当前oldVnode对应的真实元素节点
    const oEl = oldVnode.el
    let parentEle = api.parentNode(oEl) // 父元素
    createEle(vnode) // 根据Vnode生成新元素
    if (parentEle !== null) {
      api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)) // 将新元素添加进父元素
      api.removeChild(parentEle, oldVnode.el) // 移除以前的旧元素节点
      oldVnode = null
    }
  }
  // some code
  return vnode
}
```

patch 函数有两个参数，VNode 和 oldVnode，也就是新旧两个虚拟节点。

需要注意的是，el 属性引用的是此 Virtual DOM 对应的真实 DOM，patch 的 VNode 参数的 el 最初是 null，因为 patch 之前它还没有对应的真实 DOM。

最先比较是不是相同节点，看一下 sameVnode 实现，此函数就是看这两个节点是否值得比较，如下所示：

```js
/**
 * 两个 VNode 的 key 和 tag 相同才去比较它们，比如 p 和 span、div.classA 和 div.classB 都被认为是不同结构而不去比较它们
 */
function sameVnode(a, b) {
  return (
    a.key === b.key && // key值
    a.tag === b.tag && // 标签名
    a.isComment === b.isComment && // 是否为注释节点
    // 是否都定义了data，data包含一些具体信息，例如onclick , style
    isDef(a.data) === isDef(b.data) &&
    sameInputType(a, b) // 当标签是<input>的时候，type必须相同
  )
}
```

如果是相同节点会执行 patchVnode(oldVnode, vnode)。如果不值得比较，进入 patch 函数中的 else 逻辑。其过程是：

1. 取得 oldvnode.el 的父节点，parentEle 是真实 DOM
2. createEle(vnode)会为 VNode 创建它的真实 dom，令 vnode.el = 真实 DOM
3. parentEle 将新的 DOM 插入，移除旧的 DOM
   当不值得比较时，新节点直接把老节点整个替换了

如果两个节点都是一样的，那么就深入检查他们的子节点。如果两个节点不一样那就说明 VNode 完全被改变了，就可以直接替换 oldVnode。

虽然这两个节点不一样但是他们的子节点一样怎么办？别忘了，Diff 可是逐层比较的，如果第一层不一样那么就不会继续深入比较第二层了。

patch 最后会返回 VNode，VNode 和进入 patch 之前的不同在哪？就是 vnode.el，唯一的改变就是之前 vnode.el = null, 而现在它引用的是对应的真实 DOM。至此完成一个 patch 过程。

当我们确定两个节点相同之后，我们会给两个节点指定 patchVnode 方法：

```js
function patchVnode(oldVnode, vnode) {
  // 找到对应的真实dom，称为 el
  const el = (vnode.el = oldVnode.el)
  let i,
    oldCh = oldVnode.children,
    ch = vnode.children

  // 判断 Vnode 和 oldVnode 是否指向同一个对象，如果是，那么直接 return
  if (oldVnode === vnode) return

  // 如果他们都有文本节点并且不相等，那么将 el 的文本节点设置为 Vnode 的文本节点
  if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {
    api.setTextContent(el, vnode.text)
  } else {
    updateEle(el, vnode, oldVnode)

    if (oldCh && ch && oldCh !== ch) {
      // 如果 oldVnode 没有子节点而 Vnode 有，则将 Vnode 的子节点真实化之后添加到 el 如果两者都有子节点，则执行 updateChildren 函数比较子节点，这一步很重要
      updateChildren(el, oldCh, ch)
    } else if (ch) {
      createEle(vnode)
    } else if (oldCh) {
      // 如果 oldVnode 有子节点而 Vnode 没有，则删除 el 的子节点
      api.removeChildren(el)
    }
  }
}
```

<!-- https://juejin.cn/post/6844903961837699079#heading-4 -->

<!-- https://cloud.tencent.com/developer/article/1006029 -->

<!-- https://www.jb51.net/article/140471.htm -->

<!-- https://segmentfault.com/a/1190000020663531?utm_source=tag-newest -->

<!-- https://blog.fundebug.com/2019/06/26/vue-virtual-dom/ -->

<!-- https://segmentfault.com/a/1190000008782928 -->
