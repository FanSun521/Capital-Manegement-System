<template>
  <div class="userinfo">
    <el-card class="user-header" shadow="hover">
      <div class="left">
        <img :src="require('@/assets/imgs/qq头像.jpg')" alt="头像" />
        <div class="content">
          <h3 class="name">姓名</h3>
          <p class="blue">
            <SvgIcon icon-class="huiyuan" style="width: 20px"></SvgIcon>
            身份-部门
          </p>
          <p>个性签名!</p>
        </div>
      </div>
      <div class="right">
        <h3 style="font-weight: 400">早上好，又是美好的一天呢!</h3>
      </div>
    </el-card>
    <el-card class="user-body" shadow="hover">
      <el-descriptions class="margin-top" title="我的信息" :column="2" border>
        <template slot="extra">
          <el-button type="primary" size="small">编辑信息</el-button>
        </template>
        <el-descriptions-item v-for="(item, index) in infoLabel" :key="index">
          <template slot="label">
            {{ item.label }}
          </template>
          {{ item.value }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  props: {},
  data() {
    return {
      infoLabel: [
        { label: "头像", value: "", key: "avatarAddress" },
        { label: "姓名", value: "", key: "name" },
        { label: "id", value: "", key: "id" },
        { label: "部门", value: "", key: "department" },
        { label: "年龄", value: "", key: "age" },
        { label: "性别", value: "", key: "sex" },
        { label: "地址", value: "", key: "address" },
        { label: "qq", value: "", key: "qq" },
        { label: "手机号", value: "", key: "telephone" },
        { label: "密码", value: "********", key: "password" },
        { label: "个性签名", value: "", key: "signature" },
      ],
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    //获取个人信息
    async getInfo() {
      //获取本地id
      const id = localStorage.getItem("id");
      const res = await this.$http.getInfo({ id });
      console.log(res);
      //信息标签和信息组合起来
    },
  },
};
</script>

<style lang="less" scoped>
.userinfo {
  height: 100%;
  .user-header {
    height: 130px;

    :deep .el-card__body {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        .content {
          margin-left: 10px;
          .name {
            margin-top: 7px;
          }
          .blue {
            display: flex;
            align-items: center;
            color: #3fd2ff;
          }
          p {
            margin: 5px 0;
          }
        }
        img {
          width: 80px;
          border-radius: 10px;
        }
      }
    }
  }
  .user-body {
    margin-top: 10px;
    height: calc(100% - 140px);
  }
}
</style>
