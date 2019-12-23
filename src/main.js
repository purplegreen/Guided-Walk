import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import VModal from "vue-js-modal";
import { ProgressPlugin } from "bootstrap-vue";

Vue.use(VModal);
Vue.use(ProgressPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
