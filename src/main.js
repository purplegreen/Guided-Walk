import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

import VModal from "vue-js-modal";

import App from "./app.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.use(VModal);
Vue.use(VueGoogleMaps, {
  load: {
    // this key needs to be generated manually
    // https://developers.google.com/maps/documentation/javascript/get-api-key
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY
  },
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
