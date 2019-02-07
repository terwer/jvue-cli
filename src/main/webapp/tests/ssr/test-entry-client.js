// 编译app.js
// yarn babel ./tests/ssr/test-entry-client.js --presets=@babel/preset-env
// 编译并运行app.js
// yarn babel-node ./tests/ssr/test-entry-client.js --presets=@babel/preset-env

// =============================
// This is polyfill not in node
// =============================

// =============================
// Require compiled script
// =============================
require("../../ssrdist/client/js/app.js");

// =============================
// Test script start
// =============================
// const inBrowser = typeof window !== 'undefined'
// import { inBrowser } from "../../src/common/NashornUtil";
var inBrowser = require("../../src/common/NashornUtil").inBrowser;

if (inBrowser) {
  console.log("inBrowser");
  console.log("renderClient");
  global.renderClient();
} else {
  console.log("not in inBrowser");
}
console.log("entry-client run success");
