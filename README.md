# 刘威益佰的个人博客

使用 tailwindcss + typescript + gatsby 搭建的 Blog

[预览地址](https://lwyb.me)

## 生成关于我页面

[地址](https://rahuldkjain.github.io/gh-profile-readme-generator/)

## 用到的插件

[载入 codepen 等](gatsby-remark-embedder)

[生成标题 hash 标签](gatsby-remark-autolink-headers)

- [✅] 归档添加切换动画
- [✅] 归档页添加懒加载过渡元素
- [✅] 拆分 layout 组件到免卸载单位
- [✅] 增加 pageloading 效果
- [❌] 使用 tailwind 和 @emotion 重写 css <https://tjaddison.com/blog/2019/06/create-react-app-emotion-and-tailwind-css-starter-app/>
- [❌] 抽离 layout 组件中的 graphql 查询
- [✅] 记录滚动位置
- [✅] react-lazyload 懒加载
- [❌] [压缩向页面传递的 json 大小](https://gersom.nl/post/reducing-gatsbys-page-preloading-bandwidth/)

## 使用 lighthouse

测试网站性能

## 博客文章

- [❌] css-doodle 文档
- [❌] 手写 bind 实现
- [❌] 手写 apply 实现
- [❌] 手写 promise 实现
- [❌] js 贪心算法
- [❌] 前端 10 算法
- [❌] [用惰性加载优化 React 程序](http://blog.yidengxuetang.com/post/201905/18/)
  [来，实现一个“滚动加载”](http://limoer.cc/2019/06/27/scrollload/s)

- [❌] [git 克隆仓库内的一个文件夹](https://blog.csdn.net/qq_36560161/article/details/78260532)

- [❌] [如何优雅的为 PWA 注册 Service Worker](https://zhuanlan.zhihu.com/p/28161855)
- [❌] [有必要上 ssr 吗](https://www.zhihu.com/question/308792091)
- [使用 nxinx 转发 tcp、udp 请求](https://blog.51cto.com/moerjinrong/2287680)

## 评论解决方案

GITALK ✅

## 草稿

- [Yum/RPM 安装的 Nginx 如何添加第三方模块(LuaJIT)](https://blog.csdn.net/weixin_34245749/article/details/92921021)

- [nginx 如何使用 lua 脚本](https://www.cnblogs.com/winss/p/13605087.html)

- [nginx 使用 lua 脚本读取 redis](https://my.oschina.net/u/1175305/blog/1799941)

- nginx 使用 lua 脚本向 kfuka 写入数据

- [如何封装一个前端组件](https://juejin.cn/post/6844903847874265101)

## prismjs

- 代码缩进
- 添加文件类型显示 ✅
- 添加文件名显示 ✅

## 在线编辑器

[摩纳哥](https://microsoft.github.io/monaco-editor/playground.html)

[codemirror](https://codemirror.net/6/docs/)

[参考地址](https://sq.163yun.com/blog/article/184733100361850880)

## 首页加载更多

[首页加载更多](https://www.erichowey.dev/writing/load-more-button-and-infinite-scroll-in-gatsby/)

## 生成开发文档的工具

- [storybook](https://storybook.js.org/)
- [docz](https://www.docz.site/docs/getting-started)

## 收集的插件

- <https://www.gatsbyjs.com/plugins/gatsby-remark-code-repls/?=gatsby-remark-code>
-
- <https://www.gatsbyjs.com/plugins/gatsby-plugin-paginated-collection/>

- [使用 gatsby 写文档](https://github.com/brainhubeu/gatsby-docs-kit)

### jenkins 构建脚本

```bash
rm -rf ./node_modules
node -v
npm -v
npm config set registry https://registry.npm.taobao.org
npm config set sha  rp_binary_host "https://npm.taobao.org/mirrors/sharp"
npm config set sharp_libvips_binary_host "https://npm.taobao.org/mirrors/sharp-libvips"
npm install
npm run build
```

- 或者使用 yarn

```bash
rm -rf ./node_modules
node -v
yarn -v
yarn config set registry https://registry.npm.taobao.org
yarn config set sharp_binary_host "https://npm.taobao.org/mirrors/sharp"
yarn config set sharp_libvips_binary_host "https://npm.taobao.org/mirrors/sharp-libvips"
yarn install --pure-lockfile  # 这个参数是在服务器install不生成yarn.lock，防止服务器和本地代码冲突
yarn run build
```

## mac 解决 gatsby 依赖缺失问题

brew install pkg-config

brew install automake autoconf libtool dpkg pkgconfig nasm libpng

## 参考 blog

[xx](https://luzhaoyang.com/zh/posts/dai-ma-gui-fan-zhi-li-jie-eslint-prettier-editorconfig.html#%E5%89%8D%E8%A8%80)

[在 Vue 项目中使用 Eslint+Prettier+Stylelint](https://segmentfault.com/a/1190000020168436)

[Vue 项目使用 eslint + prettier 规范代码风格](https://juejin.cn/post/6844903661726875656)

[闭包参考链接](https://segmentfault.com/a/1190000023425946)

[闭包参考链接 2](https://segmentfault.com/a/1190000023356598)

[闭包参考链接 3](https://zhuanlan.zhihu.com/p/37913276)

## vue 社区

[https://vuedose.tips/articles](https://vuedose.tips/articles)

## vue 源码

[https://github.com/wangweianger/myblog](https://github.com/wangweianger/myblog)

## vue ssr 面点

## gatsby + ts

给 link 添加 ref 属性和增加属性

```ts
import React from 'react';
import { Link as GLink } from 'gatsby';
import type { GatsbyLinkProps } from 'gatsby';
import clx from 'classnames';
import styles from './Button.module.css';

interface CustomGatsbyLinkProps extends Omit<GatsbyLinkProps<Record<string, unknown>>, 'ref'> {
  active?: boolean;
}
const Link: React.FC<CustomGatsbyLinkProps> = ({ className, children, ...props }) => (
  <GLink className={clx(styles.link, className)} {...props}>
    {children}
  </GLink>
);

export default Link;
```

## 借鉴

<https://codepen.io/cobra_winfrey/pen/dKMpzO>
