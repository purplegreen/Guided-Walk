const { walkpaths } = require("../data");

const ADD_TO_WALKPATH = "ADD_TO_WALKPATH";

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

const mutations = {};

const actions = {
  addToWalkpath({ commit }, slot) {
    commit(ADD_TO_WALKPATH, slot);
  }
};

export default {
  state,
  mutations,
  actions
};
