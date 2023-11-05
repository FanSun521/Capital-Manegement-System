import myAxios from "../index";

//删除员工
const deleteUser = (data) => {
  return myAxios({
    method: "post",
    url: "/superAdmin/deleteUser",
    data: data,
  });
};

export default { deleteUser };
