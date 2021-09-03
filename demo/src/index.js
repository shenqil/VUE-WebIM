import Vue from "vue";
import App from "./index.vue";
import WebIM from "../../src/index";

Vue.config.productionTip = false;

Vue.use(WebIM);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
