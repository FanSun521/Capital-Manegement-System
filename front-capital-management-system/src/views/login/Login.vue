<template>
  <div class="box">
    <div class="container">
      <transition name="turnRight">
        <div class="switch">
          <div class="circle_top"></div>
          <h2 class="switch_title">Welcome Back!</h2>
          <p class="switch_text">已经注册过账号,可以去登录啦!</p>
          <button class="switch_button">SIGN IN</button>
          <div class="circle_bottom"></div>
        </div>
      </transition>
      <transition name="turnLeft">
        <div class="main">
          <div class="login">
            <h2 class="mainTitle">登录账号</h2>
            <div style="width: 350px; text-align: center">
              <input v-model="loginId" type="text" placeholder="Id:学号" />
              <input
                v-model="loginPassword"
                type="text"
                placeholder="Password:密码"
              />
              <a href="#">忘记密码?</a>
            </div>
            <button @click="login">SIGN IN</button>
          </div>
          <div class="register">
            <h2 class="mainTitle">创建账号</h2>
            <div style="width: 350px; text-align: center">
              <input v-model="registerId" type="text" placeholder="Id:学号" />
              <input
                v-model="registerName"
                type="text"
                placeholder="Name:姓名"
              />
              <input
                v-model="registerPassword"
                type="text"
                placeholder="Password:密码"
              />
              <el-select
                :popper-append-to-body="false"
                v-model="direction"
                clearable
                placeholder="请选择方向"
              >
                <el-option
                  v-for="item in directionOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <button @click="register">SIGN UP</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "Login",
  props: {},
  data() {
    return {
      loginId: "2021005820",
      loginPassword: "88888888",
      direction: "",
      directionOptions: [
        {
          value: "开发",
        },
        {
          value: "设计",
        },
        {
          value: "秘书处",
        },
      ],
      registerId: "",
      registerName: "",
      registerPassword: "",
    };
  },
  mounted() {
    this.initAnimations();
  },
  methods: {
    //初始化css动画效果
    initAnimations() {
      // 获取dom元素
      const switchBtn = document.querySelector(".switch_button");
      const switchDiv = document.querySelector(".switch");
      const mainDiv = document.querySelector(".main");
      const turnRight = switchDiv.getAnimations()[0];
      const turnLeft = mainDiv.getAnimations()[0];
      const switchTitle = document.querySelector(".switch_title");
      const switchText = document.querySelector(".switch_text");
      const loginDiv = document.querySelector(".login");
      const registerDiv = document.querySelector(".register");
      //开始暂停动画
      turnLeft.pause();
      turnRight.pause();
      //初始隐登录盒子
      loginDiv.style.display = "none";
      //flag是否是初始时刻
      let flag = true;
      //修改dom元素内容
      const changeDom = () => {
        if (switchBtn.innerText === "SIGN IN") {
          switchBtn.innerText = "SIGN UP";
          switchTitle.innerText = "Hello Friend!";
          switchText.innerText = "没有账号,去注册一个账号吧!";
        } else {
          switchBtn.innerText = "SIGN IN";
          switchTitle.innerText = "Welcome Back!";
          switchText.innerText = "已经注册过账号,可以去登录啦!";
        }
        if (loginDiv.style.display === "none") {
          registerDiv.style.display = "none";
          loginDiv.style.display = "flex";
        } else {
          loginDiv.style.display = "none";
          registerDiv.style.display = "flex";
        }
      };
      //给按钮绑定点击事件 切换登录和注册盒子
      switchBtn.addEventListener("click", () => {
        if (flag) {
          turnLeft.play();
          turnRight.play();
          flag = false;
        } else {
          //动画反转：来回移动
          turnLeft.reverse();
          turnRight.reverse();
        }
        changeDom();
      });
      //先展示登录框
      // switchBtn.click();
    },
    //登录
    async login() {
      //非空校验
      if (!this.loginId || !this.loginPassword) {
        this.$message({
          message: "请填写学号或密码!",
          type: "warning",
        });
        return;
      }
      //发送请求
      const res = await this.$http.login({
        id: this.loginId,
        password: this.loginPassword,
      });
      if (res.code === 200) {
        //利用cookie存储token
        Cookies.set("token", res.data.token);
        console.log(res, 6666);
        //存储id、permission到本地
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("permission", res.data.permission);
        //跳转首页
        this.$router.push({ name: "main" });
        //登录成功消息提示
        this.$message({
          message: "登陆成功!",
          type: "success",
        });
      }
    },
    async register() {
      //非空校验
      if (
        !this.registerId ||
        !this.registerName ||
        !this.registerPassword ||
        !this.direction
      ) {
        this.$message({
          message: "请填写信息!",
          type: "warning",
        });
        return;
      }
      //发送请求
      const res = await this.$http.register({
        id: this.registerId,
        password: this.registerPassword,
        userName: this.registerName,
        department: this.direction,
      });
      if (res.code === 200) {
        //注册成功消息提示
        this.$message({
          message: "注册成功!",
          type: "success",
        });
      }
    },
  },
};
</script>

<style scoped>
.box {
  height: 100vh;
  background-color: #ecf0f3;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a0a5a8;
}
.container {
  display: flex;
  width: 1200px;
  height: 600px;
  box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
}
@media (max-width: 1220px) {
  .container {
    transform: scale(0.7);
  }
}
@media (max-width: 1000px) {
  .container {
    transform: scale(0.6);
  }
}
@media (max-width: 800px) {
  .container {
    transform: scale(0.5);
  }
}
@media (max-width: 600px) {
  .container {
    transform: scale(0.4);
  }
}
@media (max-width: 400px) {
  .container {
    transform: scale(0.3);
  }
}
.switch {
  position: relative;
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;
  animation: turnRight 1s ease forwards;
}
.main {
  position: relative;
  width: 800px;
  height: 100%;
  animation: turnLeft 1s ease forwards;
}
h2 {
  font-size: 34px;
  font-weight: 700;
  line-height: 3;
  color: #181818;
}
p {
  font-size: 14px;
  letter-spacing: 0.25px;
  line-height: 1.6;
}
button {
  width: 180px;
  height: 50px;
  border-radius: 25px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.15px;
  background-color: #4b70e2;
  color: #f9f9f9;
  box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
  border: none;
  cursor: pointer;
  margin-top: 50px;
}
button:hover {
  box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
  transform: scale(0.985);
  transition: 0.25s;
}
button:active {
  box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
  transform: scale(0.97);
  transition: 0.25s;
}
.circle_top {
  position: absolute;
  top: 0;
  right: 0;
  width: 160px;
  height: 160px;
  border-radius: 0 0 0 160px;
  box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
}
.circle_bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 150px;
  height: 150px;
  border-radius: 0 150px 0 0;
  box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
}
input {
  width: 350px;
  height: 40px;
  padding-left: 25px;
  margin: 10px 0;
  font-size: 13px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  background-color: #ecf0f3;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}
input:focus {
  box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
}
a {
  display: inline-block;
  color: #181818;
  font-size: 15px;
  margin-top: 25px;
  padding-bottom: 5px;
  border-bottom: 1px solid #a0a5a8;
  line-height: 2;
  text-decoration: none;
  margin-top: 30px;
}
@keyframes turnRight {
  from {
    left: 0;
  }
  to {
    left: 800px;
  }
}
@keyframes turnLeft {
  from {
    left: 0;
  }
  to {
    left: -400px;
  }
}
.login,
.register {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
:deep .el-input__inner {
  width: 350px;
  height: 40px;
  padding-left: 25px;
  margin: 10px 0;
  font-size: 13px;
  letter-spacing: 0.15px;
  background-color: #ecf0f3;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}

/* 注意::伪元素前面不能有空格 否则不生效 这个小问题卡了30min md */
:deep .el-input__inner::placeholder {
  color: #757575;
}
:deep .el-input__inner:focus,
.el-input.is-focus {
  border: none;
}
</style>
