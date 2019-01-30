module.exports = (api, projectOptions) => {
  api.registerCommand(
    "ssrs",
    {
      description: "ssr server plugin for vue cli 3",
      usage: "vue-cli-service ssrs",
      options: {}
    },
    args => {
      console.log("args", args);
      let ssrOptions = projectOptions.pluginOptions.ssrOptions;
      console.log("ssrOptions", ssrOptions);
      console.log("ssr server plugin is running");
    }
  );
};
