const { walkpaths } = require("../data");

const ADD_TO_WALKPATH = "ADD_TO_WALKPATH";
const REMOVE_FROM_WALKPATH = "REMOVE_FROM_WALKPATH";
const SET_WALKPATH_IN_PROGRESS = "SET_WALKPATH_IN_PROGRESS";
const CALCULATE_SLOT_PROGRESS = "CALCULATE_SLOT_PROGRESS";
const SET_SLOT_ACTIVE = "SET_SLOT_ACTIVE";

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
  },
  [CALCULATE_SLOT_PROGRESS](state, index) {
    // reset progresses on slots
    // if the user wants to skip to 3rd slot i.e. index parameter is 2,
    // we assume that the first two are already played. If the index is 0,
    // it simply means that the user is starting from the beginning.
    state.walkpathInProgress.composition.forEach((element, i) => {
      element.alreadyPlayedInSeconds = index > i ? element.duration : 0;
    });
  },
  [SET_SLOT_ACTIVE](state, index) {
    state.walkpathInProgress.composition.forEach((element, i) => {
      element.isActive = index == i ? true : false;
    });
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
  calculateSlotProgress({ commit }, index = 0) {
    commit(CALCULATE_SLOT_PROGRESS, index);
  },
  setSlotActive({ commit }, index) {
    commit(SET_SLOT_ACTIVE, index);
  }
};

export default {
  state,
  mutations,
  actions
};
