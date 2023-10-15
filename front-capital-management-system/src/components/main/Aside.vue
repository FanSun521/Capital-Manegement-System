<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
  >
    <a class="title" @click="goHome">
      <SvgIcon icon-class="zijin"></SvgIcon>
      <h3 v-show="!isCollapse">资金管理系统</h3>
    </a>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>首页</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">分析台</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

  </el-menu>
</template>

<script>
import "@/icons/svg/zijin.svg";
import menu from "@/data/menu.js";
export default {
  name: "Aside",
  props: {},
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      //默认是展开
      isCollapse: false,
    };
  },
  mounted() {
    //绑定切换按钮的全局事件
    this.$bus.$on("changeCollapse", () => {
      this.isCollapse = !this.isCollapse;
    });
    console.log(menu);
  },
  methods: {
    //跳转首页
    goHome() {
      this.$router.push({ name: "main" });
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  height: 100vh;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0 10px 0;
    cursor: pointer;
    h3 {
      margin-left: 5px;
    }
  }
}
</style>
