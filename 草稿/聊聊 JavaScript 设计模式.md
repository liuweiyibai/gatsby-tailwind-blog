---
title: 聊聊 JavaScript 设计模式
---

花了半个月时间学习了《JavaScript 设计模式与开发实践》 这本书，总结一下书中的设计模式和自己的理解

## 设计模式原则

- 单一职责原则（SRP）

  一个对象或方法只做一件事情。如果一个方法承担了过多的职责，那么在需求的变迁过程中，需要改写这个方法的可能性就越大。

  应该把对象或方法划分成较小的粒度

- 最少知识原则（LKP）

  一个软件实体应当 尽可能少地与其他实体发生相互作用

  应当尽量减少对象之间的交互。如果两个对象之间不必彼此直接通信，那么这两个对象就不要发生直接的 相互联系，可以转交给第三方进行处理

- 开放-封闭原则（OCP）

  软件实体（类、模块、函数）等应该是可以 扩展的，但是不可修改

  当需要改变一个程序的功能或者给这个程序增加新功能的时候，可以使用增加代码的方式，尽量避免改动程序的源代码，防止影响原系统的稳定

## 常见设计模式

1. 单例模式

   保证一个类仅有一个实例，并且提供一个访问它的全局访问点，即确保只有一个实例，并且可以全局访问

   ```js
   // 封装一个通用的单例函数，用来管理单例
   var getSingle = function (fn) {
     var result
     return function () {
       return result || (result = fn.apply(this, arguments))
     }
   }

   // 登录窗口类
   var createLoginLayer = function () {
     var div = document.createElement('div')
     div.innerHTML = '我是登录浮窗'
     div.style.display = 'none'
     document.body.appendChild(div)
     return div
   }

   // 使用单例模式来包装这个登录窗口类
   var createSingleLoginLayer = getSingle(createLoginLayer)

   // 以后就使用这个包装类来代替登录窗口类
   document.getElementById('loginBtn').onclick = function () {
     var loginLayer = createSingleLoginLayer()
     loginLayer.style.display = 'block'
   }
   ```

2. 策略模式

   定义一系列预置规则或者算法，把它们封装起来，并且可以相互替换。将预置规则的定义和使用分离开来。可以用来代替多 if 场景，进行解耦

   ```js
   // 预置策略
   var strategies = {
     S: function (salary) {
       return salary * 4
     },
     A: function (salary) {
       return salary * 3
     },
     B: function (salary) {
       return salary * 2
     }
   }
   // 根据策略计算
   var calculateBonus = function (level, salary) {
     return strategies[level](salary)
   }
   console.log(calculateBonus('S', 20000))
   console.log(calculateBonus('A', 10000))
   // 策略模式消除样板式if代码块
   ```

3. 代理模式

   为一个对象或者方法提供一个代用品或占位符，以便控制对它的访问。在访问主体之前，需要通过代理函数，代理函数就可以做一些额外操作。比如缓存相同参数的结算结果；比如函数节流，也是一种代理模式的应用；比如对消息的过滤，通过代理函数控制的消息才回进行继续操作；比如 react 的 高阶组件也是一种代理模式的应用。

   ```js
   // 缓存代理
   var mult = function () {
     var a = 1
     for (var i = 0, l = arguments.length; i < l; i++) {
       a = a * arguments[i]
     }
     return a
   }
   /**************** 计算加和 *****************/
   var plus = function () {
     var a = 0
     for (var i = 0, l = arguments.length; i < l; i++) {
       a = a + arguments[i]
     }
     return a
   }
   /**************** 创建缓存代理的工厂 *****************/
   var createProxyFactory = function (fn) {
     var cache = {}
     return function () {
       // 返回新的函数
       var args = Array.prototype.join.call(arguments, ',')
       if (args in cache) {
         return cache[args]
       }
       return
     }
   }
   var proxyMult = createProxyFactory(mult),
     proxyPlus = createProxyFactory(plus)
   alert(proxyMult(1, 2, 3, 4)) // 24
   alert(proxyMult(1, 2, 3, 4)) // 24 这次直接在缓存中取值
   alert(proxyPlus(1, 2, 3, 4)) // 10
   alert(proxyPlus(1, 2, 3, 4)) // 10 这次直接在缓存中取值
   ```

   节流函数

   ```js
   function debounce(fn, delay = 200) {
     let timer
     return function () {
       var args = arugments
       var ctx = this
       clearTimeout(timer)
       timer = null
       timer = setTimeout(function () {
         fn.apply(ctx, args)
       }, delay)
     }
   }
   ```

4. 迭代器模式

   迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。

   ```js
   // 定义函数，返回浏览器支持哪种文件上传方法
   var getActiveUploadObj = function () {
     try {
       return new ActiveXObject('TXFTNActiveX.FTNUpload')
     } catch (e) {
       return false
     }
   }
   var getFlashUploadObj = function () {
     if (supportFlash()) {
     }
     return false
   }
   var getFormUpladObj = function () {
     var str = '<input name="file" type="file" class="ui-file"/>'
     return $(str).appendTo($('body'))
     // 表单上传
   }

   // 定义迭代器，分别执行上述函数，取支持项返回
   var iteratorUploadObj = function () {
     for (var i = 0, fn; (fn = arguments[i++]); ) {
       var uploadObj = fn()
       if (uploadObj !== false) {
         return uploadObj
       }
     }
   }

   var uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUpladObj)
   ```

   封装一个通用的迭代器函数

   ```js
   function each(obj, cb) {
     var value
     if (Array.isArray(obj)) {
       for (var i = 0; i < obj.length; ++i) {
         value = cb.call(obj[i], i, obj[i])
         if (value === false) {
           break
         }
       }
     } else {
       for (var i in obj) {
         value = cb.call(obj[i], i, obj[i])
         if (value === false) {
           break
         }
       }
     }
   }

   each([1, 2, 3], function (index, value) {
     console.log(index, value)
   })

   each({ a: 1, b: 2 }, function (index, value) {
     console.log(index, value)
   })

   // 0 1
   // 1 2
   // 2 3

   // a 1
   // b 2
   ```

5. 发布-订阅模式

   也称作观察者模式，定义了对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。

   ```js
   var event = {
     clientList: [],
     listen(key, fn) {
       // 订阅函数
       if (this.clientList[key]) {
         // 不同的 key 可以由多人订阅
         this.clientList[key] = [];
       }
       this.clientList[key].push(fn);
     },
     trigger(key, ...args) {
       let fns = this.clientList[key]
       if(!fns || !fns.length){
         return false
       }
       for(let i =0,fn;fn = fns[i++]){
         fn.apply(this,args)
       }
     },
     remove(key, fn){
       const _self = this
       // 查找 key 返回监听函数数组
       const fns = this.clientList[key]
        if(!fns || !fns.length){
          return false
        }

        for(let l = fns.length - 1; l > 0;l--){
          var fn = fns[l]
          if(fn === fn){
            // 删除订阅者回调函数
            _self.splice(l,1)
          }
        }
     }
   };

   // 给某个对象添加发布订阅模式
   // 将发布订阅模型上的所有方法复制到目标对象上
   var installEvent = function(obj){
     for(let key in event){
       obj[key] = event[key]
     }
   }


   var observer = (function(){
     // 通过闭包建立全局缓存池
     var subscribes = {}

     return {
       // 订阅
       subscribe(key,fn){
         if(!subscribes[key]){
           subscribes[key] = []
         }
         // 订阅函数推入 以传入key参数为 key 的对象缓存池
         subscribes[key].push(fn)
       },
       // 发布
       // 触发订阅者的回调，其余参数传入回调函数中
       publish(key,...args){
         let fns = subscribes[key]
         if(!fns || !fns.length){
           return false
         }
         // 触发所有订阅函数
         for(let i = 0, len = fns.length;i < len;i++){
           fns[i].apply(this, args)
         }
       },
       // 移除订阅
       remove(key,fn){
         var fns = subscribes[key]
         if(!fns || !fns.length){
           return false
         }
         for(let i = fns.length - 1; i >= 0; i--){
           if(fn === fns[i]){
             fns.splice(i,1)
           }
         }
       }
     }
   })()
   ```

6. 命令模式

   用一种松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系，命令（command）指的是一个执行某些特定事情的指令

   ```js
   // 还可以实现简单的宏命令（一系列命令的集合）
   var MacroCommand = {
     commands: [],
     add: function (command) {
       this.commands.push(command)
       return this
     },
     remove: function (command) {
       if (!command) {
         this.commands = []
         return
       }
       for (var i = 0; i < this.commands.length; ++i) {
         if (this.commands[i] === command) {
           this.commands.splice(i, 1)
         }
       }
     },
     execute: function () {
       for (var i = 0; i < this.commands.length; ++i) {
         this.commands[i].execute()
       }
     }
   }

   var showTime = {
     execute: function () {
       console.log('time')
     }
   }

   var showName = {
     execute: function () {
       console.log('name')
     }
   }

   var showAge = {
     execute: function () {
       console.log('age')
     }
   }

   MacroCommand.add(showTime).add(showName).add(showAge)

   MacroCommand.remove(showName)

   MacroCommand.execute() // time age
   ```

   接下来的例子是一个自增命令，提供执行、撤销、重做功能

   ```js
   // 采用对象创建处理的方式，定义这个自增
   // 自增
   function IncrementCommand() {
     // 当前值
     this.val = 0
     // 命令栈
     this.stack = []
     // 栈指针位置
     this.stackPosition = -1
   }

   IncrementCommand.prototype = {
     constructor: IncrementCommand,
     // 执行
     execute: function () {
       this._clearRedo()

       // 定义执行的处理
       var command = function () {
         this.val += 2
       }.bind(this)

       // 执行并缓存起来
       command()

       this.stack.push(command)

       this.stackPosition++

       this.getValue()
     },

     canUndo: function () {
       return this.stackPosition >= 0
     },

     canRedo: function () {
       return this.stackPosition < this.stack.length - 1
     },

     // 撤销
     undo: function () {
       if (!this.canUndo()) {
         return
       }

       this.stackPosition--

       // 命令的撤销，与执行的处理相反
       var command = function () {
         this.val -= 2
       }.bind(this)

       // 撤销后不需要缓存
       command()

       this.getValue()
     },

     // 重做
     redo: function () {
       if (!this.canRedo()) {
         return
       }

       // 执行栈顶的命令
       this.stack[++this.stackPosition]()

       this.getValue()
     },

     // 在执行时，已经撤销的部分不能再重做
     _clearRedo: function () {
       this.stack = this.stack.slice(0, this.stackPosition + 1)
     },

     // 获取当前值
     getValue: function () {
       console.log(this.val)
     }
   }

   // 再实例化进行测试，模拟执行、撤销、重做的操作
   var incrementCommand = new IncrementCommand()

   // 模拟事件触发，执行命令
   var eventTrigger = {
     // 某个事件的处理中，直接调用命令的处理方法
     increment: function () {
       incrementCommand.execute()
     },

     incrementUndo: function () {
       incrementCommand.undo()
     },

     incrementRedo: function () {
       incrementCommand.redo()
     }
   }

   eventTrigger['increment']() // 2
   eventTrigger['increment']() // 4

   eventTrigger['incrementUndo']() // 2

   eventTrigger['increment']() // 4

   eventTrigger['incrementUndo']() // 2
   eventTrigger['incrementUndo']() // 0
   eventTrigger['incrementUndo']() // 无输出

   eventTrigger['incrementRedo']() // 2
   eventTrigger['incrementRedo']() // 4
   eventTrigger['incrementRedo']() // 无输出

   eventTrigger['increment']() // 6
   ```

7. 组合模式

   是用小的子对象来构建更大的对象，而这些小的子对象本身也许是由更小 的“孙对象”构成的。可以用树形结构来表示这种“部分- 整体”的层次结构。但要注意的是，组合模式不是父子关系，它是一种 HAS-A（聚合）的关系，将请求委托给 它所包含的所有叶对象。基于这种委托，就需要保证组合对象和叶对象拥有相同的 接口

   此外，也要保证用一致的方式对待 列表中的每个叶对象，即叶对象属于同一类，不需要过多特殊的额外操作

   ![组合模式结构图](//cdn.clearlywind.com/blog-images)

   使用组合模式来实现扫描文件夹中的文件

   ```js
   // 文件夹 组合对象
   function Folder(name) {
     this.name = name
     this.parent = null
     this.files = []
   }

   Folder.prototype = {
     constructor: Folder,

     add: function (file) {
       file.parent = this
       this.files.push(file)

       return this
     },

     scan: function () {
       // 委托给叶对象处理
       for (var i = 0; i < this.files.length; ++i) {
         this.files[i].scan()
       }
     },

     remove: function (file) {
       if (typeof file === 'undefined') {
         this.files = []
         return
       }

       for (var i = 0; i < this.files.length; ++i) {
         if (this.files[i] === file) {
           this.files.splice(i, 1)
         }
       }
     }
   }

   // 文件 叶对象
   function File(name) {
     this.name = name
     this.parent = null
   }

   File.prototype = {
     constructor: File,

     add: function () {
       console.log('文件里面不能添加文件')
     },

     scan: function () {
       var name = [this.name]
       var parent = this.parent

       while (parent) {
         name.unshift(parent.name)
         parent = parent.parent
       }

       console.log(name.join(' / '))
     }
   }

   // 构造好组合对象与叶对象的关系后，实例化，在组合对象中插入组合或叶对象
   var web = new Folder('Web')
   var fe = new Folder('前端')
   var css = new Folder('CSS')
   var js = new Folder('js')
   var rd = new Folder('后端')

   web.add(fe).add(rd)

   var file1 = new File('HTML权威指南.pdf')
   var file2 = new File('CSS权威指南.pdf')
   var file3 = new File('JavaScript权威指南.pdf')
   var file4 = new File('MySQL基础.pdf')
   var file5 = new File('Web安全.pdf')
   var file6 = new File('Linux菜鸟.pdf')

   css.add(file2)
   fe.add(file1).add(file3).add(css).add(js)
   rd.add(file4).add(file5)
   web.add(file6)

   rd.remove(file4)

   // 扫描
   web.scan()
   ```

8. 模板方法模式

   是基于继承的设计模式。模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。子类可以继承或者重新从父类继承的方法。这是一个严重依赖抽象类的设计模式。

   ```js
   // 返回一个构造器
   var Beverage = function (param) {
     var boilWater = function () {
       console.log('把水煮沸')
     }
     var brew =
       param.brew ||
       function () {
         throw new Error('必须传递 brew 方法')
       }
     var pourInCup =
       param.pourInCup ||
       function () {
         throw new Error('必须传递 pourInCup 方法')
       }
     var addCondiments =
       param.addCondiments ||
       function () {
         throw new Error('必须传递 addCondiments 方法')
       }
     var F = function () {}
     F.prototype.init = function () {
       boilWater()
       brew()
       pourInCup()
       addCondiments()
     }
     return F
   }

   // 实现构造器
   var Coffee = Beverage({
     brew: function () {
       console.log('用沸水冲泡咖啡')
     },
     pourInCup: function () {
       console.log('把咖啡倒进杯子')
     },
     addCondiments: function () {
       console.log('加糖和牛奶')
     }
   })

   var Tea = Beverage({
     brew: function () {
       console.log('用沸水浸泡茶叶')
     },
     pourInCup: function () {
       console.log('把茶倒进杯子')
     },
     addCondiments: function () {
       console.log('加柠檬')
     }
   })

   var coffee = new Coffee()
   coffee.init()
   var tea = new Tea()
   tea.init()
   ```

9. 享元模式

   享元（flyweight）模式是一种用于性能优化的模式，它的目标是尽量减少共享对象的数量。享元模式带来的好处很大程度上取决于如何使用以及何时使用，一般来说，以下情况发生时便可以使用享元模式。

   - 一个程序中使用了大量的相似对象。
   - 由于使用了大量对象，造成很大的内存开销。
   - 对象的大多数状态都可以变为外部状态。
   - 剥离出对象的外部状态之后，可以用相对较少的共享对象取代大量对象

   ```js
   // 实现一个通用的对象池
   var objectPoolFactory = function (createObjFn) {
     var objectPool = []
     return {
       create: function () {
         var obj = objectPool.length === 0 ? createObjFn.apply(this, arguments) : objectPool.shift()
         return obj
       },
       recover: function (obj) {
         objectPool.push(obj)
       }
     }
   }
   ```

10. 责任链模式

    使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。请求发送者只需要知道链中的第一个节点，弱化发送者和一组接收者之间的强联系，可以便捷地在职责链中增加或删除一个节点，同样地，指定谁是第一个节点也很便捷。

    ```js
    // 函数链式调用
    Function.prototype.after = function (fn) {
      var self = this
      return function () {
        var ret = self.apply(this, arguments)
        if (ret === 'nextSuccessor') {
          return fn.apply(this, arguments)
        }
        return ret
      }
    }

    // 使用 使用责任链模式获取浏览器支持的文件上传对象
    var getActiveUploadObj = function () {
      try {
        return new ActiveXObject('TXFTNActiveX.FTNUpload')
      } catch (e) {
        return 'nextSuccessor'
      }
    }
    var getFlashUploadObj = function () {
      if (supportFlash()) {
        var str = '<object type="application/x-shockwave-flash"></object>'
        return $(str).appendTo($('body'))
      }
      return 'nextSuccessor'
    }
    var getFormUpladObj = function () {
      return $('<form><input name="file" type="file"/></form>').appendTo($('body'))
    }
    var getUploadObj = getActiveUploadObj.after(getFlashUploadObj).after(getFormUpladObj)

    // 链式调用
    console.log(getUploadObj())
    ```

11. 中介者模式

    所有的相关对象都通过中介者对象来通信，而不是互相引用，所以当一个对象发生改变时，只需要通知中介者对象即可。多个对象，指的不一定得是实例化的对象，也可以将其理解成互为独立的多个项。当这些项在处理时，需要知晓并通过其他项的数据来处理。如果每个项都直接处理，程序会非常复杂，修改某个地方就得在多个项内部修改。我们将这个处理过程抽离出来，封装成中介者来处理，各项需要处理时，通知中介者即可。

    利用中介者模式设计一个泡泡堂游戏

    ```js
    function Player(name, teamColor) {
      this.name = name // 角色名字
      this.teamColor = teamColor // 队伍颜色
      this.state = 'alive'
      // 玩家生存状态
    }
    Player.prototype.win = function () {
      console.log(this.name + ' won ')
    }
    Player.prototype.lose = function () {
      console.log(this.name + ' lost')
    }
    /*******************玩家死亡*****************/
    Player.prototype.die = function () {
      this.state = 'dead'
      playerDirector.reciveMessage('playerDead', this)
    }
    /*******************移除玩家*****************/
    Player.prototype.remove = function () {
      playerDirector.reciveMessage('removePlayer', this)
      // 给中介者发送消息，移除一个玩家
    }
    /*******************玩家换队*****************/
    Player.prototype.changeTeam = function (color) {
      playerDirector.reciveMessage('changeTeam', this, color)
    }
    // 玩家工厂，创建新玩家，并且通知到中间者
    var playerFactory = function (name, teamColor) {
      var newPlayer = new Player(name, teamColor)
      return newPlayer
    }
    // 实现这个中介者 playerDirector 对象
    var playerDirector = (function () {
      // 保存所有玩家
      var players = {},
        // 中介者可以执行的操作
        operations = {}
      /****************新增一个玩家***************************/
      operations.addPlayer = function (player) {
        // 获取玩家的队伍颜色
        var teamColor = player.teamColor

        // 保存该玩家的队伍，不存在则新建
        players[teamColor] = players[teamColor] || []

        // 添加该玩家进队伍
        players[teamColor].push(player)
      }

      /****************移除一个玩家***************************/
      operations.removePlayer = function (player) {
        // 玩家队伍颜色
        var teamColor = player.teamColor,
          // 该队伍所有成员
          teamPlayers = players[teamColor] || []
        for (var i = teamPlayers.length - 1; i >= 0; i--) {
          // 删除这个队员
          if (teamPlayers[i] === player) {
            teamPlayers.splice(i, 1)
          }
        }
      }

      /****************玩家换队***************************/
      operations.changeTeam = function (player, newTeamColor) {
        // 从原队伍中删除
        operations.removePlayer(player)

        // 修改队伍颜色
        player.teamColor = newTeamColor

        // 增加到新的队伍中
        operations.addPlayer(player)
      }

      /****************玩家死亡*****************/
      operations.playerDead = function (player) {
        var teamColor = player.teamColor, // 获取队伍颜色
          teamPlayers = players[teamColor] // 玩家所在队伍 []

        // 队伍里面的人都死了
        var all_daed = teamPlayers.every(player => player.state === 'dead')

        if (all_daed) {
          teamPlayers.forEach(player => {
            // 本队所有玩家被判失败
            player.lose()
          })

          for (var color in players) {
            if (color !== teamColor) {
              // 获取其他队伍
              var teamPlayers = players[color]
              teamPlayers.forEach(player => {
                // 其他队伍玩家胜利
                player.win()
              })
            }
          }
        }
      }

      // 对外暴露方法，供其他玩家调用
      var reciveMessage = function () {
        var message = Array.prototype.shift.call(arguments)
        operations[message].apply(this, arguments)
      }

      return {
        reciveMessage
      }
    })()
    // 通过中间者，消除玩家与玩家间的耦合，玩家间通过中间者收发消息。
    ```

    但是中介者模式虽然降低了各个对象间的耦合，但中介者对象会成为一个复杂的对象。如果对象之间的复杂耦合确实导致调用和维护出现了困难，而且这些耦合度随项目的变化呈指数增长曲线，那我们就可以考虑用中介者模式来重构代码。

12. 装饰者模式

    装饰者模式可以动态的给某个对象添加一些额外的功能，但是不会影响从这个类中派生的其他对象。为对象动态加入行为，经过多重包装，可以形成一条装饰链。

    封装一个钩子函数，在函数调用之前或者函数调用之后执行的钩子函数

    ```js
    var before = function (fn) {
      var __self = this
      return function () {
        // 先执行 before 传入执行的函数
        fn.apply(this, arguments)
        // 返回原函数的调用
        return __self.apply(this, arguments)
      }
    }

    var after = functio(fn){
      var __self = this
      return function(){
        var res = __self.apply(this,arguments)
        fn.apply(this,arguments)
        return res
      }
    }
    ```

13. 状态模式

    事物内部状态的改变往往会带来事物的行为改变。在处理的时候，将这个处理委托给当前的状态对象即可，该状态对象会负责渲染它自身的行为。区分事物内部的状态，把事物的每种状态都封装成单独的类，跟此种状态有关的行为都被封装在这个类的内部。

[参考链接](https://segmentfault.com/a/1190000017787537)

## 备忘录模式

使用备忘录模式缓存 Ajax 请求。

```js
var ReqCache = (function () {
  // 请求缓存对象
  var CACHE = {
    GET: {}, // get 请求的接口数据
    POST: {} // post 请求的接口数据
  }
  var FILTER_KEYS = []

  // 过滤不太重要的请求参数 作为 缓存 key
  function getFilterReqParams(data) {
    var newData = {}
    for (var i in data) {
      var item = data[i]
      var typeItem = typeof item
      if (typeItem == 'object' && item != null) {
        newData[i] = getFilterReqParams(item)
      }
      // 找不到的时候赋值
      else if (FILTER_KEYS.indexOf(i) === -1) {
        newData[i] = item
      }
    }
    return newData
  }

  // 过滤路径中不要重要的符号 作为 缓存的 key
  function getFilterUrl(url) {
    return url.replace(/\.|\/|:|#|=|&|\?|-|(http|https)/g, '')
  }

  // 对象按字母排序
  function objKeySort(obj) {
    var newkey = Object.keys(obj).sort()
    var newObj = {}
    for (var i = 0; i < newkey.length; i++) {
      newObj[newkey[i]] = obj[newkey[i]]
    }
    return newObj
  }

  // 过滤请求的参数，返回一个适合作为 key 保存的 字符串
  function getCurrentKey(param) {
    var data = JSON.stringify(objKeySort(getFilterReqParams(param.data)))
    data = data.replace(/\.|\/|:|\{|\}|"|\?|,/g, '')

    return {
      data,
      url: getFilterUrl(param.url),
      method: param.method.toUpperCase()
    }
  }
  return {
    // 设置需要过滤的请求参数
    setFilterKeys(key) {
      if (Array.isArray(key)) FILTER_KEYS = key
      else FILTER_KEYS = [key]
    },
    // 设置缓存
    setCache(params, backData) {
      var { method, url, data } = getCurrentKey(params)
      var urlCache

      urlCache = CACHE[method]
      if (typeof urlCache[url] == 'undefined') urlCache[url] = {}

      urlCache[url][data] = backData
    },
    // 获取缓存；
    getCache(params) {
      var { method, url, data } = getCurrentKey(params)
      var urlCache = CACHE[method][url] || {}
      return urlCache[data]
    },
    // 删除缓存
    delCache(params) {
      var { method, url, data } = getCurrentKey(params)
      var urlCache = CACHE[method][url]
      var dataCache = urlCache && urlCache[data]

      dataCache && delete urlCache[data]
    }
  }
})()
```
