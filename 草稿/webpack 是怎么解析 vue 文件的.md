---
title: webpack 是怎么解析 vue 文件的
---

有过 vue + webpack 开发经历的人肯定都知道，webpack 是通过 vue-loader 解析 vue 文件，然后执行解析到不同的 loader 最后生成对应的静态文件。

在了解 vue-loader 之前，我们先看一下 vue-template-compiler。

在使用 vue 程中，安装依赖时，需要 vue 和 vue-template-compiler 版本保持一致，否则会报错。

为什么二者版本必须一致呢？vue-template-compiler 承担哪些作用？其和 vue-loader 又有何关联？

## vue-template-compiler

vue-template-compiler 模块可用于将 Vue 2.0 模板预编译为渲染函数（template => ast => render），以避免运行时编译开销和 CSP 限制。它经常与 vue-loader 一起使用，只有在编写具有非常特定需求的构建工具时，才需要单独使用它，比如 vueify 等。

> 内容安全策略 (CSP) 是一个附加的安全层，用于帮助检测和缓解某些类型的攻击，包括跨站脚本 (XSS) 和数据注入等攻击。
> ps: vue 模板的插值容易发生上述问题。

在 vue-template-compiler 的入口文件 index.js 中对自己的 pkg 版本和 vue 的版本做了比较，如果版本不同会提示报错。

在 vue-template-compiler 的 README 中写道：

> This package is auto-generated. For pull requests please see [src/platforms/web/entry-compiler.js](https://github.com/vuejs/vue/tree/dev/src/platforms/web/entry-compiler.js).

可以看到，这个文件是在 vue 源码中自动生成的，`vue/src/platforms/web/entry-compiler.js` 文件内容：

```js
export { parseComponent } from 'sfc/parser'
export { compile, compileToFunctions } from './compiler/index'
export { ssrCompile, ssrCompileToFunctions } from './server/compiler'
export { generateCodeFrame } from 'compiler/codeframe'
```

所以 vue-template-compiler 的代码是从 vue 源码中抽离的。接着，我们对比一下 vue-template-compiler 和 vue 关于编译的 API。发现对于 compile 等函数是一致，只是 vue-template-compiler 开放的参数和方法更多。因此，vue 和 vue-template-compiler 的版本必须一致！

简单介绍这里的几个 api:

1. compile

   编译模板字符串并返回编译后的 JavaScript 代码。返回的结果是一个对象的格式如下:

   ```js
   {
     ast: ASTElement, // 解析模板生成的AST
     render: string,    // 渲染函数
     staticRenderFns: Array<string>, // 静态子树
     errors: Array<string>, //模板语法错误，如果有的话
     tips: Array<string>
   }
   ```

   > 注意，返回的函数代码使用 with，因此不能在严格模式代码中使用。

2. compileToFunctions(template)

   类似于 compiler.compile，但是直接返回实例化的函数，即简化版的 compiler.compile() ，只返回

   ```js
   {render: Function, staticRenderFns: Array<Function>}
   ```

   > 注意：这只在预配置的构建运行时有用，所以它不接受任何编译时选项。此外，该方法使用 new Function()，因此它不符合 CSP。

3. parseComponent(file, [options])

   将 SFC 解析文件为 SFCDescriptor（定义的 SFCDescriptor 类型）类型，通常用于 SFC 构建工具，如 vue-loader 和 vueify 等，其返回值结构如下：

   ```ts
   // SFCDescriptor，是表示 .vue 各个代码块的对象，为以下数据格式：
   declare type SFCDescriptor = {
     template: ?SFCBlock
     script: ?SFCBlock
     styles: Array<SFCBlock>
     customBlocks: Array<SFCBlock>
   }
   ```

compiler 运行过程，其定义在 src/compiler/index.js

```js
// 生成 ast 语法树
const ast = parse(template.trim(), options)
// 标记静态内容（以免diff的时候需要重复比较）
optimize(ast, options)
// 生成 render function code
const code = generate(ast, options)
```

## vue-loader

vue-loader 是用于解析 vue 文件的 webpack 加载器，上面我们说到的 parseComponent 方法就将 vue 文件解析为三个顶级的语言块 `<template>`，`<script>` 和 `<style>`，以及其他可选的自定义块。

vue-loader 将解析文件，提取每个语言块，将它们通过其他加载器进行管道传输，最后将它们组装回 ES 模块，其默认导出为 Vue.js 组件选项对象。

1. Template

   每个\*.vue. 文件一次最多可以包含一个 `<template>` 块；内容将被提取并传递给 vue-template-compiler 并预编译为 JavaScript 渲染函数，最后注入 `<script>` 部分的导出组件中

2. Script

   每个 \*.vue. 文件一次最多可以包含一个 `<script>` 块；任何针对 .js 文件的 webpack rules 都将应用于 `<script>` 块中的内容

3. Style

   默认匹配/\.css\$/；可以包含多个 `<style>` 块；可以包含 Scoped 或者 module 属性；任何针对 .css 文件的 webpack rules 都将应用于 `<style>` 块中的内容

4. Custom Blocks

自定义块，以满足任何项目的特定需求

如果你希望将 \*.vue. 组件拆分为多个文件，则可以使用 src 属性为语言块导入外部文件：

```html
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
```

相对路径必须以 ./ 开头，也可以从 npm 依赖项导入资源

<https://blog.csdn.net/qq_36380426/article/details/104438390>
<https://zhuanlan.zhihu.com/p/355401219>
