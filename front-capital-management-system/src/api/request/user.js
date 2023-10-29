import myAxios from "../index";

//登录
const login = (data) => {
  return myAxios({
    method: "post",
    url: "/login",
    data: data,
  });
};

//注册
const register = (data) => {
  return myAxios({
    method: "post",
    url: "/register",
    data: data,
  });
};

//获取个人信息
const getInfo = (data) => {
  return myAxios({
    method: "post",
    url: "/user/getInfo",
    data: data,
  });
};

//修改个人信息
const updateInfo = (data) => {
  return myAxios({
    method: "post",
    url: "/user/updateInfo",
    data: data,
  });
};

//修改个人密码
const updatePassword = (data) => {
  return myAxios({
    method: "post",
    url: "/user/updatePassword",
    data: data,
  });
};

//分页查询员工信息
const getEmployee = (data) => {
  return myAxios({
    method: "post",
    url: "/user/getEmployee",
    data: data,
  });
};

export default {
  login,
  register,
  getInfo,
  updateInfo,
  updatePassword,
  getEmployee,
};
