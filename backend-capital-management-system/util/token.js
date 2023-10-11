const jwt = require("jsonwebtoken");
// 加密口令
const signkey = "mes_qdhd_mobile_xhykjyxgs";

// 生成token
exports.setToken = function (id) {
  return new Promise((res, rej) => {
    const token = jwt.sign(
      {
        _id: id,
      }, // 过期时间
      signkey,
      { expiresIn: "1h" }
    );
    res(token);
  });
};

// 解析token
exports.verToken = function (token) {
  return new Promise((res, rej) => {
    const info = jwt.verify(token.split(" ")[1], signkey);
    res(info);
  });
};
