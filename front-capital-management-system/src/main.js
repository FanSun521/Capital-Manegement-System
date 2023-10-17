import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./api/request";
import "@/icons";
import Directives from "@/directives";
//取消默认提示
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Directives);
new Vue({
  beforeCreate() {
    //绑定全局事件总线
    Vue.prototype.$bus = new Vue();
  },
  router,
  render: (h) => h(App),
}).$mount("#app");
