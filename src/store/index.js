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
        duration: "2.12"
      },
      {
        id: 3,
        name: "Stones",
        category: "Observation",
        duration: "4"
      },
      {
        id: 4,
        name: "Sandy",
        category: "Meditation",
        duration: "2.11"
      },
      {
        id: 5,
        name: "Float",
        category: "In Water",
        duration: "3"
      },
      {
        id: 6,
        name: "Power of Imagination",
        category: "Listening",
        duration: "1.33"
      }
    ],
    walkpaths: [
      { id: 90, name: "Slowly On", composition: [], duration: [] },
      { id: 91, name: "About to Meditate", composition: [], duration: [] }
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
});
