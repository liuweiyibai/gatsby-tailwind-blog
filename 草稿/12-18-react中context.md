---
title: react 中 context
tags:
  - react
category:
  - 编程笔记
slug: the-context-in-react
date: 2017-12-18 14:18:16
thumbnail: '../../thumbnails/react.png'
---

`react context` 使用了 `Provider` 提供者 和 `Customer` 消费者模式，和 `react-redux` 的模式非常像。在顶层的 `Provider` 中传入 `value` ，在子孙级的 `Consumer` 中获取该值，并且能够传递函数，用来修改 `context`

```js
// 创建Context组件
const TopComponent = React.createContext()

// 使用 Context，并且利用 Provider 传值，修改指定值
class UseTop extends React.Component {
  state = { show: true, toggle: this.handleToggleShow }
  handleToggleShow = () => {
    this.setState({
      show: !this.state.show
    })
  }
  render() {
    return (
      // 提供一个value
      <TopComponent.Provider value={this.state}>
        <Content />
      </TopComponent.Provider>
    )
  }
}
// Content 中间组件，因为是跨组件传值，所以需要一个中间组件
function Content() {
  return (
    <div>
      <Button />
    </div>
  )
}

// 接收组件,并且和可以调用回调
function Button() {
  return (
    // 消费者使用
    <TopComponent.Consumer>
      {({ show, toggle }) =>
        show ? (
          <button
            onClick={toggle} //调用回调
          >
            Toggle Theme
          </button>
        ) : null
      }
    </TopComponent.Consumer>
  )
}
```

## 在生命周期中访问

```js
constructor(props, context){};
componentWillReceiveProps(nextProps, nextContext){};
shouldComponentUpdate(nextProps, nextState, nextContext){};
componentWillUpdate(nextProps, nextState, nextContext){};
componentDidUpdate(prevProps, prevState, prevContext){};
```

## 无状态组件中访问 context

```js
function D(props, context) {
  return <div>{context.user.name}</div>
}

D.contextTypes = {
  user: PropTypes.object.isRequired
}
```
