---
title: 浏览器原理之 JavaScript 引擎
---

GUI 渲染线程与 JavaScript 引擎线程互斥的，由于 JavaScript 是可操纵 DOM 的，如果在修改这些元素属性同时渲染界面(即 JS 线程和 GUI 线程同时运行)，那么渲染线程前后获得的元素数据就可能不一致了。为了防止渲染出现不可预期的结果，浏览器设置 GUI 渲染线程与 JS 引擎为互斥的关系，当 JS 引擎执行时 GUI 线程会被挂起，GUI 更新则会被保存在一个队列中等到 JS 引擎线程空闲时立即被执行

### JavaScript 引擎

渲染过程中遇到 JavaScript 文件怎么处理？JavaScript 的加载、解析与执行会阻塞 DOM 的构建，也就是说，在构建 DOM 时，HTML 解析器若遇到了 JavaScript，那么它会暂停构建 DOM，将控制权移交给 JavaScript 引擎，等 JavaScript 引擎运行完毕，浏览器再从中断的地方恢复 DOM 构建。 JavaScript 文件不只是阻塞 DOM 的构建，它会导致 CSSOM 也阻塞 DOM 的构建。

所以如果你想首屏渲染的越快，就越不应该在首屏就加载 JavaScript 文件，这也是都建议将 script 标签放在 body 标签底部的原因。当然在当下，并不是说 script 标签必须放在底部，你可以给 script 标签添加 defer 或者 async 属性来达到延迟加载的效果(后面会介绍 defer 和 async 属性的作用)。

原本 DOM 和 CSSOM 的构建是互不影响，但是一旦引入了 JavaScript，CSSOM 也开始阻塞 DOM 的构建，只有 CSSOM 构建完毕后，DOM 再恢复 DOM 构建。

因为 JavaScript 不只是可以改 DOM，它还可以更改样式，也就是它可以更改 CSSOM。前面我们介绍，不完整的 CSSOM 是无法使用的，但 JavaScript 中想访问 CSSOM 并更改它，那么在执行 JavaScript 时，必须要能拿到完整的 CSSOM。所以就导致了一个现象，如果浏览器尚未完成 CSSOM 的下载和构建，而我们却想在此时运行脚本，那么浏览器将延迟脚本执行和 DOM 构建，直至其完成 CSSOM 的下载和构建。也就是说，在这种情况下，浏览器会先下载和构建 CSSOM，然后再执行 JavaScript，最后在继续构建 DOM。

在 Chrome 中 JavaScript 是由 V8 引擎来解析并且执行的。

下面我们了解一下 V8 引擎。
