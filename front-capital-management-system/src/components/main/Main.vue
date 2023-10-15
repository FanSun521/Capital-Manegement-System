<template>
  <div>
    <el-container>
      <el-aside width="auto"><Aside></Aside></el-aside>
      <el-container>
        <el-header><Header></Header></el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "./Aside.vue";
import Header from "./Header.vue";
export default {
  name: "Main",
  props: {},
  methods: {},
  components: {
    Aside,
    Header,
  },
};
</script>

<style scoped>
.el-header {
  padding: 0;
}
</style>
