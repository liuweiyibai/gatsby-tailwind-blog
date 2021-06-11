---
title: git 提交代码时添加 emoji 图标
date: 2020-10-18 16:46:18
category:
  - 编程笔记
tags: ['git']
slug: git-commits-to-add-emoj-icon
thumbnail: '../../thumbnails/git.png'
---

## 前言

[gitmoji](https://gitmoji.carloscuesta.me/) 是一个标准化和解释在 GitHub 提交消息上使用[emoji](https://gitmoji.carloscuesta.me/)的倡议。 gitmoji 是一个开源项目，专门规定了在 github 提交代码时应当遵循的 emoji 规范

在 git commit 上使用 emoji 提供了一种简单的方法，仅通过查看所使用的表情符号来确定提交的目的或意图。

## 概述

在执行 git commit 指令时使用 emoji 图标为本次提交添加一个特别的图标， 这个本次提交的记录很容易突出重点，或者说光看图标就知道本次提交的目的。这样就方便在日后查看历史提交日子记录中快速的查找到对于的提交版本。由于有很多不同的表情符号，表情库更新后，没有一个可以帮助更轻松地使用表情符号的中文表情库列表。所以这里主要列出 gitmoji 项目中规定的 emoji 规范的表情符号列表。

使用 `git` 的开发者都知道提交代码的最简单命令： `git commit -m '此次提交的内容说明'`。在 commit 时，添加了 `emoji` 表情说明，我们来看看其命令语法：

```bash
git commit -m ':emoji: 此次提交的内容说明'
```

添加多个 emoji 表情图标:

```bash
git commit -m ':emoji1: :emoji2: :emoji3: 此次提交的内容说明'
```

在提交内容的前面增加了 emoji 标签： **:emoji:**，其中 emoji 是表情图标的标签，列表见下面的附录表格。

## gitmoji 表情库

|                  emoji                   |          emoji 代码           |         commit 说明         |
| :--------------------------------------: | :---------------------------: | :-------------------------: |
|              :art: (调色板)              |            :`art`:            |    改进代码结构/代码格式    |
|    :zap: (闪电) / :racehorse: (赛马)     |    :`zap`: / :`racehorse`:    |          提升性能           |
|              :fire: (火焰)               |           :`fire`:            |       移除代码或文件        |
|               :bug: (bug)                |            :`bug`:            |          修复 bug           |
|           :ambulance: (急救车)           |         :`ambulance`:         |          重要补丁           |
|            :sparkles: (火花)             |         :`sparkles`:          |         引入新功能          |
|             :memo: (备忘录)              |           :`memo`:            |          撰写文档           |
|             :rocket: (火箭)              |          :`rocket`:           |          部署功能           |
|            :lipstick: (口红)             |         :`lipstick`:          |     更新 UI 和样式文件      |
|              :tada: (庆祝)               |           :`tada`:            |          初次提交           |
|     :white_check_mark: (白色复选框)      |     :`white_check_mark`:      |          增加测试           |
|               :lock: (锁)                |           :`lock`:            |        修复安全问题         |
|              :apple: (苹果)              |           :`apple`:           |     修复 macOS 下的问题     |
|         :checkered_flag: (旗帜)          |       :`checked_flag`:        |    修复 Windows 下的问题    |
|             :penguin: (企鹅)             |          :`penguin`:          |     修复 Linux 下的问题     |
|         :robot: (Android 机器人)         |           :`robot`:           |  修复 Android 上的某些内容  |
|          :green_apple: (绿苹果)          |        :`green_apple`:        |   解决 iOS 上的某些问题。   |
|            :bookmark: (书签)             |         :`bookmark`:          |        发行/版本标签        |
|        :rotating_light: (警车灯)         |      :`rotating_light`:       |      移除 linter 警告       |
|          :construction: (施工)           |       :`construction`:        |         工作进行中          |
|           :green_heart: (绿心)           |        :`green_heart`:        |      修复 CI 构建问题       |
|         :arrow_down: (下降箭头)          |        :`arrow_down`:         |          降级依赖           |
|          :arrow_up: (上升箭头)           |         :`arrow_up`:          |          升级依赖           |
|             :pushpin: (图钉)             |         :`arrow_up`:          |  将依赖关系固定到特定版本   |
|       :construction_worker: (工人)       |    :`construction_worker`:    |      添加 CI 构建系统       |
| :chart_with_upwards_trend: (上升趋势图)  | :`chart_with_upwards_trend`:  |     添加分析或跟踪代码      |
|           :recycle: (循环箭头)           |          :`recycle`:          |          重构代码           |
|             :hammer: (锤子)              |          :`hammer`:           |          重大重构           |
|              :whale: (鲸鱼)              |           :`whale`:           |       Docker 相关工作       |
|        :heavy_minus_sign: (减号)         |     :`heavy_minus_sign`:      |        减少一个依赖         |
|         :heavy_plus_sign: (加号)         |      :`heavy_plus_sign`:      |        增加一个依赖         |
|             :wrench: (扳手)              |          :`wrench`:           |        修改配置文件         |
|      :globe_with_meridians: (地球)       |   :`globe_with_meridians`:    |       国际化与本地化        |
|             :pencil2: (铅笔)             |          :`pencil2`:          |          修复 typo          |
|             :hankey: (瞪眼)              |          :`hankey`:           |   编写需要改进的错误代码    |
|           :rewind: (双左箭头)            |          :`rewind`:           |          恢复更改           |
| :twisted_rightwards_arrows: (双合并箭头) | :`twisted_rightwards_arrows`: |          合并分支           |
|             :package: (箱子)             |          :`package`:          |     更新编译的文件或包      |
|              :alien: (面具)              |           :`alien`:           | 由于外部 API 更改而更新代码 |
|             :truck: (面包车)             |           :`truck`:           |      移动或重命名文件       |
|         :page_facing_up: (文档)          |      :`page_facing_up`:       |      添加或更新许可证       |
|              :boom: (爆炸)               |           :`boom`:            |       介绍突破性变化        |
|            :bento: (装满餐盘)            |           :`bento`:           |       添加或更新资产        |
|           :ok_hand: (OK 手势)            |          :`ok_hand`:          | 由于代码审查更改而更新代码  |
|           :wheelchair: (坐姿)            |        :`wheelchair`:         |        提高可访问性         |
|              :bulb: (灯泡)               |           :`bulb`:            |         记录源代码          |
|              :beers: (干杯)              |           :`beers`:           |      醉生梦死的写代码       |
|        :speech_balloon: (提示栏)         |      :`speech_balloon`:       |       更新文字和文字        |
|        :card_file_box: (卡片盒子)        |       :`card_file_box`:       |   执行与数据库相关的更改    |
|         :loud_sound: (有声喇叭)          |        :`loud_sound`:         |          添加日志           |
|            :mute: (静音喇叭)             |           :`mute`:            |          删除日志           |
|     :busts_in_silhouette: (两个人头)     |    :`busts_in_silhouette`:    |         添加贡献者          |
|       :children_crossing: (小盆友)       |     :`children_crossing`:     |     改善用户体验/可用性     |
|      :building_construction: (吊车)      |   :`building_construction`:   |        进行架构更改         |
|             :iphone: (手机)              |          :`iphone`:           |      致力于响应式设计       |
|           :clown_face: (小丑)            |        :`clown_face`:         |          嘲笑事物           |
|               :egg: (彩蛋)               |            :`egg`:            |     添加一个复活节彩蛋      |
|         :see_no_evil: (蒙眼猴子)         |        :`see_no_evil`:        |  添加或更新.gitignore 文件  |
|         :camera_flash: (照相机)          |       :`camera_flash`:        |       添加或更新快照        |

参考资料 :

- [gitmoji](https://gitmoji.carloscuesta.me/)
- [emoji 大全](https://www.emojidaquan.com/emoji-memo)
- [git-emoji-guide](https://hooj0.github.io/git-emoji-guide/)
- [GitCommitEmoji.md](https://gist.github.com/parmentf/035de27d6ed1dce0b36a)
