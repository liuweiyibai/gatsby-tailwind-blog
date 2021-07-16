---
title: 开始在 React 中使用 TypeScript
date: 2020-05-11 15:35:25
category:
  - 编程笔记
tags: ['React', 'TypeScript']
slug: the-use-of-ts-began-to-react
thumbnail: '../../thumbnails/ts.png'
---

## 组件开发

- 函数式组件

  当我们传递 props 到组件中去的时候，如果使用 TypeScript，就需要给 props 定义类型，使用 interface 定义，那么 props 必须遵循 interface 的结构，确保成员都有被声明，同时也会阻止未期望的 props 被传递下去。

  ```tsx
  interface AppProps = { message: string };
  const App = ({ message }: AppProps) => <div>{message}</div>;
  ```

- 无状态组件

  无状态组件也被称为展示组件，如果一个展示组件没有内部的 state 可以被写为纯函数组件。

  ```tsx
  import React, { ReactNode, SFC } from 'react'

  export interface IProps {
    title: string | ReactNode
    description: string | ReactNode
  }
  const StepComplete: SFC<IProps> = ({ title, description, children }) => {
    return (
      <div>
        <div>{title}</div>
        <div>{description}</div>
        <div>{children}</div>
      </div>
    )
  }
  export default StepComplete
  ```

- hooks

  hooks 中如何使用 ts 定义

  useState

  ```tsx
  // 布尔类型，简单数据类型 ts 可以根据自动推导出类型
  const [val, toggle] = React.useState(false)
  toggle(false)
  // 如果初始值是 null 或 undefined，那就要通过泛型手动传入你期望的类型。通过泛型传入 state 类型结构
  const [user, setUser] = React.useState<IUser | null>(null)
  ```

  useEffect

  ```tsx
  useEffect(() => {
    const getUser = async () => {
      const user = await getUser()
      setUser(user)
    }
    getUser()
  }, [])
  ```

  useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值

  ```tsx
  import * as React from 'react'
  import { useState, useEffect, useRef, useImperativeHandle } from 'react'

  type ListProps = {
    innerRef?: React.Ref<{ scrollToTop(): void }>
  }

  function List(props: ListProps) {
    useImperativeHandle(props.innerRef, () => ({
      scrollToTop() {}
    }))
    return null
  }

  function Use() {
    const listRef = useRef<{ scrollToTop(): void }>(null!)

    useEffect(() => {
      listRef.current.scrollToTop()
    }, [])

    return <List innerRef={listRef} />
  }
  ```

  useRef

  ```tsx
  // null! 这种语法是非空断言，跟在一个值后面表示你断定它是有值的，所有可以直接获取值
  const ref2 = useRef<HTMLElement>(null!)

  // 也可以使用
  inputEl.current?.focus()
  ```

  forwardRef，函数式组件默认不可以加 ref，它不像类组件那样有自己的实例。这个 API 一般是函数式组件用来接收父组件传来的 ref。通过 forwardRef 可以将 ref 转发给子组件，子组件拿到父组件创建的 ref，绑定到自己的某一个元素中

  ```tsx
  type Props = {}
  type Ref = HTMLButtonElement
  const FancyButton = React.forwardRef<Ref, Props>((props, ref) => (
    <button ref={ref} className="MyClassName">
      {props.children}
    </button>
  ))

  const App = () => {
    const ref = useRef<HTMLButtonElement>()
    return <FancyButton ref={ref} />
  }
  ```

  通过 useImperativeHandle 的，将父组件传入的 ref 和 useImperativeHandle 第二个参数返回的对象绑定到了一起

  ```tsx
  function FancyInput(props, ref) {
    const inputRef = useRef()
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus()
      }
    }))
    return <input ref={inputRef} />
  }
  FancyInput = React.forwardRef(FancyInput)
  const fancyInputRef = React.createRef() // React.useRef()
  ;<FancyInput ref={fancyInputRef}>Click me!</FancyInput>
  ```

- 类组件

  ```tsx
  export class MyForm extends React.Component<FormProps, FormState> {}
  ```

## 事件

如果 props 或者 state 中定义了鼠标事件或者键盘事件，这些事件泛型包括：

```
ClipboardEvent<T = Element> 剪贴板事件对象
DragEvent<T = Element> 拖拽事件对象
ChangeEvent<T = Element>  Change 事件对象
KeyboardEvent<T = Element> 键盘事件对象
MouseEvent<T = Element> 鼠标事件对象
TouchEvent<T = Element>  触摸事件对象
WheelEvent<T = Element> 滚轮事件对象
AnimationEvent<T = Element> 动画事件对象
TransitionEvent<T = Element> 过渡事件对象
```

具体使用

```tsx
import { MouseEvent } from 'react'

interface IProps {
  onClick(event: MouseEvent<HTMLDivElement>): void
}

const Element: SFC<IProps> = ({ onClick }) => {
  return <div onClick={onClick} />
}
```

## props

使用 ts 定义 props 的类型

```ts
interface AdminProps {}
// 或者是
type AdminProps = {
  message: string
  count: number
  disabled: boolean
  // 数组类型
  names: string[]
  // 用「联合类型」限制为下面两种「字符串字面量」类型
  status: 'waiting' | 'success'

  // 如果你不需要用到具体的属性，可以这样模糊规定是个对象
  obj: object

  // 同上
  obj2: {}

  // 拥有具体属性的对象类型
  obj3: {
    id: string
    title: string
  }
  // 对象数组
  objArr: {
    id: string
    title: string
  }[]
  // key 可以为任意 string，值限制为 MyTypeHere 类型
  dict1: {
    [key: string]: MyTypeHere
  }
  // 基本上和 dict1 相同，用了 TS 内置的 Record 类型。
  dict2: Record<string, MyTypeHere>

  // 函数 props 传值
  // 任意的函数类型，但是推荐，因为不能规定参数以及返回值类型
  onSomething: Function

  // 没有参数的函数，不需要返回值
  onClick: () => void

  // 带函数的参数，同样不需要返回值
  onChange: (id: number) => void

  // 另一种函数语法 参数是 React 的按钮事件，指定事件对象的类型
  onClick(event: React.MouseEvent<HTMLButtonElement>): void

  // 可选参数类型
  optional?: OptionalType

  // react 相关类型
  children1: JSX.Element; // 不推荐 没有考虑数组
  children2: JSX.Element | JSX.Element[]; // 不推荐 没有考虑字符串 children
  children4: React.ReactChild[]; // 但是没考虑 null
  children: React.ReactNode; // 包含所有 children 情况
  functionChildren: (name: string) => React.ReactNode; // 返回 React 节点的函数
  style?: React.CSSProperties; // 内联 style 时使用
  // 推荐原生 button 标签自带的所有 props 类型
  // 也可以在泛型的位置传入组件 提取组件的 Props 类型
  props: React.ComponentProps<"button">;
  // 利用上一步的做法 再进一步的提取出原生的 onClick 函数类型
  // 此时函数的第一个参数会自动推断为 React 的点击事件类型
  onClickButton：React.ComponentProps<"button">["onClick"]
}
```

## 常用泛型

- Partial 将所有的 props 属性都变为可选值；用 Required 将所有 props 属性都设为必填项

  ```tsx
  import { MouseEvent } from 'react'
  import * as React from 'react'
  interface IProps {
    color: 'red' | 'blue' | 'yellow',
    onClick (event: MouseEvent<HTMLDivElement>): void,
  }
  const Button: SFC<Partial<IProps>> = ({onClick, children, color}) => {
    return (
      <div onClick={onClick}>
        { children }
      </div>
    )
  ```

- `Exclude<T,U>`

  从 T 中排除那些可以赋值给 U 的类型。

  ```ts
  type T = Exclude<1 | 2 | 3 | 4 | 5, 3 | 4> // T = 1|2|5
  // 此时 T 类型的值只可以为 1 、2 、 5 ，当使用其他值是 TS 会进行错误提示。
  ```

- `Extract<T,U>`

  从 T 中提取那些可以赋值给 U 的类型。

  ```ts
  type T = Extract<1 | 2 | 3 | 4 | 5, 3 | 4> // T = 3|4
  // 此时T类型的值只可以为 3 、4 ，当使用其他值时 TS 会进行错误提示：
  ```

- `Pick<T,K>`

  从 T 中取出一系列 K 的属性。

  ```ts
  interface Person {
    name: string
    age: number
    sex: string
  }
  // 只支持 Person 中的几个属性
  let person: Pick<Person, 'name' | 'age'> = {
    name: '小王',
    age: 21
  }
  ```

- `Record<K,T>`

  将 K 中所有的属性的值转化为 T 类型。

  ```ts
  // 将 name 、 age 属性全部设为 string 类型。
  let person: Record<'name' | 'age', string> = {
    name: '小王',
    age: '12'
  }
  ```

- `Omit<T,K>`

  从对象 T 中排除 key 是 K 的属性。

  ```ts
  type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

  interface Person {
    name: string
    age: number
    sex: string
  }

  let person: Omit<Person, 'name'> = {
    age: 1,
    sex: '男'
  }
  ```
