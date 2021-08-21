---
title: js 中 EventLoop 的理解
date: 2018-07-15 18:29:38
updated: 2020-11-27 10:23:08
tags: ['js', 'nodejs', 'EventLoop']
category:
  - 编程笔记
slug: get-to-know-event-loop-in-javascript
thumbnail: '../../../thumbnails/event-loop.png'
---

`js` 是单线程语言，也就是说同时只能做一件事。

## Event Loop

`Event Loop` 是一个执行模型，在不同的地方有不同的实现。浏览器和 `NodeJS` 基于不同的技术实现了各自的 `Event Loop`

- 浏览器的 `Event Loop` 是在 `html5` 的规范中明确定义
- `NodeJS` 的 `Event Loop` 是基于 `libuv` 实现的。可以参考 `Node` 的官方文档以及 `libuv` 的官方文档
- `libuv` 已经对 `Event Loop` 做出了实现，而 `HTML5` 规范中只是定义了浏览器中 `Event Loop` 的模型，具体的实现留给了浏览器厂商

事件循环流程：

1. 首先 `js` 代码在执行，进入`执行栈`，其中可能包括一些 `同步` 和 `异步` 的任务
2. 执行同步代码，执行完出栈
3. 异步任务部分，包括 `ajax` 和 `setTimeout`，当代码调用这些 `api` 的时候，`webapi` 来处理这些问题，执行栈继续执行
4. 当异步任务有了结果，`webapi` 会把异步任务对应的回调函数放到 `任务队列` 中
5. 当执行栈为空时，读取 `任务队列` 中的第一个函数，压入执行栈

`步骤 5` 会不断重复运作，执行栈为空时，系统就去任务队列中拿第一个函数压入栈继续执行。这个过程不断重复，这就是事件循环（`Event Loop`）

来个 🌰：

```js
console.log(1);
setTimeout(() => {
  console.log(2);
}, 2000);
console.log(3);

// console.log(1) 同步任务，输出1
// setTimeout异步任务，交给webapis去处理，2s后，console.log(2)进入任务队列
// console.log(3)同步任务，输出3
// 执行栈为空，系统读取任务队列里的事件
// 执行console,log(2),输出2
```

## 宏任务&微任务

- 常见的宏任务： `script(整个脚本)` 、 `setTimeout` 、 `setInterval` 、 `setImmediate` 、`I/O` 、`UI rendering`

- 微任务包括： `MutationObserver` 、 `Promise.then()` 或 `reject()` 、`catch finally`, `Promise` 为基础开发的其它技术，比如 `fetch API` 、 `V8 的垃圾回收过程`、 `Node` 独有的 `process.nextTick`

> 注意： `process.nextTick` 是有一个插队操作的，就是说他进入微任务队列时，会插到除了 `process.nextTick` 其他的微任务前面

<!--  -->

> 所以我们上面提到的任务队列，是包括一个宏任务队列和一个微任务队列的。每次执行栈为空的时候，系统会优先处理`微任务队列`，处理完微任务队列里的所有任务，再去处理 `宏任务`

## 执行顺序

1. 一开始整个脚本作为一个宏任务执行

2. 执行过程中同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列

3. 当前宏任务执行完出队，检查微任务列表，有则依次执行，直到全部执行完

4. 执行浏览器 UI 线程的渲染工作

5. 检查是否有 Web Worker 任务，有则执行

6. 执行完本轮的宏任务，回到 2，依此循环，直到宏任务和微任务队列都为空

> 注意 🚨：在所有任务开始的时候，由于宏任务中包括了 script，所以浏览器会先执行一个宏任务，在这个过程中你看到的延迟任务(例如 setTimeout)将被放到下一轮宏任务中来执行。

## 任务队列

同步任务是指：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务。

异步任务指的是，不进入主线程、而进入"任务队列"的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行

### 宏队列和微队列

宏队列（macrotask），也叫 `tasks` 。 一些异步任务的回调会依次进入宏队列，等待后续被调用，这些异步任务包括：

- setTimeout
- setInterval
- setImmediate (Node 独有)
- requestAnimationFrame (浏览器独有)
- I/O
- UI rendering (浏览器独有)

微队列（microtask），也叫 `jobs` 。 另一些异步任务的回调会依次进入微队列，等待后续被调用，这些异步任务包括：

- process.nextTick (Node 独有)
- Promise (其实 Promise 的 then 和 catch 才是 microtask，本身的内部代码不是)
- Object.observe
- MutationObserver

Node 规定，`process.nextTick` 和 `Promise` 的回调函数，追加在本轮循环，即同步任务一旦执行完成，就开始执行它们。而 `setTimeout` 、 `setInterval` 、 `setImmediate` 的回调函数，追加在次轮循环

[参考地址-思否](https://segmentfault.com/a/1190000016278115?tt_from=weixin&utm_source=weixin&utm_medium=toutiao_ios&utm_campaign=client_share&wxshare_count=1)

[参考地址-掘金](https://juejin.cn/post/6844903832762187783)
