import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

export default function createApp() {
  return new Vue({
    router,
    render: h => h(App)
  });
}
