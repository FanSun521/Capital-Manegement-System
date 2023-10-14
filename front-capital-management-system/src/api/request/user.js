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

export default {
  login,
  register,
};
