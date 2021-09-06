import { throttle } from "../util/commo";

export default function directiveInit(Vue) {
  Vue.directive("imDrag", function(el, binding) {
    const className = binding.value;

    el.style.position = "fixed";
    el.style.cursor = "move";

    Vue.nextTick(() => {
      const w =
        document.documentElement.clientWidth || document.body.clientWidth;
      const h =
        document.documentElement.clientHeight || document.body.clientHeight;

      el.style.left = w - el.offsetWidth - 24 + "px";
      el.style.top = h - el.offsetHeight - 8 + "px";
    });

    const throttleMove = throttle(function(ev, w, h, sX, sY) {
      var eX = ev.clientX - sX;
      var eY = ev.clientY - sY;

      if (eX < 0) {
        eX = 0;
      }
      if (eX > w - el.offsetWidth) {
        eX = w - el.offsetWidth;
      }

      if (eY < 0) {
        eY = 0;
      }
      if (eY > h - el.offsetHeight) {
        eY = h - el.offsetHeight;
      }

      el.style.left = eX + "px";
      el.style.top = eY + "px";
    }, 20);

    el.onmousedown = function(ev) {
      // 非指定的class名称，不触发
      if (className && className !== ev.target.className) {
        return;
      }
      const w =
        document.documentElement.clientWidth || document.body.clientWidth;
      const h =
        document.documentElement.clientHeight || document.body.clientHeight;

      var sX = ev.clientX - el.offsetLeft;
      var sY = ev.clientY - el.offsetTop;
      document.onmousemove = function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        throttleMove(ev, w, h, sX, sY);
      };
      document.onmouseup = function() {
        // 清除mousemove事件
        document.onmousemove = document.onmouseup = null;
      };
    };
  });
}
