import createApp from "../main";

global.renderClient = () => {
  const vm = createApp();
  vm.$mount("#app");
};
