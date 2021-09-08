import TIM from "tim-js-sdk";
import { SDKAPPID, genTestUserSig } from "./GenerateTestUserSig";

export const HOOK_TYPE = Object.freeze({
  reciveMsgHook: "reciveMsgHook",
  sdkReadyHook: "SdkReady",
});

class TIMSdk {
  constructor() {
    this.Hooks = new Map(); // 用户缓存所有接收到的消息钩子回调

    this.tim = TIM.create({
      SDKAppID: SDKAPPID,
    });
    this.tim.setLogLevel(1);
    this.init();
  }

  /**
   * SDK初始化
   * */

  init() {
    // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
    // event.name - TIM.EVENT.SDK_READY：
    this.tim.on(TIM.EVENT.SDK_READY, this.onSdkReady.bind(this));
    this.tim.on(TIM.EVENT.MESSAGE_RECEIVED, (event) => {
      console.log(event, "tim - MESSAGE_RECEIVED");
      if (event.name === TIM.EVENT.MESSAGE_RECEIVED) {
        this.onReciveMsg(event);
      }

      // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
      // event.name - TIM.EVENT.MESSAGE_RECEIVED
      // event.data - 存储 Message 对象的数组 - [Message]
    });
    this.tim.on(TIM.EVENT.MESSAGE_REVOKED, function(event) {
      // 收到消息被撤回的通知
      // event.name - TIM.EVENT.MESSAGE_REVOKED
      // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
    });
    this.tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, function(event) {
      // SDK 收到对端已读消息的通知，即已读回执。使用前需要将 SDK 版本升级至 v2.7.0 或以上。仅支持单聊会话。
      // event.name - TIM.EVENT.MESSAGE_READ_BY_PEER
      // event.data - event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isPeerRead 属性值为 true
    });
    this.tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function(event) {
      // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
      // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
      // event.data - 存储 Conversation 对象的数组 - [Conversation]
    });
    this.tim.on(TIM.EVENT.GROUP_LIST_UPDATED, function(event) {
      // 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
      // event.name - TIM.EVENT.GROUP_LIST_UPDATED
      // event.data - 存储 Group 对象的数组 - [Group]
    });
    this.tim.on(TIM.EVENT.PROFILE_UPDATED, function(event) {
      // 收到自己或好友的资料变更通知
      // event.name - TIM.EVENT.PROFILE_UPDATED
      // event.data - 存储 Profile 对象的数组 - [Profile]
    });
    this.tim.on(TIM.EVENT.BLACKLIST_UPDATED, function(event) {
      // 收到黑名单列表更新通知
      // event.name - TIM.EVENT.BLACKLIST_UPDATED
      // event.data - 存储 userID 的数组 - [userID]
    });
    this.tim.on(TIM.EVENT.ERROR, function(event) {
      // 收到 SDK 发生错误通知，可以获取错误码和错误信息
      // event.name - TIM.EVENT.ERROR
      // event.data.code - 错误码
      // event.data.message - 错误信息
    });
    this.tim.on(TIM.EVENT.SDK_NOT_READY, function(event) {
      // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
      // event.name - TIM.EVENT.SDK_NOT_READY
    });
    this.tim.on(TIM.EVENT.KICKED_OUT, function(event) {
      // 收到被踢下线通知
      // event.name - TIM.EVENT.KICKED_OUT
      // event.data.type - 被踢下线的原因，例如:
      //    - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
      //    - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
      //    - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢 （v2.4.0起支持）。
    });
    this.tim.on(TIM.EVENT.NET_STATE_CHANGE, function(event) {
      //  网络状态发生改变（v2.5.0 起支持）。
      // event.name - TIM.EVENT.NET_STATE_CHANGE
      // event.data.state 当前网络状态，枚举值及说明如下：
      //     \- TIM.TYPES.NET_STATE_CONNECTED - 已接入网络
      //     \- TIM.TYPES.NET_STATE_CONNECTING - 连接中。很可能遇到网络抖动，SDK 在重试。接入侧可根据此状态提示“当前网络不稳定”或“连接中”
      //    \- TIM.TYPES.NET_STATE_DISCONNECTED - 未接入网络。接入侧可根据此状态提示“当前网络不可用”。SDK 仍会继续重试，若用户网络恢复，SDK 会自动同步消息
    });
  }

  /**
   * 登录
   * */

  login(userID) {
    return new Promise((resolve, reject) => {
      let userSig = genTestUserSig(userID).userSig;
      this.tim
        .login({
          userID,
          userSig: userSig,
        })
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * SDK已准备好
   * */

  onSdkReady(e) {
    // 执行所有hook
    const readys = this.Hooks.get(HOOK_TYPE.sdkReadyHook);
    readys &&
      readys.forEach((fn) => {
        if (typeof fn === "function") {
          try {
            fn();
          } catch (error) {
            console.error(error);
          }
        }
      });
  }

  /**
   * 接受到消息
   * */

  onReciveMsg(data) {
    // 执行所有hook
    const recives = this.Hooks.get(HOOK_TYPE.reciveMsgHook);
    recives &&
      recives.forEach((fn) => {
        if (typeof fn === "function") {
          try {
            fn(data);
          } catch (error) {
            console.error(error);
          }
        }
      });
  }

  /**
   * 注册hook
   *
   * @type HOOK_TYPE
   * */

  registerHook(type, fn) {
    let curSet = this.Hooks.get(type);
    if (!curSet) {
      curSet = new Set();
    }
    curSet.add(fn);
    this.Hooks.set(type, curSet);
  }

  /**
   * 删除hook
   * */
  removeHook(type, fn) {
    if (this.Hooks.has(type)) {
      const curSet = this.Hooks.get(type);
      curSet.delete(fn);
    }
  }

  /**
   * 发送文本消息
   * */

  sendTextMsg(msg, to) {
    return new Promise((resolve, reject) => {
      // 1. 创建消息实例
      let message = this.tim.createTextMessage({
        to: to,
        conversationType: TIM.TYPES.CONV_C2C,
        payload: {
          text: msg,
        },
      });

      // 2. 发送消息
      let promise = this.tim.sendMessage(message);

      promise
        .then(function(imResponse) {
          if (imResponse.code === 0) {
            resolve(imResponse.data.message);
          } else {
            reject(new Error("发送失败，状态码错误"));
          }
        })
        .catch(function(imError) {
          // 发送失败
          console.warn("sendMessage error:", imError);
          reject(imError);
        });
    });
  }

  /**
   * 拉取会话列表
   * */

  getConversationList() {
    return new Promise((resolve, reject) => {
      this.tim
        .getConversationList()
        .then((res) => {
          console.log(res);
          resolve(res.data.conversationList);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * 获取消息列表
   * @conversationID 会话id
   * @nextReqMessageID 下一条消息id,非必传
   * @count 条数 非必传入
   * */

  getMsgList({ conversationID, nextReqMessageID, count = 15 }) {
    return new Promise((resolve, reject) => {
      this.tim
        .getMessageList({ conversationID, nextReqMessageID, count })
        .then((res) => {
          const { messageList, nextReqMessageID, isCompleted } = res.data;
          resolve({ messageList, nextReqMessageID, isCompleted });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new TIMSdk();
