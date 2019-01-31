import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";

Vue.config.productionTip = false;

export function createApp() {
  // 创建 router 实例
  const router = createRouter();
  const vm = new Vue({
    router,
    render: h => h(App)
  });

  // 返回 vm 和 router
  return { vm, router };
}
