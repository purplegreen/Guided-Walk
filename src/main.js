import Vue from "vue";
import VModal from "vue-js-modal";

import App from "./app.vue";
import router from "./router";
import store from "./store";

Vue.use(VModal);

Vue.config.productionTip = false;

Vue.filter("secondsToMinutes", function(value) {
  if (!value) return 0;
  return (value / 60).toFixed();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
