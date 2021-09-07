import TIM from "tim-js-sdk";
import { SDKAPPID, genTestUserSig } from "./GenerateTestUserSig";

class TIMSdk {
  constructor() {
    this.tim = TIM.create({
      SDKAppID: SDKAPPID,
    });
    this.tim.setLogLevel(0);
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
          // 发送成功
          console.log(imResponse);
          resolve(imResponse);
        })
        .catch(function(imError) {
          // 发送失败
          console.warn("sendMessage error:", imError);
          reject(imError);
        });
    });
  }
}

export default new TIMSdk();
