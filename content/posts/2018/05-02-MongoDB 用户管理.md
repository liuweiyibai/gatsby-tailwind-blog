---
title: MongoDB 用户管理
date: 2018-05-02 22:10:00
tags: ['MongoDB']
category:
  - 编程笔记
slug: mongodb-user-management
thumbnail: '../../thumbnails/mongodb.png'
---

## MongoDB 中基本角色

1. 数据库用户角色：read、readWrite;
2. 数据库管理角色：dbAdmin、dbOwner、userAdmin；
3. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；
4. 备份恢复角色：backup、restore；
5. 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
6. 超级用户角色：root

Mongo 相关命令

```js
// 显示当前系统用户
db.system.users.find();

// MongoDB 登录
db.auth('test', 'test');
```

## 给 `admin` 设置密码

```mongo
db.createUser({user:"admin",pwd:"password",roles:["root"]})
```

## 修改 admin 密码

> 需要修改 `MongoDB` 的启动方式为不需要密码，即没有`--auth` 选项

```mongo
db.updateUser('root',{pwd:'654321',roles:[{role:'root',db:'admin'}]})
db.updateUser('admin',{pwd:'654321',roles:[{role:'root',db:'admin'}]})
```

## 新建用户

- 管理某个数据库的用户

  ```bash
  use test # switched to db test
  db # test
  # 新建 test 用户
  db.createUser({user: "test",pwd: "test",roles: [{ role: "readWrite",db:"test" }]})

  use demo
  db # demo
  db.createUser({user: "test",pwd: "test",roles: [{ role: "readWrite",db:"demo" }]})
  ```

## 删除

```js
use admin
db.dropUser('test')
```

## 命令行登录 Mongo

```bash
mongo -uroot -p123456 localhosst:27017/admin
```
