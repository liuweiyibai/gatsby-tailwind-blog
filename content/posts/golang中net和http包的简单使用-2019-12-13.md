---
title: golang 中 net 和 http 包的简单使用
date: 2019-12-13 17:56:00
tags: ['golang']
category:
  - 编程笔记
slug: simple-use-of-net-and-http-packages-in-golang
thumbnail: '../thumbnails/golang.png'
---

`http` 包提供了 `http` 客户端和服务端的实现，`Get` ， `Head` ， `Post` 和 `PostForm` 函数发出 `http` 、 `https` 的请求

- 基本使用

  ```go
  // 简单的访问网站，由于没有添加header，访问数据不正确
  package main
  import (
      "fmt"
      "io/ioutil"
      "net/http"
  )
  func main() {
      res,err:=http.Get("https://www.baidu.com")
      if err !=nil{
          panic(err)
      }
      defer res.Body.Close()
      body, err := ioutil.ReadAll(res.Body)
      fmt.Println(string(body))
  }
  ```

- 携带 `header`

  ```go
  // 建立的client客户端，发起的get请求，在请求体中添加header，然后使用client执行这个请求
  package main

  import (
      "fmt"
      "io/ioutil"
      "net/http"
  )

  func main() {
      client:=&http.Client{}
      res,err:=http.NewRequest("GET","https://www.baidu.com",nil)
      res.Header.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36")
      resp,err:=client.Do(res)
      if err != nil {
          panic(err)
      }
      defer resp.Body.Close()
      body, err := ioutil.ReadAll(resp.Body)
      fmt.Println(string(body))
  }
  ```

- 其他参数设置

  ```go
  package main

  import (
      "bufio"
      "fmt"
      "github.com/axgle/mahonia"
      "golang.org/x/net/html/charset"
      "golang.org/x/text/encoding"
      "io"
      "io/ioutil"
      "net/http"
      "strconv"
  )

  func main() {
    client := &http.Client{}
    request, err := http.NewRequest("GET", "http://www.baidu.com", nil)
    if err != nil {
      fmt.Println(err)
    }
    //建立cookie对象
    cookie := &http.Cookie{Name: "maple", Value: strconv.Itoa(123)}
    request.AddCookie(cookie) //向request中添加cookie

    //设置request的header
    request.Header.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3")
    request.Header.Set("Accept-Language", "zh-CN,zh;q=0.9")
    request.Header.Set("Cache-Control", "no-cache")
    request.Header.Set("Connection", "keep-alive")

    response, err := client.Do(request)
    if err != nil {
      fmt.Println(err)
      return
    }
    e:=determineEncoding(response.Body)
    fmt.Println("当前编码：",e)

    defer response.Body.Close()

    if response.StatusCode == 200 {
      r, err := ioutil.ReadAll(response.Body)
      if err != nil {
          fmt.Println(err)
      }
      //编码转换，如编码不正确可转成指定编码
      srcCoder :=mahonia.NewEncoder("utf-8")
      res:=srcCoder.ConvertString(string(r))

      fmt.Println(res)
    }
  }

    //编码检测
  func determineEncoding(r io.Reader) encoding.Encoding  {
      bytes, err := bufio.NewReader(r).Peek(1024)
      if err != nil {
          panic(err)
      }
      e, _, _ := charset.DetermineEncoding(bytes, "")
      return e
  }
  ```
