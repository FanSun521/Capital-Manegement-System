import Vue from "vue";
import VueRouter from "vue-router";
import Cookies from "js-cookie";
//路由懒加载
// 首页框架
const Main = () => import("../components/main/Main.vue");
//登录页
const Login = () => import("../views/login/Login.vue");
//首页
const Home = () => import("../views/home/Home.vue");
//用户管理
const User = () => import("../views/user/User.vue");
//账单流水
const Bill = () => import("../views/capital/Bill.vue");
//资金管理
const Capital = () => import("../views/capital/Capital.vue");
//个人信息
const UserInfo = () => import("../views/my/UserInfo.vue");
//申请资金
const Apply = () => import("../views/my/Apply.vue");

// 解决跳转相同路由
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  originalPush.call(this, location).catch((err) => err);
};
//使用路由
Vue.use(VueRouter);
//创建路由匹配规则
const routes = [
  {
    path: "/",
    component: Main,
    name: "main",
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: Home,
      },
      {
        path: "/user",
        name: "user",
        component: User,
      },
      {
        path: "/bill",
        name: "bill",
        component: Bill,
      },
      {
        path: "/capital",
        name: "capital",
        component: Capital,
      },
      {
        path: "/userInfo",
        name: "userInfo",
        component: UserInfo,
      },
      {
        path: "/apply",
        name: "apply",
        component: Apply,
      },
    ],
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
