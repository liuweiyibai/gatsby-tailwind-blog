---
title: 如何理解虚拟 DOM
tags:
  - React
  - Vue
category:
  - 编程笔记
slug: how-the-virtual-dom-works
date: 2017-11-14 17:56:28
thumbnail: '../../thumbnails/react.png'
---

## 什么是虚拟 DOM

`dom` 是很慢的，其元素非常庞大，页面的性能问题鲜有由 JavaScript 引起的，大部分都是由 `dom` 操作引起的。如果对前端工作进行抽象的话，主要就是维护状态和更新视图；而更新视图和维护状态都需要 `dom` 操作。其实近年来，前端的框架主要发展方向就是解放 `dom` 操作的复杂性。

在 jQuery 出现以前，我们直接操作 `dom` 结构，这种方法复杂度高，兼容性也较差；有了 jquery 强大的选择器以及高度封装的 API，我们可以更方便的操作 DOM，jQuery 帮我们处理兼容性问题，同时也使 dom 操作变得简单；但是聪明的程序员不可能满足于此，各种 MVVM 框架应运而生，有 angularJS、avalon、vue.js 等，MVVM 使用数据双向绑定，使得我们完全不需要操作 dom 了，更新了状态视图会自动更新，更新了视图数据状态也会自动更新，可以说 MMVM 使得前端的开发效率大幅提升，但是其大量的事件绑定使得其在复杂场景下的执行性能堪忧；有没有一种兼顾开发效率和执行效率的方案呢？ReactJS 就是一种不错的方案，虽然其将 js 代码和 html 代码混合在一起的设计有不少争议，但是其引入的 Virtual dom(虚拟 dom)却是得到大家的一致认同的。

## 理解虚拟 DOM

虚拟的 DOM 的核心思想是：对复杂的文档 DOM 结构，提供一种方便的工具，进行最小化地 DOM 操作。这句话，也许过于抽象，却基本概况了虚拟 DOM 的设计思想。

1. 提供一种方便的工具，使得开发效率得到保证
2. 保证最小化的 DOM 操作，使得执行效率得到保证

相对于 DOM 对象，原生的 JavaScript 对象处理起来更快，而且更简单。DOM 树上的结构、属性信息我们都可以很容易地用 JavaScript 对象表示出来：

```js
// 虚拟 DOM，参数分别为标签名、属性对象、子 DOM 列表
var VElement = function (tagName, props, children) {
  // 保证只能通过如下方式调用 new VElement
  if (!(this instanceof VElement)) {
    return new VElement(tagName, props, children);
  }
  //可以通过只传递tagName和children参数
  if (util.isArray(props)) {
    children = props;
    props = {};
  }

  //设置虚拟dom的相关属性
  this.tagName = tagName;
  this.props = props || {};
  this.children = children || [];
  this.key = props ? props.key : void 666;
  var count = 0;
  util.each(this.children, function (child, i) {
    if (child instanceof VElement) {
      count += child.count;
    } else {
      children[i] = '' + child;
    }
    count++;
  });
  this.count = count;
};
```

通过 VElement，我们可以很简单地用 JavaScript 来表示 DOM 结构。比如:

```js
var vdom = velement('div', { id: 'container' }, [
  velement('h1', { style: 'color:red' }, ['simple virtual dom']),
  velement('p', ['hello world']),
  velement('ul', [velement('li', ['item #1']), velement('li', ['item #2'])]),
]);
```

所以上面的代码表示的就是如下 DOM 结构:

```html
<div id="container">
  <h1 style="color:red">simple virtual dom</h1>
  <p>hello world</p>
  <ul>
    <li>item #1</li>
    <li>item #2</li>
  </ul>
</div>
```

同样我们可以很方便地根据虚拟 DOM 树构建出真实的 DOM 树。具体思路：根据虚拟 DOM 节点的属性和子节点递归地构建出真实的 DOM 树。见如下代码:

```js
VElement.prototype.render = function () {
  //创建标签
  var el = document.createElement(this.tagName);
  //设置标签的属性
  var props = this.props;
  for (var propName in props) {
    var propValue = props[propName];
    util.setAttr(el, propName, propValue);
  }

  //依次创建子节点的标签
  util.each(this.children, function (child) {
    //如果子节点仍然为velement，则递归的创建子节点，否则直接创建文本类型节点
    var childEl = child instanceof VElement ? child.render() : document.createTextNode(child);
    el.appendChild(childEl);
  });
  return el;
};
```

对一个虚拟的 dom 对象 VElement，调用其原型的 render 方法，就可以产生一颗真实的 DOM 树。

```js
vdom.render();
```

既然我们可以用 JavaScript 对象表示 DOM 结构，那么当数据状态发生变化而需要改变 DOM 结构时，我们先通过 JavaScript 对象表示的虚拟 DOM 计算出实际 DOM 需要做的最小变动，然后再操作实际 DOM，从而避免了可能大量对的 DOM 更新操作带来的性能问题。

比较两棵虚拟 DOM 树的差异，在用 JavaScript 对象表示 DOM 结构后，当页面状态发生变化而需要操作 DOM 时，我们可以先通过虚拟 DOM 计算出对真实 DOM 的最小修改量，然后再修改真实 DOM 结构(因为真实 DOM 的操作代价太大)。

如下图所示，两个虚拟 DOM 之间的差异已经标红：

为了便于说明问题，我当然选取了最简单的 DOM 结构，两个简单 DOM 之间的差异似乎是显而易见的，但是真实场景下的 DOM 结构很复杂，我们必须借助于一个有效的 DOM 树比较算法。

设计一个 diff 算法有两个要点：
（1）如何比较两个两棵 DOM 树
（2）如何记录节点之间的差异

1. 如何比较两个两棵 DOM 树
   计算两棵树之间差异的常规算法复杂度为 O(n3)，一个文档的 dom 结构有上百个节点是很正常的情况，这种复杂度无法应用于实际项目。针对前端的具体情况：我们很少跨级别的修改 dom 节点，通常是修改节点的属性、调整子节点的顺序、添加子节点等。因此，我们只需要对同级别节点进行比较，避免了 diff 算法的复杂性。对同级别节点进行比较的常用方法是深度优先遍历：

   ```js
   function diff(oldTree, newTree) {
     //节点的遍历顺序
     var index = 0;
     //在遍历过程中记录节点的差异
     var patches = {};
     //深度优先遍历两棵树
     dfsWalk(oldTree, newTree, index, patches);
     return patches;
   }
   ```

2. 如何记录节点之间的差异
   由于我们对 dom 树采取的是同级比较，因此节点之间的差异可以归结为 4 种类型：

   1. 修改节点属性, 用 PROPS 表示
   2. 修改节点文本内容, 用 TEXT 表示
   3. 替换原有节点, 用 REPLACE 表示
   4. 调整子节点，包括移动、删除等，用 REORDER 表示

   对于节点之间的差异，我们可以很方便地使用上述四种方式进行记录，比如当旧节点被替换时：

   ```js
     {type:REPLACE,node:newNode}
   ```

   而当旧节点的属性被修改时：

   ```js
   {type:PROPS,props: newProps}
   ```

   在深度优先遍历的过程中，每个节点都有一个编号，如果对应的节点有变化，只需要把相应变化的类别记录下来即可。下面是具体实现：

   ```js
   function dfsWalk(oldNode, newNode, index, patches) {
     var currentPatch = [];
     if (newNode === null) {
       //依赖listdiff算法进行标记为删除
     } else if (util.isString(oldNode) && util.isString(newNode)) {
       if (oldNode !== newNode) {
         //如果是文本节点则直接替换文本
         currentPatch.push({
           type: patch.TEXT,
           content: newNode,
         });
       }
     } else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
       //节点类型相同
       //比较节点的属性是否相同
       var propsPatches = diffProps(oldNode, newNode);
       if (propsPatches) {
         currentPatch.push({
           type: patch.PROPS,
           props: propsPatches,
         });
       }
       //比较子节点是否相同
       diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
     } else {
       //节点的类型不同，直接替换
       currentPatch.push({ type: patch.REPLACE, node: newNode });
     }

     if (currentPatch.length) {
       patches[index] = currentPatch;
     }
   }
   ```

   比如对上文图中的两颗虚拟 dom 树，可以用如下数据结构记录它们之间的变化：

   ```js
   var patches = {
     1: { type: REPLACE, node: newNode }, //h1节点变成h5
     5: { type: REORDER, moves: changObj }, //ul新增了子节点li
   };
   ```

3. 对真实 DOM 进行最小化修改

   通过虚拟 dom 计算出两颗真实 dom 树之间的差异后，我们就可以修改真实的 dom 结构了。上文深度优先遍历过程产生了用于记录两棵树之间差异的数据结构 patches, 通过使用 patches 我们可以方便对真实 dom 做最小化的修改。

   ```js
   //将差异应用到真实DOM
   function applyPatches(node, currentPatches) {
     util.each(currentPatches, function (currentPatch) {
       switch (currentPatch.type) {
         //当修改类型为REPLACE时
         case REPLACE:
           var newNode =
             typeof currentPatch.node === 'String'
               ? document.createTextNode(currentPatch.node)
               : currentPatch.node.render();
           node.parentNode.replaceChild(newNode, node);
           break;
         //当修改类型为REORDER时
         case REORDER:
           reoderChildren(node, currentPatch.moves);
           break;
         //当修改类型为PROPS时
         case PROPS:
           setProps(node, currentPatch.props);
           break;
         //当修改类型为TEXT时
         case TEXT:
           if (node.textContent) {
             node.textContent = currentPatch.content;
           } else {
             node.nodeValue = currentPatch.content;
           }
           break;
         default:
           throw new Error('Unknow patch type ' + currentPatch.type);
       }
     });
   }
   ```
