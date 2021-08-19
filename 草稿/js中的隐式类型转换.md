---
title: js 中的隐式类型转换
---

<https://blog.csdn.net/qq_33120763/article/details/88296955>

| 值         | 转换为字符串 | 转换为数字 | 转换为布尔值 | 转换为对象           |
| ---------- | ------------ | ---------- | ------------ | -------------------- |
| undefined  | “undefined”  | NaN        | false        | throw TypeError      |
| null       | “null”       | 0          | false        | throw TypeError      |
| true       | “true”       | 1          |              | new Boolean(“true”)  |
| false      | “false”      | 0          |              | new Boolean(“false”) |
| “”         |              | 0          | false        | new String(")        |
| “1.2”      |              | 1.2        | true         | new String(“1.2”)    |
| “1.2a”     |              | NaN        | true         | new String(“1.2a”)   |
| “aaa”      |              | NaN        | true         | new String(“aaa”)    |
| 0          | “0”          |            | false        | new Number(0)        |
| -0         | “0”          |            | false        | new Number(-0)       |
| 1          | “1”          |            | true         | new Number(1)        |
| NaN        | “NaN”        |            | false        | new Number(NaN)      |
| Infinity   | “Infinity”   |            | true         | new Number(Infinity) |
| []         | “”           | 0          | true         |                      |
| [9]        | “9”          | 9          | true         |                      |
| [“a”, “b”] | “a,b”        | NaN        | true         |                      |

ps: 注意：

数组类型的类型转换，数组转换为字符串,实际上是调用不传参数的 join() 方法----------这个说法一会会有些变动，留个悬念
转为布尔类型成为 false 的有：undefined、null、空字符串、0、-0、NaN
字符串类型转为数值类型：
若字符串中出现任意非数字、非空格的字符，均转为 NaN
若数字中间存在空格，转为 NaN
若希望尽可能的转换字符串中出现的数字，请参考 parseInt、parseFloat 方法
new Number() 和 Number() 是不同的:
new Number() 创建一个 Number 对象
Number() 将传入的参数转换为数值字面量
上面这张表说明了大多数情况下的类型转换，下面讨论对象的类型转换。
