---
title: 基于 githooks 自动统一代码风格
date: 2019-04-14 20:56:21
category:
  - 编程笔记
tags: ['git', '前端工程化', 'prettier', 'eslint', 'husky']
slug: based-on-automatic-githooks-unified-code-style
thumbnail: '../thumbnails/prettier.png'
---

## 前言

前端团队开发没有统一规范, 每个人代码风格不一致, 编辑器格式化风格不一致, 代码差异化, 单双引号、代码缩进、无用变量声明等. 每次 pull 代码后一堆冲突, 如何解决上述问题呢?

## do now

有很多工具可以帮我们规范化这个过程, 比如使用 eslint 规范定义代码风格, prettier 自动格式化代码. 使用 githooks 配合这些工具帮我们在提交代码时自动统一代码风格.

在 nodejs 中我们使用 [husky](https://github.com/typicode/husky), 使我们可以使用 githooks 并且运行某个阶段想要的脚本.

1. 创建一个新项目

   ```bash
   yarn create next-app next-demo
   cd ./next-demo
   ```

2. 安装 prettier

   prettier 解决了代码格式的问题，比如缩进，大括号，分号等一系列强迫症选择问题

   ```bash
   yarn add prettier --dev --exact
   ```

   添加到 `package.json`

   ```json:title=package.json
   "scripts":{
     "lint": "prettier --check ."
   }
   ```

   prettier 可以使用 `.prettierignore` 文件配置忽略对哪些文件做格式化
   也可使用一个 JSON 或 YAML 格式的 .prettierrc 文件来配置格式化细节

3. 添加 husky

   使用 husky 为 git-commit 添加钩子函数

   ```bash
   yarn add husky --dev
   ```

   ```json:title=package.json
   "husky": {
     "hooks": {
        "pre-commit": "prettier --write . && git add -A ."
     }
   },
   ```

4. eslint

   ```bash
   yarn add eslint --dev
   ```

   ```json:title=.eslintrc.js
   {
     "plugins": ["prettier"],
     "rules": {
       "prettier/prettier": "error"
     }
   }
   ```

5. 使用 [lint-staged](https://github.com/okonet/lint-staged) 仅对更改的文件做修改

   ```bash
   yarn add lint-staged --dev
   ```

   ```json:title=package.json
   "husky": {
     "hooks": {
       "pre-commit": "lint-staged"
     }
   },
   "lint-staged": {
     "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}":[
        "eslint --fix --ext .js",
        "prettier --write",
        "git add"
     ]
   },
   ```

## 总结

基本流程就是基于 githooks 对代码做风格上的统一, 包括代码格式化, 无用变量剔除, 进行代码风格统一 . 使用 eslint + preitter + stylelint 等工具让代码风格做统一.
