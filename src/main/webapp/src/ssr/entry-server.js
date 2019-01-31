// 编译entry-server.js
// yarn babel ./src/ssr/entry-server.js  --presets=@babel/preset-env
// 编译并运行entry-server.js
// yarn babel-node ./src/ssr/entry-server.js  --presets=@babel/preset-env

// var hello = () => {
//   return "Hello World";
// };
//
// console.log(hello());

import createApp from "../main";

const vm = createApp();
vm.$mount("#app");
