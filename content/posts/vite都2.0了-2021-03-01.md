---
title: vite 都 2.0 了
date: 2021-03-01 13:56:00
category:
  - 编程笔记
tags: ['js', 'nodejs', 'npm', '前端工程化']
slug: what-is-vite
thumbnail: '../thumbnails/vite.png'
---

[vite](https://cn.vitejs.dev/) 是一种新的、更快地 web 开发工具。

1. 快速的冷启动
2. 即时的模块热更新
3. 真正的按需编译

## 基本使用

搭建一个 vite 项目，同常见的开发工具一样，vite 提供了用 npm 或者 yarn 一建生成项目结构的方式，使用 yarn 或 npm 在终端执行：

```bash
# npm 6.x
npm init @vitejs/app demo-app --template vue

# npm 7+
npm init @vitejs/app demo-app -- --template vue

# 推荐使用 yarn
yarn create @vitejs/app demo-app --template vue
```

[vite 可选模板](https://cn.vitejs.dev/guide/#搭建第一个-vite-项目)

### **vite vs webpack**

> 注：[js 模块化历程](/blog/the-history-of-javascript-modularity)

vite 主要特点是基于浏览器原生支持的 [ES module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 来开发，省略打包这个步骤，因为需要什么资源直接在浏览器里引入即可。基于浏览器 ES module 来开发 web 应用，还有一个解决方案是 [snowpack](https://www.snowpack.dev/)

模块化可以帮助我们更好地解决复杂应用开发过程中的代码组织问题，但是随着模块化思想的引入，我们的前端应用又会产生了一些新的问题，比如：

- 首先，我们所使用的 [ES module 模块存在环境兼容性](https://caniuse.com/es6-module-dynamic-import)的问题。尽管现如今主流浏览器的最新版本都支持这一特性，但是目前还无法保证用户的浏览器使用情况。所以我们还需要考虑兼容问题。

- 其次，模块化的方式划分出来的模块文件过多，而前端应用又运行在浏览器中，每一个文件都需要单独从服务器请求回来。零散的模块文件必然会导致浏览器的频繁发送网络请求，影响应用的工作效率。

- 最后，谈一下在实现 js 模块化的基础上的发散。随着应用日益复杂，在前端应用开发过程中不仅仅只有 js 代码需要模块化，html 和 css 这些资源文件也会面临需要被模块化的问题。而且从宏观角度来看，这些文件也都应该看作前端应用中的一个模块，只不过这些模块的种类和用途跟 js 不同

对于开发过程而言，模块化肯定是必要的，所以我们需要在前面所说的模块化实现的基础之上引入更好的方案或者工具，去解决上面提出的 3 个问题，让我们的应用在开发阶段继续享受模块化带来的优势，又不必担心模块化对生产环境所产生的影响。

[webpack](https://webpack.docschina.org/) 工作流程

![webpack 工作流程](https://cdn.clearlywind.com/blog-images/images/webpack-workflow.png)

**vite 和 webpack 分别解决了哪些问题**：

- webpack 热更新慢的问题

  webpack 的热更新会以当前修改的文件为入口重新转译打包，所有涉及到的依赖也都会被重新加载一次，所以当项目较大，依赖较多的时候热更细会很慢。

  而 vite 利用 ES module，把 「构建 vue 应用」 这个本来需要通过 webpack 打包后才能执行的代码直接放在浏览器里执行

- [vite 如何解决 ES module 每次引入都发送 http 请求的问题](https://vitejs.dev/guide/dep-pre-bundling.html#dependency-pre-bundling)

### 使用

- 创建项目

  ```bash
  npm init @vitejs/app
  ```

- vite 可以开箱即用 ts

  vite 默认使用 esbuild 来编译 ts

- vite 可以通过插件结合框架

  - 通过 `@vitejs/plugin-vue` 支持 Vue 3 SFC
  - 通过 `@vitejs/plugin-vue-jsx` 支持 Vue 3 JSX
  - 通过 `underfin/vite-plugin-vue2` 支持 Vue 2

  可以通过插件对 react 等框架实现支持

- 对 css 等静态文件的支持

  对 css 预处理后处理，以及 cssModules 都支持

- 支持服务端渲染

## 原理

## 总结

vite 和 webpack 对比，webpack 是一个纯正的打包工具，它的生态非常丰富，可以基于插件做各种事情，但是像尤大说的一样，很少有基于 webpack 上层封装的工具出现，也就是具有很大学习和配置成本，而 vite 提供了更丝滑的开发体验，以及内置的强大的 HMR，TS 支持，WebAssembly 支持等等。目前由于 vite 目前还在不断的更新中，但是主要特性的原理应该是不会变的。支持 css 预编译/react 支持/通用 hmr 的支持，插件扩展，并且可以使用 rollUp 的插件，搭建项目应该是没问题。未来也会在项目中尝试 vite
