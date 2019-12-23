const { walkpaths } = require("../data");

const ADD_TO_WALKPATH = "ADD_TO_WALKPATH";
const REMOVE_FROM_WALKPATH = "REMOVE_FROM_WALKPATH";

const state = {
  walkpaths,
  customWalkpath: {
    composition: [],
    duration: 0
  },
  walktpathInProgress: {},
  error: false,
  errorMessage: "",
  success: false
};

const mutations = {
  [ADD_TO_WALKPATH](state, slot) {
    const index = state.customWalkpath.composition.findIndex(e => e.id == slot.id);
    if (index != -1) return;
    state.customWalkpath.composition.push(slot);
    state.customWalkpath.duration += slot.duration;
  },
  [REMOVE_FROM_WALKPATH](state, slot) {

    const index = state.customWalkpath.composition.findIndex(e => e.id == slot.id);
    if (index == -1) return;

    state.customWalkpath.composition.splice(index, 1);
    state.customWalkpath.duration -= slot.duration;
  }
};

const actions = {
  addToWalkpath({ commit }, slot) {
    commit(ADD_TO_WALKPATH, slot);
  },
  removeFromWalkpath({ commit }, slot) {
    commit(REMOVE_FROM_WALKPATH, slot);
  }
};

export default {
  state,
  mutations,
  actions
};
