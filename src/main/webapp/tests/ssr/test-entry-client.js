// 编译app.js
// yarn babel ./tests/ssr/test-entry-client.js --presets=@babel/preset-env
// 编译并运行app.js
// yarn babel-node ./tests/ssr/test-entry-client.js --presets=@babel/preset-env

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

require("../../ssrcdist/js/app.js");
require("../../ssrcdist/js/about.js");

// const inBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'
// import { inBrowser } from "../../src/lib/vue-router-nashorn-3.0.2/src/util/dom"
var dom = require("../../vender/lib/vue-router-nashorn/src/util/dom");
const inBrowser = dom.inBrowser;

if (inBrowser) {
  console.log("inBrowser");
  global.renderClient();
} else {
  console.log("not in inBrowser");
}
console.log("entry-client run success");
