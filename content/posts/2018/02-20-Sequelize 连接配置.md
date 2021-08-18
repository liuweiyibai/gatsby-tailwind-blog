---
title: Sequelize 连接配置
tags:
  - Node.js
  - Sequelize
category:
  - 编程笔记
date: 2018-02-20 11:57:47
slug: sequelize-connection-configuration
thumbnail: '../../thumbnails/sequelize.png'
---

## 基本配置项

```js
const sequelize = new Sequelize('database', 'username', 'password', {
  // 自定义主机; 默认值: localhost
  host: 'my.server.tld',

  // 自定义端口; 默认值: 3306
  port: 12345,

  // 自定义协议
  // - 默认值: 'tcp'
  // - 版本: v1.5.0
  // - 仅限 postgres, 用于 heroku
  protocol: null,

  // 禁用日志; 默认值: console.log
  logging: false,

  // 数据库的 sql 方言
  // - 当前支持: 'mysql', 'sqlite', 'postgres', 'mssql'
  dialect: 'mysql',

  // 你还可以将任何方言选项传递到底层方言库
  // - 默认是空
  // - 当前支持: 'mysql', 'postgres', 'mssql'
  dialectOptions: {
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    supportBigNumbers: true,
    bigNumberStrings: true,
  },

  // sqlite 的存储引擎
  // - 默认值 ':memory:'
  storage: 'path/to/database.sqlite',

  // 禁止将未定义的值插入为NULL
  // - 默认值: false
  omitNull: true,

  // 是否使用本地库的标志
  // 如果是 'pg' -- 设置为 true 将允许 SSL 支持
  // - 默认值: false
  native: true,

  // 指定在调用 sequelize.define 时使用的选项
  // 如下示例:
  //   define: {timestamps: false}
  // 这基本等同于:
  //   sequelize.define(name, attributes, { timestamps: false })
  // 没有必要像这样去设置每个定义的时间戳选项
  // 下面你看到的这些可能设置的键. 本章中都进行了说明
  define: {
    underscored: false, // 是否使用 _ 连接表名
    freezeTableName: false, // 固定表名
    syncOnAssociation: true,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci',
    },
    timestamps: true, // 是否开启时间戳
  },

  // 类似于同步：你可以定义始终强制同步模型
  sync: { force: true },

  // 每次关联后进行同步（见下文）。 如果设置为 false，则需要在设置所有关联后手动进行同步。 默认值: true
  syncOnAssociation: true,

  // 使用连接池来减少数据库连接超载并提高速度
  // 当前仅支持 mysql 和 postgresql (从 v1.5.0 开始)
  pool: { max: 5, idle: 30 },

  // 用于确定如何根据 [lingo project](https://github.com/visionmedia/lingo) 将单词翻译成单数形式或复数形式
  // 选项为: en [默认], es
  language: 'en',

  // 每个事务的隔离级别. 默认是 REPEATABLE_READ
  // 可用选项:
  // READ_UNCOMMITTED
  // READ_COMMITTED
  // REPEATABLE_READ
  // SERIALIZABLE
  isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
});
```

## 模糊查询

```js
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const userList = await User.findAll({
 raw: true,
  // 按照name排序
  order: [
    ['name', 'DESC']
  ],
  where: {
    // name: 'cheny', // 精确查询
    mobile_no: {
      // 模糊查询
      [Op.like]:'%' + mobile_no + '%'
    }
  },
  attributes:['id','name']， // 控制返回哪些字段
})
```

## 查询且返回总条数

## 合并字段

## 设置自增 id 为 uuid

## 定义 id 字段

```js
{
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV1,
    unique: true
  },
}
```
