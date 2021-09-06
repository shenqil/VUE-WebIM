/**
 * @desc 函数防抖
 * @param func (function) 函数
 * @param wait (number) 延迟执行毫秒数
 * @param immediate (boolean) true 表立即执行，false 表非立即执行
 */
export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    }
  };
}

/**
 * @desc 函数节流
 * @param func (function) 函数
 * @param wait (number) 延迟执行毫秒数
 */
export function throttle(func, wait) {
  var timeout;

  return function() {
    var context = this;
    var args = arguments;

    if (!timeout) {
      timeout = setTimeout(function() {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}
