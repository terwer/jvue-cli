// yarn babel ./src/ssr/entry-server.js --presets=@babel/preset-env

import { createApp } from "../main";

const renderVueComponentToString = require("vue-server-renderer/basic.js");

// 解构赋值
const { vm, router } = createApp();
vm.$mount("#app");

global.renderServer = context => {
  console.log("renderServer in entry server");
  console.log(`
===context start===`);
  console.log(JSON.stringify(context));
  console.log(`===context end===
  `);
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前就已经准备就绪。
  return new Promise((resolve, reject) => {
    // 设置服务器端router的位置
    // 给路由推一条记录，上面的{app,router}只是一个对象，没有走真正渲染那步，
    // 所以只有主动调用router.push()它才会执行这部分的代码，
    // 给我们匹配到我们要调用的这些组件
    router.push(context.url);
    console.log(`context.url:${context.url}`);

    // 等到router将可能的异步组件和钩子函数解析完
    // router.onReady基本上只有在服务端才会被用到，
    // 在路由记录被推进去的时候，路由所有的异步操作都做完的时候才会调用这个回调，
    // 比如在服务端被渲染的时候，获取一些数据的操作
    router.onReady(
      () => {
        const matchedComponents = router.getMatchedComponents();
        // 匹配不到的路由，执行reject函数，并返回 404
        if (!matchedComponents.length) {
          return reject({
            status: 0,
            data: "No matchedComponents",
            msg: "404 Not Found"
          });
        }

        //Render the html string
        console.log("Render the html string");
        renderVueComponentToString(vm, context, (err, html) => {
          if (err) {
            console.log("Error rendering to string:");
            console.log(err);
            return reject({
              status: 0,
              data: err,
              msg: "500 Internal Server Error:renderVueComponentToString"
            });
          }

          // Promise应该resolve渲染后的html
          console.log("Promise resolved success");
          resolve({ status: 1, data: html, msg: "200 OK" });
        });
      },
      err => {
        // 错误返回
        console.log("router.onReady error callback");
        console.log(err);
        reject({
          status: 0,
          data: err,
          msg: "500 Internal Server Error:router.onReady error callback"
        });
      }
    );
  });
};

// DEMO
// import Vue from "vue";
// const renderVueComponentToString = require("vue-server-renderer/basic.js");
//
// console.log("renderVueComponentToString");
// console.log(renderVueComponentToString);
//
// // app.js
// const vm = new Vue({
//     template: `<div>{{ msg }}</div>`,
//     data: {
//         msg: "hello"
//     }
// });
// console.log("data.msg:" + vm.$data.msg);
//
// console.log("renderVueComponentToString");
// console.log(renderVueComponentToString);
//
// global.renderServer = context => {
//     console.log("context:" + JSON.stringify(context));
//     return new Promise((resolve, reject) => {
//         renderVueComponentToString(vm, context, (err, res) => {
//             if (err) {
//                 console.log(err);
//                 reject(err);
//             }
//             resolve(res);
//             console.log(res);
//         });
//     });
// };
