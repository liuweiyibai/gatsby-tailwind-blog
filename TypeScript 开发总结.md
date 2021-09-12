---
title: TypeScript 开发总结
date: 2021-09-11 17:38:37
category:
  - 编程笔记
tags: ['TypeScript']
slug: type-script-development-summary
thumbnail: ''
---

## 类型&结构定义

使用 interface 或者 type 定义类型结构，让 TypeScript 可以推断出我们定义变量的类型。比如在 React 中定义 Props 的类型

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

  // 函数的定义，对函数的入参和返回值进行约束
   getNumber: (x, y: string) => number;
      (price: string): void;
}
```

可索引类型接口

```ts
/**
 * 约束 index 必须是数字，值必须是 string
 * 数组
 */
interface IArr {
  [index: number]: string;
}
const arr: IArr = ['a', 'b', 'c'];

/**
 * 约束key 必须是string，值是any
 * 对象
 */
interface IObj {
  [key: string]: any;
}
const obj: IObj = { a: {}, b: '1' };
```

> interface 和 type 的区别

- 类型别名

  TypeScript 提供了为类型注解设置别名的便捷语法，你可以使用 type 关键字 来创建别名，比如：

  ```ts
  type Pet = 'cat' | 'dog';
  let pet: Pet;

  pet = 'cat'; // Ok
  pet = 'dog'; // Ok
  pet = 'zebra'; // Compiler error
  ```

- typeof
- keyof

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
  type T = Exclude<1 | 2 | 3 | 4 | 5, 3 | 4>; // T = 1|2|5
  // 此时 T 类型的值只可以为 1 、2 、 5 ，当使用其他值是 TS 会进行错误提示。
  ```

- `Extract<T,U>`

  从 T 中提取那些可以赋值给 U 的类型。

  ```ts
  type T = Extract<1 | 2 | 3 | 4 | 5, 3 | 4>; // T = 3|4
  // 此时T类型的值只可以为 3 、4 ，当使用其他值时 TS 会进行错误提示：
  ```

- `Pick<T,K>`

  从 T 中取出一系列 K 的属性。

  ```ts
  interface Person {
    name: string;
    age: number;
    sex: string;
  }
  // 只支持 Person 中的几个属性
  let person: Pick<Person, 'name' | 'age'> = {
    name: '小王',
    age: 21,
  };
  ```

- `Record<K,T>`

  将 K 中所有的属性的值转化为 T 类型。

  ```ts
  // 将 name 、 age 属性全部设为 string 类型。
  let person: Record<'name' | 'age', string> = {
    name: '小王',
    age: '12',
  };
  ```

- `Omit<T,K>`

  从对象 T 中排除 key 是 K 的属性。

  ```ts
  type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

  interface Person {
    name: string;
    age: number;
    sex: string;
  }

  let person: Omit<Person, 'name'> = {
    age: 1,
    sex: '男',
  };
  ```

<!-- <https://my.oschina.net/u/4386652/blog/4892397>
<https://itbilu.com/javascript/js/typescript.html>

https://blog.csdn.net/qq_33221861/article/details/112369522 -->

<!-- typescript + react -->
<!-- https://juejin.cn/post/6910863689260204039#heading-11 -->
<!-- https://github.com/fi3ework/blog/tree/master/react-typescript-cheatsheet-cn -->

- ts 工具类型

<!-- https://www.cnblogs.com/cangqinglang/p/12896595.html -->
<!-- https://www.cnblogs.com/Grewer/p/10973744.html -->
<!-- https://blog.csdn.net/weixin_38080573/article/details/92838045 -->
