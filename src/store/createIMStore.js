import imStore from "./im";

function create(Vue, { store }) {
  if (!store) {
    throw new Error("不存在 Vuex, IMStrore初始化失败");
  }

  store.registerModule("__imStore", imStore);
}

export default create;
