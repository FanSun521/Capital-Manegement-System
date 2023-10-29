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
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain>编辑</el-button>
            <el-button size="mini" type="danger" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
          label: "状态",
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
