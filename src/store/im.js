import timSdk from "../server/timSdk/index";

const state = {
  conversationList: [], // 所有会话列表
  msgMap: [], // 所有消息
  currentConversationID: "", // 当前选中的会话
};

const mutations = {
  // 会话列表初始化
  conversationListInit(state, list) {
    state.conversationList = list;
  },
  // 改变当前会话
  changecurrentConversationID(state, id) {
    state.currentConversationID = id;
  },
  // 增加消息到列表前
  unshiftMsg(state, { id, list }) {
    let ary = state.msgMap[id];
    if (!ary) {
      ary = [];
    }

    ary.unshift(...list);
    state.msgMap[id] = ary;
    state.msgMap.push();
  },
  // 增加消息到列表后
  pushMsg(state, { id, list }) {
    let ary = state.msgMap[id];
    if (!ary) {
      ary = [];
    }

    ary.push(...list);
    state.msgMap[id] = ary;
    state.msgMap.push();
  },
};

const actions = {
  async sendTextMsg({ commit }, { msg, to }) {
    const msgResult = await timSdk.sendTextMsg(msg, to);
    commit("pushMsg", { id: msgResult.conversationID, list: [msgResult] });
  },
  reciveTextMsg({ commit }, msgList) {
    for (const msg of msgList) {
      commit("pushMsg", { id: msg.conversationID, list: [msg] });
    }
  },
  async getConversationList({ commit }) {
    const list = await timSdk.getConversationList();
    commit("conversationListInit", list);
    console.log(list, "myim");
  },
};

const getters = {
  msgList() {},
  conversationList(state) {
    return state.conversationList;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
