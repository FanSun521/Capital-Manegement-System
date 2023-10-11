const express = require("express");
const router = express.Router();
const database = require("../../database/database");
// 引入 multiparty
const multiparty = require("multiparty");

/**
 * @api         删除员工
 * @method      {post}
 * @url         /api/admin/deleteUser
 * @apiParam    {string}  id  学号/学工号等
 */
router.post("/admin/deleteUser", (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  const deleteSql = `delete from user where id = ${id}`;
  database.query(deleteSql, (err, deleteRes) => {
    if (deleteRes.affectedRows === 1) {
      res.send({
        code: 200,
        message: "删除成功!",
      });
    }
  });
});

/**
 * @api         批量通过用户注册
 * @method      {post}
 * @url         /api/admin/userPass
 * @apiParam    {string} list '["id1","id2",...]'
 */
router.post("/admin/userPass", (req, res) => {
  console.log(req.body);
  const list = JSON.parse(req.body.list);
  let str = `(`;
  list.forEach((id, index) => {
    if (index !== list.length - 1) {
      str += `${id},`;
    } else {
      str += `${id})`;
    }
  });
  const updateSql = `update user set isPass = 1 where id in ` + str;
  database.query(updateSql, (err, updateRes) => {
    if (updateRes.affectedRows === list.length) {
      res.send({
        code: 200,
        message: "通过成功!",
      });
    }
  });
});

/**
 * @api         批量通过资金申请
 * @method      {post}
 * @url         /api/admin/applyBills
 * @apiParam    {string} list '["id1","id2",...]'
 * @apiParam    {number} permission 权限
 * @apiParam    {string} checkName 审核人
 */
router.post("/admin/applyBills", (req, res) => {
  console.log(req.body);
  const list = JSON.parse(req.body.list);
  const permission = req.body.permission ?? 2;
  const checkName = req.body.checkName;
  let str = `(`;
  list.forEach((id, index) => {
    if (index !== list.length - 1) {
      str += `${id},`;
    } else {
      str += `${id})`;
    }
  });
  let updateSql;
  //部门管理员
  if (permission === 2) {
    updateSql =
      "update bill set `check` = 2 , `checkName` = " +
      `'${checkName}'` +
      " where id in " +
      str;
  } else {
    //超级管理员
    updateSql =
      "update bill set `check` = 3 , `checkName` = " +
      `'${checkName}'` +
      " where id in " +
      str;
  }
  database.query(updateSql, (err, updateRes) => {
    console.log(updateRes);
    if (updateRes.affectedRows === list.length) {
      res.send({
        code: 200,
        message: "通过成功!",
      });
    }
  });
});
module.exports = router;

``;
