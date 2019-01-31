// 编译app.js
// yarn babel ./tests/ssr/test-entry-server.js --presets=@babel/preset-env
// 编译并运行app.js
// yarn babel-node ./tests/ssr/test-entry-server.js --presets=@babel/preset-env

// =============================
// This is polyfill not in node
// =============================
//
// 模拟window
var window = {
  navigator: {
    userAgent: "Chrome"
  }
};
global.window = window;

// =============================
// Require compiled script
// =============================
require("../../ssrsdist/js/app.js");
require("../../ssrsdist/js/about.js");

// =============================
// Test script start
// =============================
console.log("renderServer test start");
const context = {
  url: "/"
  // url: "/about"
};

const promise = global.renderServer(context);
console.log("promise");
console.log(promise);
if (promise) {
  promise.then(
    value => {
      console.log(value);
    },
    reason => {
      console.log(reason);
    }
  );
  console.log("renderServer test run success");
}

// DEMO
// yarn babel ./tests/ssr/test-entry-server.js --presets=@babel/preset-env
// yarn babel-node ./tests/ssr/test-entry-server.js --presets=@babel/preset-env

// require("../../src/ssr/entry-server")

// const context = {
//   url: "/"
// };
//
// const promise = global.renderServer(context);
// console.log("promise");
// console.log(promise);
//
// promise.then(
//     value => {
//       console.log(value);
//     },
//     reason => {
//       console.log(reason);
//     }
// );
