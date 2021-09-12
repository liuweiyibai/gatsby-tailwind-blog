## Babel 原理

大多数 JavaScript parser 遵循 [estree](https://github.com/estree/estree) 规范，Babel 最初基于 [acorn 项目](https://github.com/acornjs/acorn)(轻量级现代 `JavaScript` 解析器) Babel 大概分为三大部分：

- 解析：将代码转换成 `ast`
  - 词法分析：将代码(字符串)分割为 `token` 流，即语法单元成的数组
  - 语法分析：分析 `token` 流(上面生成的数组)并生成 `ast`
- 转换：访问 `ast` 的节点进行变换操作生产新的 `ast`
  - [Taro 就是利用 babel 完成的小程序语法转换](https://github.com/NervJS/taro/blob/master/packages/taro-transformer-wx/src/index.ts#L15)
- 生成：以新的 `ast` 为基础生成代码
  想了解如何一步一步实现一个编译器的同学可以移步 `babel` 官网曾经推荐的开源项目 [the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)
