---
title: momentjs 基本使用
tags: ['前端工具']
category:
  - 编程笔记
slug: momentjs-basic-use
date: 2018-10-01 11:00:00
thumbnail: '../../thumbnails/moment.png'
---

`momentjs` 是一个 `js` 时间处理库

## 安装

```bash
npm i moment --save
```

## 获取特定时间点

- 获取当前周、当前天、当前年、当前月

  ```js
  // scope 可取值为: /day/week/month/quarter/year
  let scope = 'day'
  const startDate =moment().startOf(scope).valueOf()；// 获取到时间戳
  const endDate = moment().valueOf()；//获取的是当前系统时间
  ```

- 获取上`周一00:00:00`~`周日23:59:59`

  ```js
  const startDate = moment()
    .week(moment().week() - 1)
    .startOf('week')
    .valueOf()
  const endDate = moment()
    .week(moment().week() - 1)
    .endOf('week')
    .valueOf()
  ```

- `上个月一号的00:00:00`~`上个月最后一天的23:59:59`

  ```js
  const startDate = moment()
    .month(moment().month() - 1)
    .startOf('month')
    .valueOf()
  const endDate = moment()
    .month(moment().month() - 1)
    .endOf('month')
    .valueOf()
  ```

- `上个季度第一个月一号的00:00:00`~`上个季度最后一个月最后一天的23:59:59`

  ```js
  const startDate = moment()
    .quarter(moment().quarter() - 1)
    .startOf('quarter')
    .valueOf()
  const endDate = moment()
    .quarter(moment().quarter() - 1)
    .endOf('quarter')
    .valueOf()
  ```

### 其他

```js
moment().format('YYYY-MM-DD HH:mm:ss') //当前时间

moment().subtract(10, 'days').format('YYYY-MM-DD') //当前时间的前10天时间

moment().subtract(1, 'years').format('YYYY-MM-DD') //当前时间的前1年时间

moment().subtract(3, 'months').format('YYYY-MM-DD') //当前时间的前3个月时间

moment().subtract(1, 'weeks').format('YYYY-MM-DD') //当前时间的前一个星期时间
```
