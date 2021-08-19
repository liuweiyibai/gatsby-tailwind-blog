---
title: xx
---

总结一下 go 语言中对字符串的操作，比如常见的字符串拼接，字符串换 slice、数组，字符串转其他类型等。

## 字符串拼接方法

1. 最常用的方法肯定是 + 连接两个字符串。

   这与 python 类似，不过由于 golang 中的字符串是不可变的类型，因此用 + 连接会产生一个新的字符串对效率有影响

   ```go
   s1 := "字符串"
   s2 := "拼接"
   s3 := s1 + s2
   fmt.Print(s3) //s3 = "打印字符串"
   ```

2. 使用 `sprintf` 函数

   虽然不会像直接使用 + 那样产生临时字符串。但是效率也不高

   ```go
   s1 := "字符串"
   s2 := "拼接"
   s3 := fmt.Sprintf("%s%s", s1, s2) //s3 = "打印字符串"
   ```

3. 使用 `Join` 函数

   这里我们需要先引入 `strings` 包才能调用 `Join` 函数。Join 函数会先根据字符串数组的内容，计算出一个拼接之后的长度，然后申请对应大小的内存，一个一个字符串填入，在已有一个数组的情况下，这种效率会很高，如果没有的话效率也不高。

   ```go
   //需要先导入 strings 包
     s1 := "字符串"
     s2 := "拼接"
     //定义一个字符串数组包含上述的字符串
     var str []string = []string{s1, s2}
     //调用 Join 函数
     s3 := strings.Join(str, "")
     fmt.Print(s3)
   ```

4. 调用 `buffer.WriteString` 函数

   这种方法的性能就要大大优于上面的了。

   ```go
     //需要先导入 bytes 包
     s1 := "字符串"
     s2 := "拼接"
     //定义 Buffer 类型
     var bt bytes.Buffer
     //向 bt 中写入字符串
     bt.WriteString(s1)
     bt.WriteString(s2)
     //获得拼接后的字符串
     s3 := bt.String()
   ```

5. 使用 `buffer.Builder`

   这个方法和上面的差不多，不过官方建议用这个，使用方法和上面基本一样

   ```go
     //需要先导入 Strings 包
     s1 := "字符串"
     s2 := "拼接"
     var build strings.Builder
     build.WriteString(s1)
     build.WriteString(s2)
     s3 := build.String()
   ```

## 数字和字符串之间的互转

收集 `golang` 中操作字符串常见的操作

- 提取提取给定字符串首尾返回字符串中间字符

  ```go
  func BetweenInString(str, starting, ending string) string {
    s := strings.Index(str, starting)
    if s < 0 {
      return ""
    }
    s += len(starting)
    e := strings.Index(str[s:], ending)
    if e < 0 {
      return ""
    }
    return str[s : s+e]
  }
  ```

- `golang` 正则表达式查找字符串中的数字

  ```go
  re := regexp.MustCompile("[0-9]+")
  fmt.Println(re.FindAllString("abc123def987asdf", -1))
  ```
