import Vue from "vue";
import VueRouter from "vue-router-nashorn";

// 组件引用
import Index from "./views/Index.vue";
import About from "./views/About.vue";
import Detail from "./views/Detail";
import Category from "./views/Category";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Index
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "index" */ "./views/Index.vue")
  },
  { path: "/home", redirect: { name: "index" } },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/post/:id.html",
    name: "detail",
    component: Detail
  },
  {
    path: "/p/:id.html",
    name: "detail-short",
    component: Detail
  },
  {
    path: "/category/:id",
    name: "category",
    component: Category
  },
  {
    path: "/cat/:id",
    name: "category-medium",
    component: Category
  },
  {
    path: "/c/:id",
    name: "category-short",
    component: Category
  }
];

export function createRouter() {
  return new VueRouter({
    mode: "history", // process.ssr ? "history" : "hash",
    base: process.env.BASE_URL,
    routes: routes
  });
}
