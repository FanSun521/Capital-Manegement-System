const express = require("express");
const app = express();
//引入token
const tokenJs = require("./util/token");
// 引入express-jwt
const { expressjwt } = require("express-jwt");

// 用户api
const userRouter = require("./route/api/user");
//普通admin:api
const adminRouter = require("./route/api/admin");
// 超级admin:api
const superAdminRouter = require("./route/api/superAdmin");
// 配置解析post参数中间件    请求体数据类型为：Content-Type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
//Content-Type:application/json
app.use(express.json());
//配置跨域
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
// 解析token获取用户信息
app.use((req, res, next) => {
  const token = req.headers["authorization"];
  if (token === undefined) {
    return next();
  } else {
    tokenJs
      .verToken(token)
      .then((info) => {
        req.info = info;
        return next();
      })
      .catch((err) => {
        return next();
      });
  }
});
// 验证token是否过期并规定哪些路由不用验证
// app.use(
//   expressjwt({
//     secret: "mes_qdhd_mobile_xhykjyxgs",
//     algorithms: ["HS256"],
//   }).unless({
//     path: ["/api/login", "/api/register"],
//   })
// );
// 当token失效返回提示信息
// app.use((err, req, res, next) => {
//   if (err.status === 401) {
//     return res.send({
//       code: 401,
//       message: "token失效",
//     });
//   }
// });
app.get("/", (req, res) => {
  res.end("资金管理系统后台接口");
});
app.use("/api", userRouter);
app.use("/api", adminRouter);
app.use("/api", superAdminRouter);

const port = 9000;

app.listen(port, () => {
  console.log(`server runing at ${port}...`);
});
