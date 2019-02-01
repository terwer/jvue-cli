import Vue from "vue";
import VueRouter from "vue-router-nashorn";

// 组件引用
import Home from "./views/Index.vue";
import About from "./views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Home
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue")
  },
  { path: "/home", redirect: { name: "index" } },
  {
    path: "/about",
    name: "about",
    component: About
  }
];

export function createRouter() {
  return new VueRouter({
    mode: "history", // process.ssr ? "history" : "hash",
    base: process.env.BASE_URL,
    routes: routes
  });
}
