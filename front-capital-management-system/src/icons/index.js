//配置自动加载svg中所有图标的index.js，并全局注册组件Vue.component('SvgIcon',SvgIcon)
import Vue from "vue";
import SvgIcon from "@/components/SvgIcon.vue";

//自动加载svg中的所有图标
//context()返回一个指定目录的加载方法，是否要递归，匹配的后缀名
const req = require.context("./svg", false, /\.svg$/);
//keys()返回指定上下文中所有匹配文件名称
req.keys().forEach((svg) => {
  req(svg); //遍历所有文件名并require自动加载
});

//全局注册SvgIcon组件
Vue.component("SvgIcon", SvgIcon);
