import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

import VModal from "vue-js-modal";

import App from "./app.vue";
import router from "./router";
import store from "./store";

Vue.use(VModal);
Vue.use(VueGoogleMaps, {
  load: { key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY },
  installComponents: true
});

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
