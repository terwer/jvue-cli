// =============================
// This is polyfill not in node
// =============================

// 模拟window
var window = {
  navigator: {
    userAgent: "Chrome"
  }
};
global.window = window;

// require("../../dist/js/chunk-vendors.js");
require("../../dist/js/app.js");
require("../../dist/js/about.js");

// const hello = () => {
//   return "Hello World";
// };
//
// console.log(hello());
