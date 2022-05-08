<template>
  <div>
    <span :title="username"> {{ slug }}</span>
  </div>
</template>

<script>
import auth from "@/apis/auth";
import bus from "@/helper/bus";

export default {
  data() {
    return {
      username: "未登录",
    };
  },
  created() {
    bus.$on("userLogout", (data) => {
      this.username = data.username;
    });
    bus.$on("userInfo", (data) => {
      this.username = data;
    });
    auth
      .getInfo()
      .then((res) => {
        if (res.isLogin) {
          this.username = res.data.username;
        }
      })
      .catch(() => {
        this.username = "登录失败";
      });
  },

  computed: {
    slug() {
      return this.username[0];
    },
  },
};
</script>

<style lang="scss" scoped>
span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
