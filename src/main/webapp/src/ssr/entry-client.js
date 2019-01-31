import createApp from "../main";

global.renderClient = () => {
    const vm = createApp();
    vm.$mount("#app");
};

// import Vue from "vue";
//
// global.renderClient = () => {
//     const vm = new Vue({
//         template: `<div>Hello World</div>`
//     });
//     vm.$mount("#app");
// };