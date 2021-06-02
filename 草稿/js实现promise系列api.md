---
title: js 实现 promise 系列 api
---

Promise 是 es6 出现的新api，用来解决回调地狱的额问题

```js
Promise.prototype.all = function (iterators) {
  const promises = Array.from(iterators);
  const promiseList = [],
    len = promises.length;
  let count = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(res => {
          count++;
          promiseList[index] = res;
          if (count === len) {
            resolve(promiseList);
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  });
};

const promise1 = Promise.resolve('promise1');
const promise2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 2000, 'promise2');
});
const promise3 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 1000, 'promise3');
});

Promise.all([promise1, promise2, promise3]).then(function (values) {
  console.log(values);
});
```
