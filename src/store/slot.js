const { slots } = require("../data");

const SET_LOG_IN_LOADING = "SET_LOG_IN_LOADING";

const state = {
  slots,
  error: false,
  errorMessage: "",
  success: false
};

const mutations = {};

const actions = {
  addToWalkpath({ commit }) {
    if (state.isLoggedIn) return;
    commit(SET_LOG_IN_LOADING, true);
  }
};

export default {
  state,
  mutations,
  actions
};
