import createApp from "../main";

global.renderServer = () => {
    const vm = createApp();
    console.log("vm")
    console.log(vm)
    // vm.$mount("#app");
};
