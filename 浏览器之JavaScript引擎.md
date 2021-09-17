---
title: 浏览器原理之 JavaScript 引擎
---

详细拆解一下 JavaScript 引擎的编译过程和渲染引擎，以及 EventLoop 的关系。

GUI 渲染线程与 JavaScript 引擎线程互斥的，由于 JavaScript 是可操纵 DOM 的，如果在修改这些元素属性同时渲染界面(即 JS 线程和 GUI 线程同时运行)，那么渲染线程前后获得的元素数据就可能不一致了。为了防止渲染出现不可预期的结果，浏览器设置 GUI 渲染线程与 JS 引擎为互斥的关系，当 JS 引擎执行时 GUI 线程会被挂起，GUI 更新则会被保存在一个队列中等到 JS 引擎线程空闲时立即被执行

## JavaScript 文件加载

HTML 中引入 JavaScript 文件都是通过 script 标签，那么在渲染过程中遇到 script 标签渲染引擎是怎么处理的呢？

当解析到 script 标签时，浏览器会现在并且执行标签内引入的 JavaScript 文件，这个过程会阻塞 DOM 的构建。也就是说，在构建 DOM 时，HTML 解析器若遇到了 script 标签，那么它会暂停构建 DOM，然后浏览器下载 JavaScript 文件，将控制权移交给 JavaScript 引擎，等 JavaScript 引擎运行完毕，浏览器再从中断的地方恢复 DOM 构建和 CSSOM 的构建。

原本 DOM 和 CSSOM 的构建是互不影响，但是一旦引入了 JavaScript，CSSOM 也开始阻塞 DOM 的构建，只有 CSSOM 构建完毕后，渲染引擎再恢复 DOM 构建。

所以如果你想首屏渲染的越快，就越不应该在首屏就加载 JavaScript 文件，这也是都建议将 script 标签放在 body 标签底部的原因。当然在当下，并不是说 script 标签必须放在底部，你可以给 script 标签添加 defer 或者 async 属性来达到延迟加载的效果(后面会介绍 defer 和 async 属性的作用)。

因为 JavaScript 不只是可以改 DOM，它还可以更改样式，也就是它可以更改 CSSOM。前面我们介绍，不完整的 CSSOM 是无法使用的，但 JavaScript 中想访问 CSSOM 并更改它，那么在执行 JavaScript 时，必须要能拿到完整的 CSSOM。所以就导致了一个现象，如果浏览器尚未完成 CSSOM 的下载和构建，而我们却想在此时运行脚本，那么浏览器将延迟脚本执行和 DOM 构建，直至其完成 CSSOM 的下载和构建。也就是说，在这种情况下，浏览器会先下载和构建 CSSOM，然后再执行 JavaScript，最后在继续构建 DOM。

下面说一下浏览器是如何解析和执行 JavaScript 文件的，在 Chrome 中 JavaScript 是由 V8 引擎来解析并且执行的，下面我们了解一下 V8 引擎。

## v8 引擎

引擎包括 parser、解释器、gc 再加一个 JIT 编译器这几部分。

- parser

  负责把 javascript 源码转成 AST

- interperter

  解释器， 负责转换 AST 成字节码，并解释执行

- JIT compiler

  对执行时的热点函数进行编译，把字节码转成机器码，之后可以直接执行机器码

- gc（garbage collector）

  垃圾回收器，清理堆内存中不再使用的对象

### 编译

一般的 JavaScript 引擎的编译流水线是 parse 源码成 AST，之后 AST 转为字节码，解释执行字节码。运行时会收集函数执行的频率，对于到达了一定阈值的热点代码，会把对应的字节码转成机器码（JIT），然后直接执行。这就是 js 代码能够生效的流程。

## 渲染引擎

渲染时会把 html、css 分别用 parser 解析成 dom 和 cssom，然后合并到一起，并计算布局样式成绝对的坐标，生成渲染树，之后把渲染树的内容复制到显存就可以由显卡来完成渲染。

## 如何结合两者

不管是 JavaScript 引擎、还是渲染引擎，都比较傻（纯粹），JavaScript 引擎只会不断执行 JavaScript 代码，渲染引擎也是只会布局和渲染。但是要完成一个完整的网页应用，这两者都需要。 怎么综合两者呢？

思路有两种：

1. 多线程

   分为多个线程，主线程用来操作 ui 和渲染，其他线程用来执行一些任务（不能多个线程同时修改 ui，顺序没法控制）。

   - 安卓 ui 架构

     安卓就是这样的架构，在主线程里面完成 ui 的更新，事件的绑定，其他逻辑可以放到别的线程，然后完成以后在消息队列中放一个消息，主线程不断循环的取消息来执行。

JIT，全称是 Just In Time，混合使用编译器和解释器的技术。而编译器启动速度慢，执行速度快。而解释器的启动速度快，执行速度慢。而 JIT 技术就是博两者之长。如图示：

<!-- https://juejin.cn/post/6961349015346610184?share_token=6cd4ce16-8223-4afc-ba33-68ffacb9f531#heading-4 -->

## Vue 短板

Vue2.x 版本对 TypeScript 的支持是硬伤，而 TypeScript 对大型项目的保障能力是被普遍认可的，看到 Vue 没法支持，在选择技术栈时很容易放弃它。

一旦项目体量变大，Vue 的代码会变得更难以维护，真正在实践中 Options API 虽然在组件层面上，每个内容的职责都很清晰，这是 data，那是 method，但是从跨组件的角度来看就没那么好了，因此 Vue 2 缺少一种真正更好的抽象逻辑的办法，而非将代码搬到独立的 .js 文件里来缩减 SFC 代码行数。

optionAPI 劣势，模板语法需要指令标签的记忆，mixin 的混入变量查找困难的问题
