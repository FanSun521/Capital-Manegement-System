const express = require("express");
const router = express.Router();
const database = require("../../database/database");
const tokenJs = require("../../util/token");

/**
 * @api         注册
 * @method      {post}
 * @url         /api/register
 * @apiParam    {string}  id  学号/学工号等
 * @apiParam    {string}  password  登录密码
 * @apiParam    {string}  userName  姓名
 * @apiParam    {string}  department  部门
 */
router.post("/register", (req, res) => {
  const { id, password, userName, department } = req.body;
  console.log(req.body);
  // 查询数据库 id是否存在
  database.query(`select * from user where id = ${id}`, (err, queryRes) => {
    // id不存在 插入数据
    if (queryRes.length === 0) {
      database.query(
        `insert into user (id,password,name,department) values ('${id}','${password}','${userName}','${department}');`,
        (err, insertRes) => {
          //插入成功
          if (insertRes.affectedRows === 1) {
            res.send({
              code: 200,
              message: "注册成功",
            });
          }
        }
      );
    } else {
      // id存在
      res.send({
        code: 201,
        message: "注册失败，学号已被使用！",
      });
    }
  });
});

/**
 * @api         登录
 * @method      {post}
 * @url         /api/login
 * @apiParam    {string}  id  学号/学工号等
 * @apiParam    {string}  password  登录密码
 */

router.post("/login", (req, res) => {
  const { id, password } = req.body;
  console.log(req.body);
  // 查询数据库 id是否存在
  database.query(
    `select password from user where id = ${id}`,
    (err, queryRes) => {
      //id存在
      if (queryRes.length !== 0) {
        //密码相同
        if (queryRes[0].password === password) {
          //生成token
          tokenJs.setToken(id).then((token) => {
            res.send({
              code: 200,
              message: "登录成功",
              data: {
                token,
                id,
              },
            });
          });
        } else {
          res.send({
            code: 201,
            message: "密码错误!",
          });
        }
      } else {
        //id不存在
        res.send({
          code: 201,
          message: "学号不存在,请先注册!",
        });
      }
    }
  );
});

/**
 * @api         获取个人信息
 * @method      {post}
 * @url         /api/user/getInfo
 * @apiParam    {string}  id  学号/学工号等
 */
router.post("/user/getInfo", (req, res) => {
  const { id } = req.body;
  database.query(`select * from user where id = ${id}`, (err, queryRes) => {
    console.log(queryRes);
    //id存在
    if (queryRes.length !== 0) {
      res.send({
        code: 200,
        message: "获取个人信息成功",
        data: {
          info: queryRes[0],
        },
      });
    } else {
      res.send({
        code: 201,
        message: "获取个人信息失败",
      });
    }
  });
});

/**
 * @api         修改个人信息
 * @method      {post}
 * @url         /api/user/updateInfo
 * @apiParam    {string}  id  学号/学工号等
 * @apiParam    {obj}  restinfo  修改的信息
 */
router.post("/user/updateInfo", (req, res) => {
  const { id, ...restInfo } = req.body;
  console.log(id);
  console.log(restInfo);
  const keys = Object.keys(restInfo);
  const values = Object.values(restInfo);
  let str = "";
  // 拼接字段
  keys.forEach((key, index) => {
    if (typeof values[index] !== "string") {
      str += `${key} = ${values[index]},`;
    } else {
      str += `${key} = '${values[index]}',`;
    }
  });
  str = str.substring(0, str.length - 1);
  const updateSql = `update user set ` + str + ` where id = ${id}`;
  console.log(updateSql);
  database.query(updateSql, (err, updateRes) => {
    console.log(updateRes);
    if (updateRes.affectedRows === 1) {
      res.send({
        code: 200,
        message: "信息更新成功!",
      });
    } else {
      res.send({
        code: 201,
        message: "更新失败",
      });
    }
  });
});

/**
 * @api         分页查询员工数据
 * @method      {post}
 * @url         /api/user/getEmployee
 * @apiParam    {number}  pageCurrent  当前页
 * @apiParam    {number}  pageSize  页大小
 * @apiParam    {department}    部门
 * @apiParam    {isPass}    是否通过
 * @apiParam    {number}  state  账号状态
 *
 */
router.post("/user/getEmployee", (req, res) => {
  console.log(req.body);
  const {
    pageCurrent = 1,
    pageSize = 10,
    department,
    isPass = 1,
    state,
  } = req.body;
  const start = (pageCurrent - 1) * pageSize;
  let querySql;
  let countSql;
  if (department && !state) {
    querySql = `select * from user where  department = '${department}' and isPass = ${isPass} limit ${start} , ${pageSize};`;
    countSql = `select count(*) as count from user where department = '${department}' and isPass = ${isPass};`;
  } else if (state && !department) {
    querySql = `select * from user where  state = '${state}' and isPass = ${isPass} limit ${start} , ${pageSize};`;
    countSql = `select count(*) as count from user where state = '${state}' and isPass = ${isPass};`;
  } else if (state && department) {
    querySql = `select * from user where  state = '${state}' and  department = '${department}' and isPass = ${isPass} limit ${start} , ${pageSize};`;
    countSql = `select count(*) as count from user where state = '${state}' and  department = '${department}' and isPass = ${isPass};`;
  } else {
    querySql = `select * from user where isPass = ${isPass} limit ${start} , ${pageSize};`;
    countSql = `select count(*) as count from user where isPass = ${isPass};`;
  }
  database.query(querySql + countSql, (err, queryRes) => {
    res.send({
      code: 200,
      message: "查询成功!",
      userList: queryRes[0],
      count: queryRes[1][0].count,
    });
  });
});

/**
 * @api         姓名查询员工数据
 * @method      {post}
 * @url         /api/user/byName
 * @apiParam    {string}  userName  登录密码
 */
router.post("/user/byName", (req, res) => {
  const { userName } = req.body;
  console.log(req.body);
  const querySql = `select * from user where name  = '${userName}' and ispass = 1;select count(*) as count from user where name  = '${userName}' and ispass = 1`;
  database.query(querySql, (err, queryRes) => {
    res.send({
      code: 200,
      message: "查询成功!",
      data: {
        user: queryRes[0],
        count: queryRes[1][0].count,
      },
    });
  });
});

/**
 * @api         id查询员工数据
 * @method      {post}
 * @url         /api/user/byId
 * @apiParam    {string}  id  学号/学工号等
 */
router.post("/user/byId", (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  const querySql = `select * from user where id = ${id} and ispass = 1;select count(*) as count from user where id = ${id} and ispass = 1`;
  database.query(querySql, (err, queryRes) => {
    res.send({
      code: 200,
      data: {
        user: queryRes[0],
        count: queryRes[1][0].count,
      },
    });
  });
});

/**
 * @api         手机号查询员工数据
 * @method      {post}
 * @url         /api/user/byTelephone
 * @apiParam    {string}  telephone  手机号
 */
router.post("/user/byTelephone", (req, res) => {
  const { telephone } = req.body;
  console.log(req.body);
  const querySql = `select * from user where telephone = ${telephone} and ispass = 1;select count(*) as count from user where telephone = ${telephone} and ispass = 1`;
  database.query(querySql, (err, queryRes) => {
    res.send({
      code: 200,
      data: {
        user: queryRes[0],
        count: queryRes[1][0].count,
      },
    });
  });
});

/**
 * @api         QQ号查询员工数据
 * @method      {post}
 * @url         /api/user/byQQ
 * @apiParam    {string}  qq  qq号
 */
router.post("/user/byQQ", (req, res) => {
  console.log(req.body);
  const { qq } = req.body;
  const querySql = `select * from user where qq = ${qq} and ispass = 1;select count(*) as count from user where qq = ${qq} and ispass = 1;`;
  database.query(querySql, (err, queryRes) => {
    res.send({
      code: 200,
      data: {
        user: queryRes[0],
        count: queryRes[1][0].count,
      },
    });
  });
});

/**
 * @api         申请资金
 * @method      {post}
 * @url         /api/user/applyFunding
 * @apiParam    {string}  name 申请人
 * @apiParam    {number}  cost  申请金额
 * @apiParam    {string}  comment  申请内容
 * @apiParam    {string}  applyDate  申请时间
 */
router.post("/user/applyFunding", (req, res) => {
  console.log(req.body);
  const { name, cost, comment, applyDate } = req.body;
  const insertSql = `insert into bill (name,cost,comment,applyDate) values ('${name}',${cost},'${comment}','${applyDate}')`;
  database.query(insertSql, (err, insertRes) => {
    if (insertRes.affectedRows === 1) {
      res.send({
        code: 200,
        message: "已发出申请",
      });
    }
  });
});

/**
 * @api         修改密码
 * @method      {post}
 * @url         /api/user/updatePassword
 * @apiParam    {string}  id  学号/学工号等
 * @apiParam    {string}  oldPassword  旧密码
 * @apiParam    {string}  newPassword  新密码
 */
router.post("/user/updatePassword", (req, res) => {
  console.log(req.body);
  const { id, oldPassword, newPassword } = req.body;
  const querySql = `select password from user where id = ${id}`;
  // 查询用户密码
  database.query(querySql, (err, queryRes) => {
    const userPassword = queryRes[0].password;
    console.log(userPassword, "sql");
    // 校验密码是否一致
    if (userPassword === oldPassword) {
      const updateSql = `update user set password = '${newPassword}' where id = ${id}`;
      database.query(updateSql, (err, updateRes) => {
        if (updateRes.affectedRows === 1) {
          res.send({
            code: 200,
            message: "修改成功!",
          });
        }
      });
    } else {
      res.send({
        code: 201,
        message: "密码错误!",
      });
    }
  });
  // const updateSql = `update user set password = `
});

module.exports = router;
