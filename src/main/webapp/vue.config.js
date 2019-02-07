module.exports = {
  // 插件配置
  pluginOptions: {},
  filenameHashing: process.env.NODE_ENV !== "production", // 关闭文件hash
  // baseUrl: "/",
  publicPath: "/",
  // assetsDir: "",
  // css: {
  //   loaderOptions: {
  //     css: {
  //       url: false,
  //     }
  //   }
  // },
  configureWebpack: config => {
    // 全局webpack
    config.entry = {
      app: ["./src/app.js"]
    };

    // config.output.libraryExport = "default"; // lib默认导出

    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置
      console.log("change webpack config for production");
      // No need for splitting
      config.optimization.splitChunks = false;
    } else {
      // 为开发环境修改配置
      // console.log("development");
    }
  }
};
