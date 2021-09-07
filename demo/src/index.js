import Vue from "vue";
import App from "./index.vue";
import Vuex from "vuex";
import ViewUI from "view-design";
import WebIM from "../../src/index";
import "view-design/dist/styles/iview.css";
import "regenerator-runtime/runtime";

Vue.use(ViewUI);
Vue.use(Vuex);

const store = new Vuex.Store({});
Vue.config.productionTip = false;

Vue.use(WebIM, {
  store,
});

new Vue({
  store: store,
  render: (h) => h(App),
}).$mount("#app");
