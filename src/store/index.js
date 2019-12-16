import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    slots: [
      {
        id: 1,
        name: "Biotope",
        category: "Listening",
        duration: "3"
      },
      {
        id: 2,
        name: "Breathe",
        category: "Meditation",
        duration: "2"
      },
      {
        id: 3,
        name: "Stones",
        category: "Observation",
        duration: "4"
      }
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
});
