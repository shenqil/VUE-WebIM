// import VirtualList from "./VirtualList.vue"
import WebIM from "./index.vue";

const plugin = {
  install(Vue, options) {
    Vue.component("WebIM", WebIM);
  },
};

export default plugin;
