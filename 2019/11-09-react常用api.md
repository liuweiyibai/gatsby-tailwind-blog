---
title: react 常用 api
date: 2019-11-09 02:34:56
category:
  - 编程笔记
tags: ['react']
slug: react-commonly-used-api
thumbnail: '../../thumbnails/react.png'
---

## 创建 react 元素

每个 `jsx` 元素都是调用 `React.createElement()` 的语法糖。一般来说，如果你使用了 `jsx`，就不再需要调用以下方法

- [createElement()](https://react.docschina.org/docs/react-api.html#createelement)
- [createFactory()](https://react.docschina.org/docs/react-api.html#createfactory)

## 转换元素的方法

- `React.Children`

  该 `api` 提供了用于处理 `this.props.children` 不透明数据结构的实用方法。其中`this.props.children` 表示该组件的所有子节点

- `cloneElement()`，该方法作用是克隆并返回一个新的 `ReactElement` （内部子元素也会跟着克隆），新返回的元素会保留有旧元素的 `props`、`ref`、`key`，也会集成新的 ` props``（只要在第二个参数中有定义），children ` 将替代现有的 `children`， `props` 将和现有的 `props` 进行浅合并

  ```js
  // React.cloneElement(element, [props], [...children]);
  // 实际使用
  renderChildren() {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        name: this.props.name
      })
    })
  }
  ```
