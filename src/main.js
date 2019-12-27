import Vue from "vue";
import VModal from "vue-js-modal";
import BootstrapVue from "bootstrap-vue";

import App from "./app.vue";
import router from "./router";
import store from "./store";

Vue.use(VModal);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
