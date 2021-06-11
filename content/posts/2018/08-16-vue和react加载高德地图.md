---
title: vue 和 react 加载高德地图
tags:
  - vue
  - react
category:
  - 编程笔记
slug: vue-and-react-load-amap
date: 2018-08-16 14:18:16
thumbnail: '../../thumbnails/react.png'
---

## 动态加载高德地图

```js
// 动态加载 cdn 脚本
const loadAMap = () => {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(Window.AMap)
    } else {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = 'https://webapi.amap.com/maps?v=1.4.12&key=507de00c91710cf81bb0e7a2cfc26263'
      script.onerror = reject
      document.head.appendChild(script)
      script.onload = () => {
        resolve(window.AMap)
      }
    }
  })
}
loadAMap.then()
```
