---
title: react-router 实现原理
date: 2020-10-02 15:40:56
category:
  - 编程笔记
tags: ['react', 'react-router']
slug: the-react-principle-the-router
thumbnail: '../../thumbnails/reactrouter.png'
---

`react-router` 等前端路由的原理大致相同，可以实现无刷新的条件下切换显示不同的页面。路由的本质就是页面的 `url` 发生改变时，页面的显示结果可以根据 `url` 的变化而变化，但是页面不会刷新。通过前端路由可以实现单页(`spa`)应用，其实现方式包括 `hash` 和 `history`

## 通过 hash 实现前端路由

- `hash` 的原理

  前端路由是可以通过 `hash` 来实现的。改变 `url` 的 `hash` 值是不会刷新页面的。因此可以通过 `hash` 来实现前端路由，从而实现无刷新的效果。`hash` 属性位于 `location` 对象中，在当前页面中，可以通过：

  ```js
  window.location.hash = 'edit'
  ```

  来实现改变当前 `url` 的 `hash` 值。执行上述的 `hash` 赋值后，页面的 `url` 发生改变

  - 赋值前：<http://localhost:3000>
  - 赋值后：<http://localhost:3000/#edit>

  在 `url` 中多了以`#`结尾的 `hash` 值，但是赋值前后虽然页面的 `hash` 值改变导致页面完整的 `url` 发生了改变，但是页面是不会刷新的。此外，还有一个名为 `hashchange` 的事件，可以监听 `hash` 的变化,我们可以通过下面两种方式来监听 `hash` 的变化：

      ```js
      window.onhashchange = function (event) {
        console.log(event)
      }
      window.addEventListener('hashchange', function (event) {
        console.log(event)
      })
      ```

  当 `hash` 值改变时，输出一个 `HashChangeEvent`。该 `HashChangeEvent` 的具体值为：

  ![HashChangeEvent](https://cdn.clearlywind.com/blog-images/images/hashchange-event.png)

  有了监听事件，且改变 `hash` 页面不刷新，这样我们就可以在监听事件的回调函数中，执行我们展示和隐藏不同 `UI` 显示的功能，从而实现前端路由。

  此外，除了可以通过 `window.location.hash` 来改变当前页面的 `hash` 值外，还可以通过 `html` 的 `a` 标签来实现：

  ```html
  <a href="#edit">edit</a>
  ```

  - `hash` 的缺点

    `hash` 的兼容性较好，因此在早期的前端路由中大量的采用，但是使用 `hash` 也有很多缺点:

    - 搜索引擎对带有 `hash` 的页面不友好
    - 带有 `hash` 的页面内难以追踪用户行为

  [通过 hash 实现一个简单的路由效果](https://gitee.com/liuweiyibai/toy-react-router.git)

## 通过 history 实现前端路由

`html5` 的 `History` 接口，`History` 对象是一个底层接口，不继承于任何的接口。`History` 接口允许我们操作浏览器会话历史记录

1. `History` 提供的属性

   - `History.length`: 返回在会话历史中有多少条记录，包含了当前会话页面。此外如果打开一个新的 `Tab`，那么这个 `length` 的值为 `1`
   - `History.state`: 保存了会出发 `popState` 事件的方法，所传递过来的属性对象（后面会在 `pushState` 和 `replaceState` 方法中详细的介绍）

2. `History` 方法：

   - `History.back()`: 返回浏览器会话历史中的上一页，跟浏览器的回退按钮功能相同
   - `History.forward()`: 指向浏览器会话历史中的下一页，跟浏览器的前进按钮相同
   - `History.go()`: 可以跳转到浏览器会话历史中的指定的某一个记录页
   - `History.pushState()`: `pushState` 可以将给定的数据压入到浏览器会话历史栈中，该方法接收 `3` 个参数，对象，`title` 和一串 `url`。`pushState` 后会改变当前页面 `url`，但是不会伴随着刷新
   - `History.replaceState()`: `replaceState` 将当前的会话页面的 `url` `替换成指定的数据，replaceState` 后也会改变当前页面的 `url`，但是也不会刷新页面

3. 注意

   其中 `pushState` 和 `replaceState` 的相同点：就是都会改变当前页面显示的 `url`，但都不会刷新页面

   不同点：`pushState` 是压入浏览器的会话历史栈中，会使得 `History.length` 加 `1`，而 `replaceState` 是替换当前的这条会话历史，因此不会增加 `History.length`
