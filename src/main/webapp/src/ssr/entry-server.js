import createApp from "../main";

const vm = createApp();
const renderVueComponentToString = require("vue-server-renderer/basic.js");

global.renderServer = context => {
  console.log("renderServer in entry server");
  console.log("context:" + JSON.stringify(context));
  return new Promise((resolve, reject) => {
    renderVueComponentToString(vm, context, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(res);
      console.log(res);
    });
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
