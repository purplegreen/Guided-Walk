import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import Enter from "../views/enter.vue";
import CreateWalkpath from "../views/create-walkpath.vue";
import SelectWalkpath from "../views/select-walkpath.vue";
import Walkpath from "../views/walkpath.vue";
import Credits from "../views/credits.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/enter",
    name: "enter",
    component: Enter
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
  },
  {
    path: "/walkpath",
    name: "walkpath",
    component: Walkpath
  },
  {
    path: "/credits",
    name: "credits",
    component: Credits
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
