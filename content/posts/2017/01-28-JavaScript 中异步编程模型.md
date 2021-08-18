---
title: JavaScript 异步编程模型
tags:
  - JavaScript
category:
  - 编程笔记
date: 2017-01-28 14:18:16
slug: common-asynchronous-programming-models-in-js
thumbnail: '../../thumbnails/js.png'
---

## 简介

异步编程一直是 JavaScript 中最重要的一部分，也是最为人诟病的一部分。多层回调就出现了回调地狱的问题，逻辑跳跃不易控制。为了使异步编程在编写上更加科学。各种方案层出不穷，从最原始的回调函数，到 Promise，再到 Generator 函数和 async/await。

## 回调函数

所谓的回调函数，意指先在系统的某个地方对函数进行注册，让系统知道这个函数的存在，然后在以后，当某个事件发生时，再调用这个函数对事件进行响应，具体代码:

```js
function f(num, callback) {
  if (num < 0) {
    alert('调用低层函数处理!');
    alert('分数不能为负,输入错误!');
  } else if (num == 0) {
    alert('调用低层函数处理!');
    alert('该学生可能未参加考试！');
  } else {
    alert('调用高层函数处理!');
    setTimeout(function () {
      callback();
    }, 1000);
  }
}
// 这里callback则是回调函数。
// 可以发现只有当num为非负数时候callback才会调用。
// 但是问题，如果我们不看函数内部，我们并不知道callback会几时调用，在什么情况下调用，代码间产生了一定耦合，流程上也会产生一定的混乱。虽然回调函数是一种简单而易于部署的实现异步的方法，但从编程体验来说它却不够好。
```

## 事件监听

发布订阅模式，也就是采用事件驱动，执行顺序取决于事件顺序。

```js
function EventTarget(){
  this.handlers = {};
}
EventTarget.prototype = {
  constructor: EventTarget,
  addHandler: function(type, handler){
    this.handlers[type] = [];
  },
  fire: function(){
    if(!event.target){
      event.target = this;
    }
    if(this.handlers[event.type instanceof Array]){
      var handlers = this.handlers[event.type];
      for(var i = 0, len = handlers.length, i < len; i++){
        handlers[i](event);
      }
    }
  },
  removeHandler: function(type, handler){
    if(this.handlers[type] instanceof Array){
      var handlers = this.handlers[type];
      for(var i = 0, le = handlers.length; i < len; i++){
        if(handlers[i] === handler){
          break;
        }
      }
      handlers.splice(i, 1);
    }
  }
};
// 上面是《JavaScript高级程序设计》中的自定义事件实现。
// 于是我们就可以通过addHandler来绑定事件处理函数，用fire来触发事件，用removeHandler来删除事件处理函数。
// 虽然通过事件解耦了，但流程顺序更加混乱了。
```

## 链式异步

链式操作异步解决了编程模型的执行流程不清晰的问题。`jQuery` 中 `$(document).ready` 就非常好的阐释了这一理念。`DOMCotentLoaded` 是一个事件，在 `DOM` 并未加载前，`jQuery` 的大部分操作都不会奏效，但 `jQuery` 的设计者并没有把他当成事件一样来处理，而是转成一种“选其对象，对其操作”的思路。`$` 选择了 `document` 对象，`ready` 是其方法进行操作。这样子流程问题就非常清晰了，在链条越后位置的方法就越后执行。

```js
(function () {
  var isReady = false; /* 判断onDOMReady方法是否已经被执行过 */
  var readyList = []; /* 把需要执行的方法先暂存在这个数组里 */
  var timer /* 定时器句柄 */,
    ready = function (fn) {
      if (isReady) fn.call(document);
      else
        readyList.push(function () {
          return fn.call(this);
        });
      return this;
    };
  var onDOMReady = function () {
    for (var i = 0; i < readyList.length; i++) {
      readyList[i].apply(document);
    }
    readyList = null;
  };
  var bindReady = function (evt) {
    if (isReady) return;
    isReady = true;
    onDOMReady.call(window);
    if (document.removeEventListener) {
      document.removeEventListener('DOMContentLoaded', bindReady, false);
    } else if (document.attachEvent) {
      document.detachEvent('onreadystatechange', bindReady);
      if (window == window.top) {
        clearInterval(timer);
        timer = null;
      }
    }
  };
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', bindReady, false);
  } else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function () {
      if (/loaded|complete/.test(document.readyState)) bindReady();
    });
    if (window == window.top) {
      timer = setInterval(function () {
        try {
          isReady || document.documentElement.doScroll('left'); //在IE下用能否执行doScroll判断dom是否加载完毕
        } catch (e) {
          return;
        }
        bindReady();
      }, 5);
    }
  }
})();
// 上面的代码不能用$(document).ready，而应该是window.ready。
```

## **Promise**

`CommonJS` 中的异步编程模型也延续了这一想法，每一个异步任务返回一个 `Promise` 对象，该对象有一个 `then` 方法，允许指定回调函数。

```js
f1().then(f2).then(f3);
// 这种方法我们无需太过关注实现，也不太需要理解异步，只要懂得通过函数选对象，通过then进行操作，就能进行异步编程。

// 实际使用
const fs = require('fs');
const path = require('path');
const p = new Promise((resolve, reject) => {
  fs.readFile(path.join(__dirname, './test.txt'), 'utf8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});
p.then(data => {
  console.log(data);
});
```

## **Generator + co**

`Generator` 的定义就是在 `function` 关键字与函数名之间有一个`＊`星号。函数体内部使用 `yield` 表达式，定义不同的内部状态（`yield` 在英语里的意思就是“产出”）。

在调用 `Generator` 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是遍历器对象（`Iterator Object`）。必须调用遍历器对象的 `next()` 方法，使得指针移向下一个状态，方法才会执行函数。

`next` 方法返回的对象带有两个属性，分别是 `done` 和 `value`。`done` 的值表示 `generator` 函数是否运行完。`value`对应的是`yield` 后面的值。

必须调用遍历器对象的 `next()` 方法，使得指针移向下一个状态。每次调用 `next` 方法，内部指针就从上一次停下来的地方开始执行，直到遇到下一个 `yield` 表达式（或 `return` 语句）为止。

换言之，`Generator` 函数是分段执行的，`yield` 表达式是暂停执行的标记，而 `next` 方法可以恢复执行。

下面面代码定义了一个 `Generator` 函数 `helloWorldGenerator`，它内部有两个 `yield` 表达式（`hello` 和 `world`），即该函数有三个状态：`hello`，`world` 和 `return` 语句（结束执行）。

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
var runGen = helloWorldGenerator();
console.log(runGen.next()); // 输出: {value: 'hello', done: false}；
console.log(runGen.next()); // 输出: {value: 'world', done: false}；
console.log(runGen.next()); // 输出: {value: 'ending', done: true}；
```

- `yield` 表达式

由于 `Generator` 函数返回的遍历器对象，只有调用 `next` 方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。`yield` 表达式就是暂停标志。

- `next` 方法

  1. 遇到 `yield` 表达式，就暂停执行后面的操作，并将紧跟在 `yield` 后面的那个表达式的值，作为返回的对象的 `value` 属性值。

  2. 下一次调用 `next` 方法时，再继续往下执行，直到遇到下一个 `yield` 表达式。

  3. 如果没有再遇到新的 `yield` 表达式，就一直运行到函数结束，直到 `return` 语句为止，并将 `return` 语句后面的表达式的值，作为返回的属性值。

  4. 如果该函数没有 `return` 语句，则返回的对象的 `value` 属性值为 `undefined`。

  `yield` 表达式后面的表达式，只有当调用 `next` 方法、内部指针指向该语句时才会执行，因此等于为 `js` 提供了手动的“惰性求值”（`Lazy Evaluation`）的语法功能。

- 异步

  `Generator` 本身并不具有异步执行的功能。它在异步中的主要应用，是管理异步回调的执行流程。

  使用 `Generator` 管理异步函数，如果必须保证前一个任务运行完后，才会执行下一步，就需要把 `next` 方法放到 `value` 属性里。

  ```js
  const timeout = () =>
    new Promise(resolve =>
      setTimeout(() => {
        console.log(1);
        resolve();
      }, 3000),
    );
  function* testGenerator() {
    yield timeout();
    yield console.log('2');
    return console.log('3');
  }

  var test = testGenerator();

  test.next().value.then(() => {
    test.next();
    test.next();
  });
  // 1 2 3
  ```

- `co` 是什么

  `co` 是用来自动执行 `Generator` 函数的工具。`Generator` 的好处是可以在定义函数时候就打上“断点”，调用函数时候可以在断点的地方暂停函数的执行。`Generator` 带来的问题是如何控制什么时候进行下一步调用。`co` 可以解决这个问题。`co` 模块可以将异步解改成同步。`co` 函数接受一个 `Generator` 函数作为参数，在函数内部自动执行 `yield` 。

  ```js
  const co = require('co');

  const timeout = () =>
    new Promise(resolve => {
      setTimeout(() => {
        console.log('我是异步函数');
        resolve();
      }, 3000);
    });

  function* helloWorldGenerator() {
    var a = Promise.resolve(1);
    var b = Promise.resolve(2);
    var c = Promise.resolve(3);
    var d = timeout();
    var res = yield [a, b, c, d];
    console.log(res);
  }

  co(helloWorldGenerator).catch(onerror);
  // 打印：我是异步函数, [1, 2, 3]

  function onerror(err) {
    console.error(err);
  }
  ```

## **async + await**

async 是 JavaScript 异步的终极解决方案，可以通过写同步代码的方式来写异步代码。

```js
var a = () =>
  new Promise(resolve => {
    setTimeout(() => {
      console.log('a 函数');
      resolve();
    }, 3000);
  });
var b = async function () {
  setTimeout(async () => {
    console.log('b 函数');
  }, 2000);
};
async function bb() {
  await b(); // b 函数
  await a(); // a 函数
}
```
