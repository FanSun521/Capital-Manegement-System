import Vue from "vue";
import VueRouter from "vue-router";
//路由懒加载
// 首页框架
const Main = () => import("../components/main/Main.vue");
//登录页
const Login = () => import("../views/login/Login.vue");
//使用路由
Vue.use(VueRouter);
//创建路由匹配规则
const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/login",
    component: Login,
  },
];
const router = new VueRouter({ routes });
//导出路由
export default router;
