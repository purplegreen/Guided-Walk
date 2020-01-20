const { walkpaths } = require("../data");

const ADD_TO_WALKPATH = "ADD_TO_WALKPATH";
const REMOVE_FROM_WALKPATH = "REMOVE_FROM_WALKPATH";
const SET_WALKPATH_IN_PROGRESS = "SET_WALKPATH_IN_PROGRESS";

const emptyWalkpath = {
  composition: [],
  duration: 0
};

const state = {
  walkpaths,
  customWalkpath: emptyWalkpath,
  walkpathInProgress: emptyWalkpath,
  error: false,
  errorMessage: "",
  success: false
};

const mutations = {
  [ADD_TO_WALKPATH](state, slot) {
    const index = state.customWalkpath.composition.findIndex(
      e => e.id == slot.id
    );
    if (index != -1) return;
    state.customWalkpath.composition.push(slot);
    state.customWalkpath.duration += slot.duration;
  },
  [REMOVE_FROM_WALKPATH](state, slot) {
    const index = state.customWalkpath.composition.findIndex(
      e => e.id == slot.id
    );
    if (index == -1) return;

    state.customWalkpath.composition.splice(index, 1);
    state.customWalkpath.duration -= slot.duration;
  },
  [SET_WALKPATH_IN_PROGRESS](state, walkpath) {
    state.walkpathInProgress = walkpath;
    if (!state.walkpathInProgress.duration) {
      state.walkpathInProgress.duration = walkpath.composition.reduce(
        (total, slot) => {
          return total + slot.duration;
        },
        0
      );
    }
  }
};

const actions = {
  addToWalkpath({ commit }, slot) {
    commit(ADD_TO_WALKPATH, slot);
  },
  removeFromWalkpath({ commit }, slot) {
    commit(REMOVE_FROM_WALKPATH, slot);
  },
  setWalkpathInProgress({ commit }, walkpath) {
    commit(SET_WALKPATH_IN_PROGRESS, walkpath);
  },
  stopWalkpath({ commit }) {
    commit(SET_WALKPATH_IN_PROGRESS, emptyWalkpath);
  }
};

export default {
  state,
  mutations,
  actions
};
