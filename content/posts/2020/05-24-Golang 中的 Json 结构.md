---
title: Golang 中的 Json 结构
date: 2020-05-24 10:11:23
category:
  - 编程笔记
tags: ['Golang']
slug: go-in-the-json-structure
thumbnail: '../../thumbnails/golang.png'
---

记录一下 Golang 中的 Json 数据结构实现，前后端开发时，数据在交互过程传递数据是在所难免的，比较通用和流行格式便是 Json ，Golang 语言提供了 `encoding/json` 包，用于处理 Json 数据的编码与解码。

除了 Json，XML 也常用于前后端的数据交互，不过由于简洁性、可读性和流行程度，Json 用得更加广泛。

## Golang 和 Json

使用 `encoding/json` 处理 json 编码与解码时，就必须处理好 Json 数据类型与 go 语言数据类型的对应关系。

- Json 的数字、字符串、布尔等在 go 语言中相应内置数据类型一一对应。
- Json 的数组则对应 go 的数组或 Slice(切片)。
- Json 的对象则对应 go 的 struct(结构体)或 map。

编码一个结构体时，结构体中只有首字母大写的成员才会被编码，首字母小写的成员会被忽略，另外，结构体中字段后面允许使用反引号声明成员的 Tag，用于说明成员的元信息。

```go
type Person struct {
  Id    int  `json:"id"`
  Username string `json:"username"`
  Sex   uint  `json:"gender"`
  Email  string `json:"email"`
}
```

上面的结构体 Person 中，我们定义了四个成员，并声明了每个成员的 Tag 信息， 其中 Sex 的 Tag 信息声明为 gender，所以编码后的结果为：

```json
[
  { "id": 1, "username": "xiaoming", "gender": 1, "email": "xiaoming@163.com" },
  { "id": 2, "username": "xiaohong", "gender": 2, "email": "xiaohong@163.com" }
]
```

### **编码**

将 go 语言的数据序列化为 Json 字符串的操作，称为编码;编码后的结果为一个 Json 格式的字符串。

1. json.Marshal 函数

   使用 json.Marshal 函数可以直接编码任意数据类型。

   ```go

   import (
    "encoding/json"
    "fmt"
   )
   func main() {
    members := []Member{
      {
        Id:1,
        Username:"小明",
        Sex:1,
        Email:"xiaoming@163.com",
      },
      {
        Id:2,
        Username:"小红",
        Sex:1,
        Email:"xiaohong@163.com",
      },
      {
        Id:3,
        Username:"小华",
        Sex:2,
        Email:"xiaohua@163.com",
      },
    }
    data,_ := json.Marshal(members)
    fmt.Printf("%s",data)
   }
   ```

2. json.Encoder

   json.Marshal 实际上只是对 json.Encoder 的封装，因此使用 json.Encoder 同样可以编码 JSON。

   ```go
   func main(){
    b := &bytes.Buffer{}
    encoder := json.NewEncoder(b)
    err := encoder.Encode(members)
    if err != nil{
      panic(err)
    }
    fmt.Println(b.String())
   }
   ```

### **解码**

将 Json 字符串反序列化为 go 相对应类型，称为解码。

1. json.Unmarshal 函数

   json.Unmarshal 与 json.Marshal 函数相反，用于解码 json 字符串。

   ```go
   func main() {
    str := `[
      {
        "id": 1,
        "username": "小明",
        "gender": 1,
        "email": "xiaoming@163.com"
      },
      {
        "id": 2,
        "username": "小红",
        "gender": 1,
        "email": "xiaohong@163.com"
      },
      {
        "id": 3,
        "username": "小华",
        "gender": 2,
        "email": "xiaohua@163.com"
      }
    ]`
    b := bytes.NewBufferString(str)
    var members []Member
    err := json.Unmarshal(b.Bytes(),&members)
    if err != nil{
      panic(err)
    }
    fmt.Println(members)
   }
   ```

2. json.Decoder

   ```go
   func main(){
      b := bytes.NewBufferString(str)
      var members []Member
      decoder := json.NewDecoder(b)
      err = decoder.Decode(&members)
      if err != nil{
        panic(err)
      }
      fmt.Println(members)
   }
   ```
