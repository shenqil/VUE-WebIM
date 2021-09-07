import timSdk from "../server/timSdk/index";

const state = {};

const mutations = {};

const actions = {
  async sendTextMsg({ commit }, { msg, to }) {
    await timSdk.sendTextMsg(msg, to);
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
