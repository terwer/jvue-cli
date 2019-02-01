import Vue from "vue";
import VueRouter from "vue-router-nashorn";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import(/* webpackChunkName: "home" */ "./views/Index.vue")
  },
  { path: "/home", redirect: { name: "index" } },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
  }
];

export function createRouter() {
  return new VueRouter({
    mode: "history", // process.ssr ? "history" : "hash",
    base: process.env.BASE_URL,
    routes: routes
  });
}
