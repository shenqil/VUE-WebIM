import timSdk, { HOOK_TYPE } from "../server/timSdk/index";

let store;

function reciveMsgEvent(msg) {
  if (msg.name === "onMessageReceived") {
    store.dispatch("__imStore/reciveTextMsg", msg.data);
  }
}

function sdkReadyEvent() {
  store.dispatch("__imStore/getConversationList");
}

export default function eventInit(s) {
  if (!store) {
    store = s;
    timSdk.registerHook(HOOK_TYPE.reciveMsgHook, reciveMsgEvent);
    timSdk.registerHook(HOOK_TYPE.sdkReadyHook, sdkReadyEvent);
  }
}
