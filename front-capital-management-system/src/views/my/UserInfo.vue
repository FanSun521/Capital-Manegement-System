<template>
  <div class="userinfo">
    <el-card class="user-header" shadow="hover">
      <div class="left">
        <img :src="require('@/assets/imgs/qq头像.jpg')" alt="头像" />
        <div class="content">
          <h3 class="name">{{ userName }}</h3>
          <p class="blue">
            <SvgIcon icon-class="huiyuan" style="width: 20px"></SvgIcon>
            {{ department }}
          </p>
          <p>{{ signature }}</p>
        </div>
      </div>
      <div class="right">
        <h3 style="font-weight: 400">早上好，又是美好的一天呢!</h3>
      </div>
    </el-card>
    <el-card class="user-body" shadow="hover">
      <!-- 个人信息表单 -->
      <el-descriptions class="margin-top" title="我的信息" :column="2" border>
        <template slot="extra">
          <el-button type="primary" size="small" @click="editInfo"
            >编辑信息</el-button
          >
        </template>
        <el-descriptions-item v-for="(item, index) in infoLabel" :key="index">
          <template slot="label">
            {{ item.label }}
          </template>
          <!-- 上传头像 -->
          <el-upload
            v-if="!item.value && item.label === '头像'"
            class="avatar-uploader"
            :before-upload="beforeAvatarUpload"
            action="#"
            :auto-upload="false"
          >
            <img
              v-if="infoLabel[0].value"
              :src="infoLabel[0].value"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

          <el-tag v-if="!item.value && item.label !== '头像'" size="small"
            >请完善信息~</el-tag
          >
          <span> {{ item.value }}</span>
        </el-descriptions-item>
      </el-descriptions>
      <hr style="margin-top: 40px" />
      <!-- 隐私表单 -->
      <el-descriptions class="privateTable" title="账户隐私" :column="4" border>
        <el-descriptions-item :label="password.label">
          <div class="private-item">
            <span>{{ password.display }}</span>
            <div class="button-box">
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
              <el-button type="success" icon="el-icon-check" circle></el-button>
            </div>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 修改信息弹窗 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item
          v-for="item in infoLabel"
          v-if="item.label !== '头像' && item.label !== '部门'"
          :label="item.label"
          :label-width="formLabelWidth"
        >
          <el-input v-model="item.value" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelChange">取 消</el-button>
        <el-button type="primary" @click="changeInfo">确 定</el-button>
      </div>
    </el-dialog>
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
        { label: "个性签名", value: "", key: "signature" },
      ],
      password: {
        label: "密码",
        display: "********",
        value: "",
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      dialogImageUrl: "",
      copy: null,
    };
  },
  mounted() {
    this.getInfo();
  },
  computed: {
    userName() {
      return this.infoLabel.find((item) => item.key === "name").value;
    },
    department() {
      return this.infoLabel.find((item) => item.key === "department").value;
    },
    signature() {
      return (
        this.infoLabel.find((item) => item.key === "signature").value ??
        "去完善个性签名吧~"
      );
    },
  },
  methods: {
    //获取个人信息
    async getInfo() {
      //获取本地id
      const id = localStorage.getItem("id");
      const res = await this.$http.getInfo({ id });
      const info = res.data.info;
      console.log(info);
      //信息标签和信息组合起来
      this.infoLabel.forEach((item) => {
        const key = item.key;
        const value = info[key];

        //性别 1代表男生
        if (key === "sex") {
          value === 1 ? (item.value = "男") : (item.value = "女");
          return;
        }
        item.value = value;
      });
      //密码单独处理
      this.password.value = info.password;
      this.password.display = "********";
    },
    //编辑个人信息
    editInfo() {
      this.dialogFormVisible = true;
      this.copy = structuredClone(this.infoLabel);
    },
    //修改个人信息
    async changeInfo() {
      this.dialogFormVisible = false;
      const data = {};
      this.infoLabel.forEach((item) => {
        if (item.key === "sex") {
          if (item.value === "男") {
            data[item.key] = 1;
          } else {
            data[item.key] = 0;
          }
        } else {
          data[item.key] = item.value;
        }
      });
      const res = await this.$http.updateInfo(data);
      if (res.code === 200) {
        this.$message({
          type: "success",
          message: "修改信息成功!",
        });
      }
    },
    //取消修改
    cancelChange() {
      this.dialogFormVisible = false;
      this.$message({
        type: "info",
        message: "取消修改",
      });
      this.infoLabel = this.copy;
    },
    // 上传前
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
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
    :deep .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    :deep .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    :deep .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
    }
    :deep .avatar {
      width: 80px;
      height: 80px;
      display: block;
    }
    .privateTable {
      margin-top: 40px;
      .private-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .button-box {
          margin-right: 50px;
        }
      }
    }
  }
}
</style>
