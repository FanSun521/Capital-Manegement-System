const lazyLoad = {
  bind(el, binding) {
    lazyLoad.init(el, binding.value);
  },
  inserted(el) {
    if (IntersectionObserver) {
      lazyLoad.observe(el);
    } else {
      lazyLoad.listenerScroll(el);
    }
  },
  //初始化 设置data-src 存放图片地址真实值 src图片加载时将data-src赋值给src
  init(el, val) {
    el.setAttribute("data-src", val);
    el.setAttribute("src", "");
  },
  //利用浏览器IntersectionObserver监听el
  observe(el) {
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        el.src = el.dataset.src;
        // el.removeAttribute("data-src");
      }
    });
    io.observe(el);
  },
  //监听scroll事件
  listenerScroll(el) {
    const handler = lazyLoad.myThrottle(lazyLoad.load, 200);
    lazyLoad.load(el);
    window.addEventListener("scroll", handler.bind(null, el));
  },
  //加载图片事件
  load(el) {
    //获取浏览器可视区高度
    const windowHeight = window.innerHeight;
    //获取元素顶部和底部距离浏览器顶部的高度
    const { top: elTop, bottom: elBtm } = el.getBoundingClientRect();
    if (elTop - windowHeight < 0 && elBtm > 0) {
      el.src = el.dataset.src;
      el.removeAttribute("data-src");
    }
  },
  //节流函数
  myThrottle(callback, wait) {
    let begin = 0;
    return function () {
      const cur = Date.now();
      if (cur - begin > wait) {
        callback.apply(this, arguments);
        begin = cur;
      }
    };
  },
};

export default lazyLoad;
