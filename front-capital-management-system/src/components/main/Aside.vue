<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    menu-trigger="hover"
  >
    <a class="title" @click="goHome">
      <SvgIcon icon-class="zijin"></SvgIcon>
      <h3 v-show="!isCollapse">资金管理系统</h3>
    </a>
    <el-submenu v-for="(firstMenu, firIndex) in menu" :index="'' + firIndex">
      <template slot="title" class="firstMenu">
        <SvgIcon :icon-class="firstMenu.icon"></SvgIcon>
        <span>{{ firstMenu.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          v-for="(secMenu, secIndex) in firstMenu.children"
          :index="'' + firIndex + '-' + secIndex"
          @click="goNav(secMenu.name, firIndex, secIndex)"
        >
          <SvgIcon :icon-class="secMenu.icon"></SvgIcon>
          <span>{{ secMenu.label }}</span>
        </el-menu-item>
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
      menu: [],
      activeIndex: "",
    };
  },
  mounted() {
    //绑定切换按钮的全局事件
    this.$bus.$on("changeCollapse", () => {
      this.isCollapse = !this.isCollapse;
    });
    console.log(menu);
    //菜单
    this.menu = menu;
    //获取菜单索引 避免刷新左侧菜单选中失效
    const activeIndex = sessionStorage.getItem("activeIndex") ?? "0-0";
    this.activeIndex = activeIndex;
  },
  methods: {
    //跳转首页
    goHome() {
      this.$router.push({ name: "main" });
    },
    //跳转对应导航菜单
    goNav(name, firIndex, secIndex) {
      this.$router.push({ name });
      //利用sessionStorage存储菜单索引
      sessionStorage.setItem("activeIndex", `${firIndex}-${secIndex}`);
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
:deep .el-submenu__title {
  display: flex;
  align-items: center;
  svg {
    width: 20px;
    margin-right: 5px;
  }
}
.el-menu-vertical-demo {
  height: 100vh;
  .el-menu-item-group {
    :deep .is-active {
      background-color: #d9ecff;
    }
  }

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
.el-menu-item {
  display: flex;
  align-items: center;
  svg {
    width: 20px;
    margin-right: 5px;
  }
}
</style>
