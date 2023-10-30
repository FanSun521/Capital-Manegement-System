<template>
  <div class="usersInfo">
    <el-card class="searchCard"> </el-card>
    <el-card class="usersCard" ref="usersCard">
      <el-table
        stripe
        style="width: 100%"
        :data="tableData"
        :max-height="tableHight"
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
            <el-button size="mini" type="primary" plain>编辑</el-button>
            <el-button size="mini" type="danger" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :page-sizes="[2, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "User",
  props: {},
  mounted() {
    //获取员工信息
    this.getEmployee();
    this.$nextTick(() => {
      //计算表格最大高度
      this.tableHight = this.$refs.usersCard.$el.offsetHeight - 100;
    });
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
      pageSize: 20,
      tableHight: 0,
      total: 0,
    };
  },
  methods: {
    //获取员工信息
    async getEmployee() {
      const data = { pageCurrent: this.pageCurrent, pageSize: this.pageSize };
      const res = await this.$http.getEmployee(data);
      console.log(res);
      if (res.code === 200) {
        this.tableData = res.userList;
        this.total = this.tableData.length;
      }
    },
  },
};
</script>

<style scoped>
.usersInfo {
  height: 100%;
  .searchCard {
    height: 150px;
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
