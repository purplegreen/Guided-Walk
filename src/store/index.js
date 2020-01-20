import Vue from "vue";
import Vuex from "vuex";

import slot from "./slot";
import walkpath from "./walkpath";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    slot,
    walkpath
  }
});

export default store;
