---
title: flutter 开发环境搭建
---

## 添加环境变量

因为使用的是 zsh

```bash
echo "\n" >> ~/.zshrc
echo "export PUB_HOSTED_URL=https://pub.flutter-io.cn" >> ~/.zshrc
echo "export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn" >> ~/.zshrc
source ~/.zshrc
```

下载 [flutter 的 sdk](https://flutter.dev/docs/development/tools/sdk/releases?tab=macos#macos)

解压 `sdk` 文件然后加入到环境变量中，我是放置在 `~/bin` 目录中，然后加入到环境变量

```bash
echo "~/bin/flutter/bin:$PATH" >> ~/.zshrc
source ~/.zshrc
flutter -h
```
