const express = require("express");
const router = express.Router();
const database = require("../../database/database");

/**
 * @api         设置总资产
 * @method      {post}
 * @url         /api/superAdmin/setAssets
 * @apiParam    {number}  permission  权限
 * @apiParam    {number}  assets  资产
 */
router.post("/superAdmin/setAssets", (req, res) => {
  console.log(req.body);
  const { permission, assets } = req.body;
  if (permission !== 1) {
    return res.send({
      code: 201,
      message: "权限不足！",
    });
  } else {
    const updateSql =
      `update property set ` + "`totalAssets` =" + ` ${assets} where id = 1`;
    database.query(updateSql, (err, updateRes) => {
      if (updateRes.affectedRows === 1) {
        res.send({
          code: 200,
          message: "设置成功!",
        });
      }
    });
  }
});

/**
 * @api         删除员工
 * @method      {post}
 * @url         /api/superAdmin/deleteUser
 * @apiParam    {string}  id  学号/学工号等
 */
router.post("/superAdmin/deleteUser", (req, res) => {
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
 * @api         权限管理：编辑权限
 * @method      {post}
 * @url         /api/superAdmin/setPermission
 * @apiParam    {number}  permission  权限
 * @apiParam    {string}  id  用户id
 *
 */
router.post("/superAdmin/setPermission", (req, res) => {
  console.log(req.body);
  const { permission, id } = req.body;
  const updateSql = `update user set permission = ${permission} where id = ${id}`;
  database.query(updateSql, (err, updateRes) => {
    if (updateRes.affectedRows === 1) {
      res.send({
        code: 200,
        message: "修改成功!",
      });
    }
  });
});
module.exports = router;
