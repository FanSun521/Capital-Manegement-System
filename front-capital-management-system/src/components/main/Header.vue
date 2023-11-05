<template>
  <el-card class="header" shadow="never">
    <div class="left">
      <SvgIcon
        style="cursor: pointer"
        @click="changeCollapse"
        :icon-class="res"
      ></SvgIcon>
    </div>
    <div class="right">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <img
            class="userPhoto"
            v-lazyLoad="require('@/assets/imgs/qq头像.jpg')"
            alt=""
          />
          <span>超级管理员</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-card>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "Header",
  props: {},
  data() {
    return {
      //模拟展开折叠的flag
      isCollpse: false,
    };
  },
  computed: {
    res() {
      return this.isCollpse ? "zhankai" : "zhedie";
    },
  },
  methods: {
    changeCollapse() {
      //切换展开折叠
      this.$bus.$emit("changeCollapse");
      this.isCollpse = !this.isCollpse;
    },
    //下拉框事件
    handleCommand(command) {
      //退出登录
      if (command === "logout") {
        //清除cookie
        Cookies.remove("token");
        //清除本地id、permission
        localStorage.removeItem("id");
        localStorage.removeItem("permission");
        //跳转登录页
        this.$router.push({ name: "login" });
      } else {
        this.$router.push({ name: "userInfo" });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  padding: 0;
  height: 60px;
  :deep .el-card__body {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
      .el-dropdown-link {
        width: 120px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        .userPhoto {
          width: 40px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
