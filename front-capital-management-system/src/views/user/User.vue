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
          <el-select v-model="selectValue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input
            size="small"
            placeholder="姓名搜索"
            v-model="searchName"
            clearable
          >
          </el-input>
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
            <el-button size="mini" type="primary" plain>编辑</el-button>
            <el-button size="mini" type="danger" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="->,total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        style="margin-top: 10px"
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
    //监听浏览器窗口变化 更改table高度
    window.onresize = () => {
      this.tableHeight = this.$refs.usersCard.$el.offsetHeight - 100;
    };
    //获取员工信息
    this.getEmployee();
    //table表格自适应高度
    this.$nextTick(() => {
      this.tableHeight = this.$refs.usersCard.$el.offsetHeight - 100;
    });
    //获取员工数量
    this.getEmployeeCount();
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
      searchName: "",
      searchID: "",
      buttonFlag: true,
      selectValue: "",
      options: [
        {
          value: "选项1",
          label: "ID搜索",
        },
        {
          value: "选项2",
          label: "姓名搜索",
        },
        {
          value: "选项4",
          label: "手机号搜索",
        },
        {
          value: "选项5",
          label: "qq号搜索",
        },
      ],
    };
  },
  methods: {
    //获取员工信息
    async getEmployee(pageCurrent, pageSize) {
      const data = {
        pageCurrent: pageCurrent ?? this.pageCurrent,
        pageSize: pageSize ?? this.pageSize,
      };
      const res = await this.$http.getEmployee(data);
      console.log(res);
      if (res.code === 200) {
        this.tableData = res.userList;
      }
    },
    //获取员工数量
    async getEmployeeCount() {
      const res = await this.$http.getEmployeeCount();
      console.log(res);
      if (res.code === 200) {
        this.total = res.count;
      }
    },
    //页数变化处理
    handleCurrentChange(pageCurrent) {
      this.pageCurrent = pageCurrent;
      this.getEmployee(pageCurrent, this.pageSize);
    },
    //每页数量发生变化处理
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getEmployee(this.pageCurrent, pageSize);
    },
    //切换精准搜索
    accurateHandler() {
      this.buttonFlag = true;
    },
    //切换筛选搜索
    filterHandler() {
      this.buttonFlag = false;
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
      height: 60px;
      background-color: #fafafa;
      margin-top: 10px;
      .leftSearch {
        display: flex;
        :deep .el-input,
        :deep .el-input__inner {
          width: 250px;
          height: 40px;
          margin-right: 40px;
        }
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
