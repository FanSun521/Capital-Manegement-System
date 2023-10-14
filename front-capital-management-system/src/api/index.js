import axios from "axios";
import Cookies from "js-cookie";
//消息框
import { Message } from "element-ui";
//进度条
import NProgress from "nprogress";
//进度条样式
import "nprogress/nprogress.css";

//创建axios实例
const myAxios = axios.create({
  timeout: 10000,
});

// 根据环境不同 改变接口地址
if (process.env.NODE_ENV == "development") {
  myAxios.defaults.baseURL = "http://localhost:9000/api";
} else if (process.env.NODE_ENV == "debug") {
  myAxios.defaults.baseURL = "";
} else if (process.env.NODE_ENV == "production") {
  myAxios.defaults.baseURL = "";
}

// 添加请求拦截器
myAxios.interceptors.request.use(
  function (config) {
    //启动进度条
    NProgress.start();
    // 获取本地token
    const token = Cookies.get("token");
    //token存在则发送token
    token && (config.headers.Authorization = token);
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
myAxios.interceptors.response.use(
  function (response) {
    NProgress.done();
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.code !== 200) {
      // 请求成功 但逻辑错误 提示消息
      Message({
        message: response.data.message,
        type: "warning",
      });
    }
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    Message({
      message: error,
      type: "error",
    });
    return Promise.reject(error);
  }
);

export default myAxios;
