import Vue from "vue";
import Router from "vue-router-nashorn";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: process.env.RENDER_MODE === "ssr_server" ? "history" : "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
