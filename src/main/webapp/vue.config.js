module.exports = {
  // 插件配置
  pluginOptions: {
    ssrOptions: {
      info: "plugin for ssr"
    }
  },
  configureWebpack: config => {
    // 全局webpack
    config.entry = {
      app: ["./src/app.js"]
    };

    config.output.libraryExport = "default";

    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置
      // console.log("production");
    } else {
      // 为开发环境修改配置
      // console.log("development");
    }
  }
};
