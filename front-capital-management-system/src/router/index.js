import Vue from "vue";
import VueRouter from "vue-router";
import Cookies from "js-cookie";
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
    name: "main",
  },
  {
    path: "/login",
    component: Login,
    name: "login",
  },
];
const router = new VueRouter({ routes });

// 全局前置守卫
router.beforeEach((to, from, next) => {
  //身份验证
  if (to.name !== "login" && !Cookies.get("token")) next({ name: "login" });
  next();
});
//导出路由
export default router;
