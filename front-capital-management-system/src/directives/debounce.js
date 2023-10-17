//防抖函数
function myDebounce(callback, wait, immediate = false) {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    //第一次执行
    if (immediate) {
      const callNow = !timer;
      if (callNow) callback.apply(this, arguments);
      timer = setTimeout(() => {
        timer = null;
      }, wait);
    } else {
      //最后一次执行
      timer = setTimeout(() => {
        callback.apply(this, arguments);
      }, wait);
    }
  };
}

//防抖指令
const debounce = {
  inserted(el, binding) {
    //第一次执行 间隔300ms
    el.addEventListener("click", myDebounce(binding.value, 300, true));
  },
};

export default debounce;
