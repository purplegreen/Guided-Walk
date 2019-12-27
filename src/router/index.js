import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import CreateWalkpath from "../views/create-walkpath.vue";
import SelectWalkpath from "../views/select-walkpath.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/create",
    name: "create-walkpath",
    component: CreateWalkpath
  },
  {
    path: "/select",
    name: "select-walkpath",
    component: SelectWalkpath
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
