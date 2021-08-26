---
title: React 的事件机制
slug: react-event
date: 2020-11-22 11:11:11
tag:
  - React
thumbnail: '../../thumbnails/react.png'
---

## React 绑定事件需要注意的问题

1. 为什么要手动绑定 this
2. React 事件和原生事件有什么区别，二者执行顺序？
3. React 事件如何解决跨浏览器兼容
4. 什么是合成事件

我们在使用 React 来开发时，绑定事件一般是直接通过属性的方式定义在组件或者元素上，比如：

```js
const log = args => console.log(args);
function App() {
  return <div onClick={log} />;
}
```

那上面这段代码所绑定的事件，是如何被编译的呢？

再比如：

<https://codesandbox.io/s/react-event-8lvpy?file=/src/App.js>

可以通过注释阻止冒泡语句，来看两个绑定事件的执行顺序。

可以看到通过 onClick 绑定的事件触发顺序，或者是阻止冒泡时没用触发调用，都很像事件委托，其实是 React 内部实现了一套合成事件机制，将绑定的事件进行分级、合成，最后委托到文档顶部元素上。

## 合成事件

React 根据 W3C 规范来定义自己的事件系统，其事件被称之为合成事件 (SyntheticEvent)。而其自定义事件系统的动机主要包含以下几个方面：

1. 抹平不同浏览器之间的兼容性差异。最主要的动机。
2. 事件"合成"，即事件自定义。事件合成既可以处理兼容性问题，也可以用来自定义事件（例如 React 的 onChange 事件）。
3. 提供一个抽象跨平台事件机制。类似 VirtualDOM 抽象了跨平台的渲染方式，合成事件（SyntheticEvent）提供一个抽象的跨平台事件机制。
4. 可以做更多优化。例如利用事件委托机制，几乎所有事件的触发都代理到了 document，而不是 DOM 节点本身，简化了 DOM 事件处理逻辑，减少了内存开销。（React 自身模拟了一套事件冒泡的机制）
5. 可以干预事件的分发。V16 引入 Fiber 架构，React 可以通过干预事件的分发以优化用户的交互体验。

> 「几乎」所有事件都代理到了 document，说明有例外，比如 audio、video 标签的一些媒体事件（如 onplay、onpause 等），是 document 所不具有，这些事件只能够在这些标签上进行事件进行代理，但依旧用统一的入口分发函数（dispatchEvent）进行绑定。
