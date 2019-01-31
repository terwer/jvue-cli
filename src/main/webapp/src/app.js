// 编译app.js
// yarn babel ./src/app.js  --presets=@babel/preset-env
// 编译并运行app.js
// yarn babel-node ./src/app.js  --presets=@babel/preset-env

import createApp from "./main";

const vm = createApp();
// vm.$mount("#app");
