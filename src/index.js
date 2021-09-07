import view from "./views/index.vue";
import createIMStore from "./store/createIMStore";
import createDirective from "./directive/index";
import timSdk from "./server/timSdk/index";

let Vue, options;

function createView(Component, props) {
  const vm = new Vue({
    render: (h) => h(Component, { props }),
  }).$mount();

  document.body.appendChild(vm.$el);

  const comp = vm.$children[0];

  comp.remove = function() {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  };

  return comp;
}

export default {
  install(vue, o) {
    if (!Vue) {
      // 缓存Vue和选项
      Vue = vue;
      options = o;

      // 挂载自定义指令
      createDirective(Vue);
      // 创建IM Store
      createIMStore(Vue, o);
      // 创建IM组件
      createView(view);

      timSdk.login("user0");
    }
  },
};
