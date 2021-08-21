---
title: React 的事件机制
slug: react-event
date: 2020-11-22 11:11:11
tag:
  - React
thumbnail: '../../thumbnails/react.png'
---

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
