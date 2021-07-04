---
title: 开始在 react 中使用 ts
---

## props

使用 ts 定义 props 的类型

```ts
interface AdminProps {}
type AdminProps = {
  message: string
  count: number
  disabled: boolean
  // 数组类型
  names: string[]
  // 用「联合类型」限制为下面两种「字符串字面量」类型
  status: 'waiting' | 'success'

  /**
   * 如果你不需要用到具体的属性，可以这样模糊规定是个对象
   * 但是 ❌ 不推荐
   */
  obj: object

  // 同上
  obj2: {}

  /**
   * 拥有具体属性的对象类型 ✅ 推荐
   */
  obj3: {
    id: string
    title: string
  }
  /** 对象数组 😁 常用 */
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
  /** 任意的函数类型 ❌ 不推荐 不能规定参数以及返回值类型 */
  onSomething: Function
  /** 没有参数的函数 不需要返回值 😁 常用 */
  onClick: () => void
  /** 带函数的参数 😁 非常常用 */
  onChange: (id: number) => void
  /** 另一种函数语法 参数是 React 的按钮事件 😁 非常常用 */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void
  /** 可选参数类型 😁 非常常用 */
  optional?: OptionalType

  // react 相关类型
  children1: JSX.Element; // ❌ 不推荐 没有考虑数组
  children2: JSX.Element | JSX.Element[]; // ❌ 不推荐 没有考虑字符串 children
  children4: React.ReactChild[]; // 稍微好点 但是没考虑 null
  children: React.ReactNode; // ✅ 包含所有 children 情况
  functionChildren: (name: string) => React.ReactNode; // ✅ 返回 React 节点的函数
  style?: React.CSSProperties; // ✅ 推荐 在内联 style 时使用
  // ✅ 推荐原生 button 标签自带的所有 props 类型
  // 也可以在泛型的位置传入组件 提取组件的 Props 类型
  props: React.ComponentProps<"button">;
  // ✅ 推荐 利用上一步的做法 再进一步的提取出原生的 onClick 函数类型
  // 此时函数的第一个参数会自动推断为 React 的点击事件类型
  onClickButton：React.ComponentProps<"button">["onClick"]
}
```
