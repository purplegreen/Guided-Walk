import Vue from "vue";
import Vuex from "vuex";

import slot from "./slot";
import walkpath from "./walkpath";

Vue.use(Vuex);

const store = {
  modules: {
    slot,
    walkpath
  }
};

export default new Vuex.Store(store);
