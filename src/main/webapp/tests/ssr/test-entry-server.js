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
require("../../ssrdist/server/app.js");

// =============================
// Test script start
// =============================
console.log("renderServer test start");
const context = {
  url: "/"
};

const promise = global.renderServer(context);
if (promise) {
  console.log("promise ok");
  promise.then(
    resolve => {
      console.log(resolve);
      console.log("renderServer test run success");
    },
    reject => {
      console.log("renderServer error");
      console.log(reject);
    }
  );
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
