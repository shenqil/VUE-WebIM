import timSdk from "../server/timSdk/index";

const state = {
  conversationList: [], // 所有会话列表
  msgMap: [], // 所有消息
  currentConversation: {}, // 当前选中的会话
  msgStatusMap: [], // 保存消息下一个id与是否拉取完毕状态存储 nextReqMessageID, isCompleted,
  userID: "user0",
};

const mutations = {
  // 会话列表初始化
  conversationListInit(state, list) {
    state.conversationList = list;
  },
  // 改变当前会话
  changecurrentConversation(state, value) {
    state.currentConversation = value;
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

  changeMsgStatusMap(state, { id, status }) {
    state.msgStatusMap[id] = status;
    state.msgStatusMap.push();
  },
};

const actions = {
  /**
   * 点击某个会话
   * */

  activeConversation({ commit, dispatch }, conversation) {
    commit("changecurrentConversation", conversation);
  },
  /**
   * 发送文本消息
   * */

  async sendTextMsg({ commit, state }, { msg, to }) {
    const toId = to || state.currentConversation.userProfile?.userID;
    if (!toId) {
      throw new Error("不存在发送人id");
    }
    const msgResult = await timSdk.sendTextMsg(msg, toId);
    commit("pushMsg", { id: msgResult.conversationID, list: [msgResult] });
  },
  /**
   * 接受到文本消息
   * */

  reciveTextMsg({ commit }, msgList) {
    for (const msg of msgList) {
      console.log(msg);
      commit("pushMsg", { id: msg.conversationID, list: [msg] });
    }
  },
  /**
   * 获取会话列表
   * */

  async getConversationList({ commit }) {
    const list = await timSdk.getConversationList();
    commit("conversationListInit", list);
    console.log(list, "myim");
  },
  /**
   * 获取指定会话下的消息列表
   * */

  async getMsgList({ state, commit }) {
    const { conversationID } = state.currentConversation;
    const { nextReqMessageID, isCompleted } =
      state.msgStatusMap[conversationID] || {};
    if (isCompleted) {
      // 数据拉取完毕
      return;
    }
    const res = await timSdk.getMsgList({ nextReqMessageID, conversationID });

    // 保存状态
    commit("changeMsgStatusMap", {
      id: conversationID,
      status: {
        nextReqMessageID: res.nextReqMessageID,
        isCompleted: res.isCompleted,
      },
    });

    // 更新消息
    commit("unshiftMsg", {
      id: conversationID,
      list: res.messageList,
    });
  },
  /**
   * 会话已读
   * */
};

const getters = {
  conversationList(state) {
    return state.conversationList;
  },
  conversationID(state) {
    return state.currentConversation.conversationID || "";
  },
  conversationIsCompleted(state, getters) {
    const { isCompleted } =
      state.msgStatusMap[getters.currentConversationID] || {};
    console.log(isCompleted);
    return isCompleted;
  },
  msgList(state, getters) {
    console.log(state.msgMap[getters.conversationID]);
    return state.msgMap[getters.conversationID] || [];
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
