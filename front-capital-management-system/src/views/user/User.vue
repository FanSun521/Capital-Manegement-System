<template>
  <div class="usersInfo">
    <el-card class="searchCard">
      <div class="searchHeader">
        <span class="searchTitle">搜索面板</span>
        <div>
          <el-button
            :type="buttonFlag ? 'primary' : ''"
            @click="accurateHandler"
            >精准搜索</el-button
          >
          <el-button :type="!buttonFlag ? 'primary' : ''" @click="filterHandler"
            >筛选搜索</el-button
          >
        </div>
      </div>
      <div class="searchBody">
        <div class="leftSearch">
          <template v-if="buttonFlag">
            <el-select
              @change="selectHandler"
              v-model="selectValue"
              placeholder="请选择搜索项"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input
              v-show="isSearch"
              size="small"
              :placeholder="searchTip"
              v-model="searchVal"
            >
            </el-input>
          </template>
          <template v-else>
            <el-select v-model="selectDepartment" placeholder="请选择部门">
              <el-option
                v-for="item in departmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select v-model="selectState" placeholder="请选择账号状态">
              <el-option
                v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </div>
        <div class="rightSearch">
          <el-button
            type="primary"
            size="middle"
            icon="el-icon-search"
            @click="searchHandler"
          ></el-button>
          <el-button
            size="middle"
            icon="el-icon-refresh"
            @click="refreshHandler"
          ></el-button>
        </div>
      </div>
    </el-card>
    <el-card class="usersCard" ref="usersCard">
      <el-table
        stripe
        style="width: 100%"
        :data="tableData"
        :max-height="tableHeight"
      >
        <el-table-column
          v-for="item in tableInfo"
          :prop="item.prop"
          :label="item.label"
          :key="item.prop"
          width="180"
          :fixed="item.fixed"
        >
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <!-- 默认列 -->
              <span
                v-if="
                  item.prop !== 'state' &&
                  item.prop !== 'permission' &&
                  item.prop !== 'sex'
                "
                >{{ scope.row[item.prop] ?? "空" }}</span
              >
              <!-- 状态列 -->
              <el-tag
                v-else-if="item.prop === 'state'"
                :type="scope.row[item.prop] === 1 ? 'success' : 'danger'"
                size="medium"
                >{{ scope.row[item.prop] === 1 ? "启用" : "禁用" }}</el-tag
              >
              <!-- 权限列 -->
              <el-tag
                v-else-if="item.prop === 'permission'"
                :type="
                  scope.row[item.prop] === 1
                    ? ''
                    : scope.row[item.prop] === 2
                    ? 'success'
                    : 'warning'
                "
                size="medium"
                effect="dark"
                >{{
                  scope.row[item.prop] === 1
                    ? "超级管理员"
                    : scope.row[item.prop] === 2
                    ? "部门管理员"
                    : "普通打工仔"
                }}</el-tag
              >
              <!-- 性别列 -->
              <span v-else-if="item.prop === 'sex'">{{
                scope.row[item.prop] === null
                  ? "空"
                  : scope.row[item.prop] === 0
                  ? "女"
                  : "男"
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="editUser(scope)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              plain
              @click="deleteUser(scope)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="->,total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        style="margin-top: 10px"
      >
      </el-pagination>
    </el-card>
    <el-dialog title="员工操作" :visible.sync="editFormVisible" width="30%">
      <el-form :model="editFrom">
        <el-form-item
          v-if="userPermission <= 2"
          label="账号状态"
          :label-width="editFormLabelWidth"
        >
          <el-select v-model="editFrom.state" placeholder="请选择账号状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="userPermission === 1"
          label="部门"
          :label-width="editFormLabelWidth"
        >
          <el-select v-model="editFrom.department" placeholder="请选择部门">
            <el-option label="设计" value="设计"></el-option>
            <el-option label="秘书处" value="秘书处"></el-option>
            <el-option label="开发" value="开发"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="userPermission === 1"
          label="权限"
          :label-width="editFormLabelWidth"
        >
          <el-select v-model="editFrom.permission" placeholder="请选择权限">
            <el-option label="超级管理员" :value="1"></el-option>
            <el-option label="部门管理员" :value="2"></el-option>
            <el-option label="普通打工仔" :value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelHandler">取 消</el-button>
        <el-button type="primary" @click="editHandler">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import throttle from "@/utils/throttle";
export default {
  name: "User",
  props: {},
  mounted() {
    //监听浏览器窗口变化 更改table高度
    window.addEventListener(
      "resize",
      throttle(() => {
        this.$nextTick(() => {
          this.tableHeight = this.$refs.usersCard.$el.offsetHeight - 100;
        });
      }, 1)
    );
    //获取员工信息
    this.getEmployee();
    //table表格自适应高度
    this.$nextTick(() => {
      this.tableHeight = this.$refs.usersCard.$el.offsetHeight - 100;
    });
    //用户权限
    this.userPermission = Number(localStorage.getItem("permission"));
  },
  data() {
    return {
      tableInfo: [
        {
          prop: "id",
          label: "ID",
          fixed: "left",
        },
        {
          prop: "name",
          label: "姓名",
          fixed: "left",
        },
        {
          prop: "department",
          label: "部门",
        },
        {
          prop: "permission",
          label: "权限",
        },
        {
          prop: "state",
          label: "账号状态",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sex",
          label: "性别",
        },
        {
          prop: "address",
          label: "地址",
        },
        {
          prop: "telephone",
          label: "手机号",
        },
        {
          prop: "qq",
          label: "QQ号",
        },
      ],
      tableData: [],
      pageCurrent: 1,
      pageSize: 10,
      total: 0,
      tableHeight: 0,
      searchVal: "",
      buttonFlag: true,
      selectValue: "",
      isSearch: false,
      searchTip: "",
      selectDepartment: "",
      departmentOptions: [
        {
          value: "设计",
          label: "设计",
        },
        {
          value: "秘书处",
          label: "秘书处",
        },
        {
          value: "开发",
          label: "开发",
        },
      ],
      selectState: "",
      stateOptions: [
        {
          value: "1",
          label: "启用",
        },
        {
          value: "0",
          label: "禁用",
        },
      ],
      options: [
        {
          value: "请输入ID",
          label: "ID搜索",
        },
        {
          value: "请输入姓名",
          label: "姓名搜索",
        },
        {
          value: "请输入手机号",
          label: "手机号搜索",
        },
        {
          value: "请输入QQ号",
          label: "QQ号搜索",
        },
      ],
      editFormVisible: false,
      editFrom: {
        state: "",
        department: "",
        permission: "",
        id: "",
      },
      editFormLabelWidth: "120px",
      userPermission: "",
    };
  },
  methods: {
    //获取员工信息
    async getEmployee(pageCurrent, pageSize, department, state) {
      const data = {
        pageCurrent: pageCurrent ?? this.pageCurrent,
        pageSize: pageSize ?? this.pageSize,
      };
      if (department) {
        data.department = department;
      }
      if (state) {
        data.state = state;
      }
      const res = await this.$http.getEmployee(data);
      console.log(res);
      if (res.code === 200) {
        this.tableData = res.userList;
        this.total = res.count;
      }
    },
    //页数变化处理
    handleCurrentChange(pageCurrent) {
      this.pageCurrent = pageCurrent;
      this.getEmployee(
        pageCurrent,
        this.pageSize,
        this.selectDepartment,
        this.selectState
      );
    },
    //每页数量发生变化处理
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getEmployee(
        this.pageCurrent,
        pageSize,
        this.selectDepartment,
        this.selectState
      );
    },
    //切换精准搜索
    accurateHandler() {
      this.buttonFlag = true;
    },
    //切换筛选搜索
    filterHandler() {
      this.buttonFlag = false;
    },
    //选择精准搜索项
    selectHandler(val) {
      this.isSearch = true;
      this.searchTip = val;
    },
    //清空搜索项
    refreshHandler() {
      this.searchVal = "";
      this.selectDepartment = "";
      this.selectState = "";
      this.selectValue = "";
      this.searchTip = "";
      this.isSearch = false;
      this.pageCurrent = 1;
      this.pageSize = 10;
      this.getEmployee();
    },
    //搜索
    async searchHandler() {
      //精准搜索
      if (this.buttonFlag) {
        if (this.searchTip && this.searchVal === "") {
          this.$message({
            type: "warning",
            message: this.searchTip,
          });
          return;
        }
        let res;
        switch (this.searchTip) {
          case "请输入ID":
            res = await this.$http.getById({ id: this.searchVal });
            break;
          case "请输入姓名":
            res = await this.$http.getByName({ userName: this.searchVal });
            break;
          case "请输入手机号":
            res = await this.$http.getByTelephone({
              telephone: this.searchVal,
            });
            break;
          case "请输入QQ号":
            res = await this.$http.getByQQ({ qq: this.searchVal });
            break;
          default:
            this.$message({
              type: "warning",
              message: "请选择搜索项",
            });
            break;
        }
        if (res && res.code === 200) {
          this.tableData = res.data.user;
          this.total = res.data.count;
          this.$message({
            type: "success",
            message: "查询成功",
          });
        }
      } else {
        //筛选搜搜
        if (this.selectDepartment === "" && this.selectState === "") {
          this.$message({
            type: "warning",
            message: "请选择部门或帐号状态",
          });
        } else {
          this.pageCurrent = 1;
          this.pageSize = 10;
          this.getEmployee(1, 10, this.selectDepartment, this.selectState);
          this.$message({
            type: "success",
            message: "查询成功",
          });
        }
      }
    },
    //员工编辑按钮
    editUser(scope) {
      this.editFormVisible = true;
      this.editFrom.state = scope.row.state;
      this.editFrom.department = scope.row.department;
      this.editFrom.permission = scope.row.permission;
      this.editFrom.id = scope.row.id;
    },
    //取消修改员工
    cancelHandler() {
      this.editFormVisible = false;
      this.$message({
        type: "info",
        message: "取消编辑",
      });
    },
    //修改员工信息
    async editHandler() {
      this.editFormVisible = false;
      const data = { id: this.editFrom.id };
      if (this.userPermission === 1) {
        data.state = this.editFrom.state;
        data.department = this.editFrom.department;
        data.permission = this.editFrom.permission;
      } else if (this.userPermission === 2) {
        data.state = this.state;
      }
      const res = await this.$http.updateInfo(data);
      if (res.code === 200) {
        this.getEmployee();
        this.$message({
          type: "success",
          message: "修改成功",
        });
      }
    },
    //删除员工按钮
    deleteUser({ row: { id } }) {
      this.$confirm("此操作将永久删除该员工, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$http.deleteUser({ id: id });
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getEmployee();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.usersInfo {
  height: 100%;
  .searchCard {
    height: 150px;
    .searchHeader {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .searchTitle {
        font-size: 15px;
        font-weight: 600;
        &::before {
          content: "";
          display: inline-block;
          width: 4px;
          background-color: #409eff;
          height: 20px;
          vertical-align: text-bottom;
          margin-right: 5px;
        }
      }
    }
    .searchBody {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      background-color: #fafafa;
      margin-top: 10px;
      .leftSearch {
        display: flex;
        margin-left: 20px;
        :deep .el-input,
        :deep .el-input__inner {
          width: 250px;
          height: 40px;
          margin-right: 40px;
        }
      }
      .rightSearch {
        margin-right: 20px;
      }
    }
  }
  .usersCard {
    margin-top: 10px;
    height: calc(100% - 150px);
    /*  滚动条的宽度 */
    /deep/ .el-table__body-wrapper::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    /* 滚动条的滑块 */
    /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
      background-color: #ddd;
      border-radius: 3px;
    }
  }
}
</style>
