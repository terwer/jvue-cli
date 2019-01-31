// 编译app.js
// babel ./src/ssr/entry-client-test.js --presets=@babel/preset-env
// 编译并运行app.js
// yarn babel-node ./src/ssr/entry-client-test.js --presets=@babel/preset-env

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
var dom = require("../../src/lib/vue-router-nashorn-3.0.2/src/util/dom");
const inBrowser = dom.inBrowser;

if (inBrowser) {
  console.log("inBrowser");
  global.renderClient();
} else {
  console.log("not in inBrowser");
}
console.log("entry-client run success");
