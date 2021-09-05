---
title: 开始在 React 中使用 TypeScript
date: 2020-05-11 15:35:25
category:
  - 编程笔记
tags: ['React', 'TypeScript']
slug: the-use-of-ts-began-to-react
thumbnail: '../../thumbnails/ts.png'
---

## React 中常见的类型

- React.ReactElement

  使用 React.createElement 创建的，可以简单理解为 React 中的 JSX 的元素

- React.ReactNode

  `<div>xxx</div>` xxx 的合法类型

- React.CSSProperties

  组件内联的 style 对象的类型

- React.RefObject

  React.createRef 创建的类型，只读不可改

- React.MutableRefObject

  useRef 创建的类型，可以修改

## 组件声明

### 类组件

类组件使用的定义主要为 `React.Component<P,S>` 和 `React.PureComponent<P,S,SS>`，其中的 P 是 props 的类型，S 是 state 的类型，可以只传入 props 的类型，因为 state 的类型会自己推断

```tsx
export class MyForm extends React.Component<FormProps, FormState> {}
```

### 函数式组件

- 函数式组件

  当我们传递 props 到组件中去的时候，如果使用 TypeScript，就需要给 props 定义类型，使用 interface 定义，那么 props 必须遵循 interface 的结构，确保成员都有被声明，同时也会阻止未期望的 props 被传递下去。

  ```tsx
  interface AppProps = { message: string };
  const App = ({ message }: AppProps) => <div>{message}</div>;
  // 还有一种是使用 React.FC
  interface AppProps {
    value?: string;
  }

  const App: React.FC<AppProps> = ({ value = '', children }) => {
    return <div/>
  }
  ```

- 无状态组件

  无状态组件也被称为展示组件，如果一个展示组件没有内部的 state 可以被写为纯函数组件。

  ```tsx
  import React, { ReactNode, SFC } from 'react';

  export interface IProps {
    title: string | ReactNode;
    description: string | ReactNode;
  }
  const StepComplete: SFC<IProps> = ({ title, description, children }) => {
    return (
      <div>
        <div>{title}</div>
        <div>{description}</div>
        <div>{children}</div>
      </div>
    );
  };
  export default StepComplete;
  ```

## hooks

- useState

  ```tsx
  // 布尔类型，简单数据类型 ts 可以根据自动推导出类型
  const [val, toggle] = React.useState(false);
  toggle(false);
  // 如果初始值是 null 或 undefined，那就要通过泛型手动传入你期望的类型。通过泛型传入 state 类型结构
  const [user, setUser] = React.useState<IUser | null>(null);
  ```

- useEffect

  ```tsx
  useEffect(() => {
    const getUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    getUser();
  }, []);
  ```

- useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值

  ```tsx
  import * as React from 'react';
  import { useState, useEffect, useRef, useImperativeHandle } from 'react';

  type ListProps = {
    innerRef?: React.Ref<{ scrollToTop(): void }>;
  };

  function List(props: ListProps) {
    useImperativeHandle(props.innerRef, () => ({
      scrollToTop() {},
    }));
    return null;
  }

  function Use() {
    const listRef = useRef<{ scrollToTop(): void }>(null!);

    useEffect(() => {
      listRef.current.scrollToTop();
    }, []);

    return <List innerRef={listRef} />;
  }
  ```

- useRef

  ```tsx
  // null! 这种语法是非空断言，跟在一个值后面表示你断定它是有值的，所有可以直接获取值
  const ref2 = useRef<HTMLElement>(null!);

  // 也可以使用
  inputEl.current?.focus();
  ```

- forwardRef

  函数式组件默认不可以加 ref，它不像类组件那样有自己的实例。这个 API 一般是函数式组件用来接收父组件传来的 ref。通过 forwardRef 可以将 ref 转发给子组件，子组件拿到父组件创建的 ref，绑定到自己的某一个元素中。

  ```tsx
  type Props = {};
  type Ref = HTMLButtonElement;
  const FancyButton = React.forwardRef<Ref, Props>((props, ref) => (
    <button ref={ref} className="MyClassName">
      {props.children}
    </button>
  ));

  const App = () => {
    const ref = useRef<HTMLButtonElement>();
    return <FancyButton ref={ref} />;
  };
  ```

- useImperativeHandle

  通过 useImperativeHandle 的，将父组件传入的 ref 和 useImperativeHandle 第二个参数返回的对象绑定到了一起

  ```tsx
  function FancyInput(props, ref) {
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      },
    }));
    return <input ref={inputRef} />;
  }
  FancyInput = React.forwardRef(FancyInput);
  const fancyInputRef = React.createRef(); // React.useRef()
  <FancyInput ref={fancyInputRef}>Click me!</FancyInput>;
  ```

## 事件

如果 props 或者 state 中定义了鼠标事件或者键盘事件，这些事件泛型包括：

| 表头                           | 表头            |
| ------------------------------ | --------------- |
| `ClipboardEvent<T = Element>`  | 剪贴板事件对象  |
| `DragEvent<T = Element>`       | 拖拽事件对象    |
| `ChangeEvent<T = Element>`     | Change 事件对象 |
| `KeyboardEvent<T = Element>`   | 键盘事件对象    |
| `MouseEvent<T = Element>`      | 鼠标事件对象    |
| `TouchEvent<T = Element>`      | 触摸事件对象    |
| `WheelEvent<T = Element>`      | 滚轮事件对象    |
| `AnimationEvent<T = Element>`  | 动画事件对象    |
| `TransitionEvent<T = Element>` | 过渡事件对象    |

具体使用

```tsx
import { MouseEvent } from 'react';

interface IProps {
  onClick(event: MouseEvent<HTMLDivElement>): void;
}

const Element: SFC<IProps> = ({ onClick }) => {
  return <div onClick={onClick} />;
};
```
