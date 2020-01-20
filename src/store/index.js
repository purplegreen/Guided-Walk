import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import slot from "./slot";
import walkpath from "./walkpath";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    slot,
    walkpath
  },
  plugins: [
    createPersistedState({
      key: "guided-walk"
    })
  ]
});

export default store;
