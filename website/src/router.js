import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "account",
    meta: {
      title: "Home page",
    },
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "login",
    },
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
