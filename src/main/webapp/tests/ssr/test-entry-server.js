// 编译app.js
// yarn babel ./tests/ssr/test-entry-server.js --presets=@babel/preset-env
// 编译并运行app.js
// yarn babel-node ./tests/ssr/test-entry-server.js --presets=@babel/preset-env

const hello = () => {
  return "Hello World";
};

console.log(hello());
