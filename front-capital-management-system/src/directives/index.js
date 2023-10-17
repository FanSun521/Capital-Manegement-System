import debounce from "./debounce";
import lazyLoad from "./lazyload";
//自定义指令
const directives = {
  debounce,
  lazyLoad,
};

// Vue.use() 本质就是调用对象的install方法或将函数当作install
export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  },
};
