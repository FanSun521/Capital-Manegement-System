import user from "./request/user";
import admin from "./request/admin";
import superAdmin from "./request/superAdmin";
import Vue from "vue";

//实现模块化统一管理接口
const http = {
  ...user,
  ...admin,
  ...superAdmin,
};

// 全局挂载axios请求
Vue.prototype.$http = http;
