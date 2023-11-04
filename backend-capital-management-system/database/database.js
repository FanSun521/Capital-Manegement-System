const mysql = require("mysql");
// 连接数据库
const database = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "fanyang1314...",
  port: 3306,
  database: "capital_management",
  multipleStatements: true //开启多条查询语句
});

module.exports = database;
