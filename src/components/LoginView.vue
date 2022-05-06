<template>
  <div>
    <div class="modal-mask">
      <div class="modal-container">
        <div class="main"></div>
        <div class="form">
          <h3 @click="showRegister">创建账号</h3>
          <transition name="fade">
            <div class="register" :class="{ show: isShowRegister }">
              <input
                type="text"
                placeholder="账号"
                v-model="register.username"
              />
              <input
                type="password"
                placeholder="密码"
                v-model="register.password"
              />
              <p :class="{ error: register.isError }">{{ register.notice }}</p>
              <public-button content="创建账号" @click.native="onRegister" />
            </div>
          </transition>
          <h3 @click="showLogin">登录</h3>
          <transition name="fade">
            <div class="login" :class="{ show: isShowLogin }">
              <input type="text" placeholder="账号" v-model="login.username" />
              <input
                type="password"
                placeholder="密码"
                v-model="login.password"
              />
              <p :class="{ error: login.isError }">{{ login.notice }}</p>
              <public-button @click.native="onLogin" content="登录" />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PublicButton from "./PublicButton.vue";
import Auth from "@/apis/auth";
//维持登录状态
Auth.getInfo().then((data) => {
  console.log(data);
});

export default {
  components: { PublicButton },
  data() {
    return {
      isShowRegister: false,
      isShowLogin: true,
      login: {
        username: "",
        password: "",
        notice: "请输入账号和密码",
        isError: false,
      },
      register: {
        username: "",
        password: "",
        notice: "创建账号后请记住账号和密码",
        isError: false,
      },
    };
  },
  methods: {
    //切换功能
    showRegister() {
      this.isShowRegister = true;
      this.isShowLogin = false;
    },
    showLogin() {
      this.isShowRegister = false;
      this.isShowLogin = true;
    },

    //登录功能
    onLogin() {
      const usernameResult = this.validUserName(this.login.username);
      const passwordResult = this.validPassword(this.login.password);
      if (!usernameResult.isValid) {
        this.login.isError = true;
        this.login.notice = usernameResult.notice;
        return;
      }
      if (!passwordResult.isValid) {
        this.login.isError = true;
        this.login.notice = passwordResult.notice;
        return;
      }
      this.login.isError = false;
      this.login.notice = "";
      //提取后端数据
      Auth.login({
        username: this.login.username,
        password: this.login.password,
      }).then((data) => {
        console.log(data);
      });
    },

    //注册功能
    onRegister() {
      const usernameResult = this.validUserName(this.register.username);
      const passwordResult = this.validPassword(this.register.password);
      if (!usernameResult.isValid) {
        this.register.isError = true;
        this.register.notice = usernameResult.notice;
        return;
      }
      if (!passwordResult.isValid) {
        this.register.isError = true;
        this.register.notice = passwordResult.notice;
        return;
      }
      this.register.isError = false;
      this.register.notice = "";
      //提交数据到后端
      Auth.register({
        username: this.register.username,
        password: this.register.password,
      }).then((data) => {
        console.log(data);
      });
    },

    //数据校验
    validUserName(username) {
      return {
        isValid: /^[\w\u4e00-\u9fa5]{3,15}$/.test(username),
        notice: "账号3~15个字符,仅限于字母数字下划线中文",
      };
    },
    validPassword(password) {
      return {
        isValid: /^.{6,16}$/.test(password),
        notice: "密码长度为6~16个字符",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-container {
  display: flex;
  width: 800px;
  height: 500px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
.main {
  flex-grow: 1;
  border-radius: 2px 0 0 2px;
  background: #36bc64
    url(https://cloud.hunger-valley.com/17-12-13/38476998.jpg-middle) center
    center no-repeat;
  background-size: contain;
}
.form {
  width: 270px;
  border-left: 1px solid #ccc;
  h3 {
    padding: 10px 20px;
    font-weight: 100px;
    font-size: 16px;
    text-align: left;
    border-top: 1px solid #eee;
    cursor: pointer;
    &:nth-of-type(2) {
      border-bottom: 1px solid #eee;
    }
  }
}
.login,
.register {
  padding: 0px 20px;
  border-top: 1px solid #eee;
  //切换过渡动画
  height: 0;
  overflow: hidden;
  transition: height 0.2s;
  &.show {
    height: 193px;
  }
}

input {
  display: block;
  width: 100%;
  height: 35px;
  line-height: 35px;
  padding: 0 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 14px;
  margin-top: 10px;
}
input:focus {
  border: 3px solid #9dcaf8;
}
p {
  font-size: 12px;
  margin-top: 10px;
  color: #444;
  text-align: left;
}
.error {
  color: red;
}
</style>
