---
title: react-router 实现路由鉴权思路
tags:
  - react-router
  - react
category:
  - 编程笔记
slug: react-router-implements-routing-authentication-ideas
date: 2020-02-16 23:18:16
thumbnail: '../thumbnails/reactrouter.png'
---

## 应用示例

要实现的功能是经常遇到的场景，就是要控制不同的用户角色来访问不同的页面，这里总共有四个页面：

```terminal
/index: 网站首页
/login: 登录页
/backend：后台页面
/admin：管理页面
```

另外还有三种角色：

```terminal
未登录用户：只能访问网站首页/index和登录页/login
普通用户：可以访问网站首页/index，登录页/login和后台页面/backend
管理员：可以访问管理页面/admin和其他所有页面
```

## 页面基本结构

1. 定义 `App.js`

   ```js
   import React from 'react';
   import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
   import Home from './pages/Home';
   import Login from './pages/Login';
   import Backend from './pages/Backend';
   import Admin from './pages/Admin';

   function App() {
     return (
       <Router>
         <Switch>
           <Route path="/login" component={Login} />
           <Route path="/backend" component={Backend} />
           <Route path="/admin" component={Admin} />
           <Route path="/" component={Home} />
         </Switch>
       </Router>
     );
   }
   export default App;
   ```

2. `Home.js` 中添加跳转逻辑

   ```js
   import React, { Fragment } from 'react';
   import { Link } from 'react-router-dom';
   function Home() {
     return (
       <Fragment>
         <h1>首页</h1>
         <ul>
           <li>
             <Link to="/login">登录</Link>
           </li>
           <li>
             <Link to="/backend">后台</Link>
           </li>
           <li>
             <Link to="/admin">管理员</Link>
           </li>
         </ul>
       </Fragment>
     );
   }
   export default Home;
   ```

## 路由模块拆分

- 拆分公共部分到独立模块

  ```js
  // 拆分 所有用户可以访问到的到一个单独的模块 publicRoutes.js
  import Login from '../pages';
  import Home from '../pages/Home';
  const publicRoutes = [
    {
      path: '/login',
      component: Login,
      exact: true,
    },
    {
      path: '/',
      component: Home,
      exact: true,
    },
  ];

  export default publicRoutes;
  ```

- 分别定义应用公共模块

  - 普通用户

    ```js
    import Backend from '../pages/Backend';
    export default [
      {
        path: '/backend',
        component: Backend,
        exact: true,
        role: 'user', // 当前路由需要的角色权限
        backUrl: '/login', // 不满足权限跳转的路由
      },
    ];
    ```

  - 管理用户

    ```js
    import Admin from '../pages/Admin';
    export default [
      {
        path: '/admin',
        component: Admin,
        exact: true,
        role: 'admin', // 需要的权限是admin
        backUrl: '/backend', // 不满足权限跳回后台页面
      },
    ];
    ```

  - 公共模块 未登录用户

    ```js
    import publicRoutes from './routes/publicRoutes';
    function App() {
      return (
        <Router>
          <Switch>
            {publicRoutes.map(({ path, component, ...props }) => (
              <Route key={path} path={path} component={component} {...props} />
            ))}
            <Route path="/backend" component={Backend} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </Router>
      );
    }
    ```

这样我们的 `App.js` 里面就不会有冗长的路由路由列表了，而是只需要循环一个数组就行了。但是对于需要登录才能访问的页面和管理员页面我们不能直接渲染 `Route` 组件，我们最好再封装一个高阶组件，将鉴权的工作放到这个组件里面去，这样我们普通的页面在实现时就不需要关心怎么鉴权了

## 实现高阶鉴权组件

将它命名为 `AuthRoute` 吧，注意我们这里假设的用户登录时后端 `API` 会返回给我们当前用户的角色，一个用户可能有多个角色，比如普通用户的角色是`['user']`，管理员的角色是`['user', 'admin']`，具体的权限验证逻辑要看自己项目权限的设计，具体实现

```js
// AuthRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function AuthRoute(props) {
  const {
    user: { role: userRole },
    role: routeRole,
    backUrl,
    token,
    ...otherProps
  } = props;

  // 如果用户有权限，就渲染对应的路由
  if (userRole && userRole.indexOf(routeRole) > -1 && token) {
    return <Route {...otherProps} />;
  } else {
    // 如果没有权限，返回配置的默认路由
    return <Redirect to={backUrl} />;
  }
}

export default AuthRoute;
```

使用 AuthRoute 包装需要角色验证的组件

```js
{
  privateRoutes.map(route => <AuthRoute key={route.path} {...route} />);
}
{
  adminRoutes.map(route => <AuthRoute key={route.path} {...route} />);
}
```

## 登录设置权限

在我们的 `AuthRoute` 里面用到了 `user: { role }` 这个变量，但是我们还没设置它。真实项目中一般是登录的时候后端 `API` 会返回当前用户的角色，然后前端将这个权限信息保存在一些状态管理工具里面，比如 `Redux`。我们这里直接在 `Login` 页面写死两个按钮来模拟这个权限了，用户的配置就用根组件的 `state` 来管理了，`Login` 页面的两个按钮会改变对应的 `state`

```js
import React from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
  const { loginAsUser, loginAsAdmin, history } = props;
  const userLoginHandler = () => {
    loginAsUser(); // 调用父级方法设置用户权限
    history.replace('/backend'); // 登录后跳转后台页面
  };
  const adminLoginHandler = () => {
    loginAsAdmin(); // 调用父级方法设置管理员权限
    history.replace('/admin'); // 登录后跳转管理员页面
  };
  return (
    <>
      <h1>登录页</h1>
      <button onClick={userLoginHandler}>普通用户登录</button>
      <br />
      <br />
      <button onClick={adminLoginHandler}>管理员登录</button>
      <br />
      <br />
      <Link to="/">回首页</Link>
    </>
  );
}

export default Login;
```
