<template>
  <div class="sideBar">
    <nav class="icons">
      <user-avatar />
      <router-link class="el-icon-notebook-2" title="笔记" to="/note/1">
      </router-link>
      <router-link class="el-icon-notebook-1" title="笔记列表" to="/notebook">
      </router-link>
      <router-link
        class="el-icon-delete-solid"
        title="回收站"
        to="/trash/1"
      ></router-link>
    </nav>
    <div class="logout" title="登出" @click="onLogout">
      <i class="el-icon-switch-button"></i>
    </div>
  </div>
</template>

<script>
import UserAvatar from "./UserAvatar.vue";
import Auth from "@/apis/auth";
import bus from "@/helper/bus";
export default {
  components: { UserAvatar },
  data() {
    return {};
  },
  methods: {
    onLogout() {
      //传数据给UserAvatar组件
      bus.$emit("userLogout", { username: "未登录" });
      //和后端交互
      Auth.logout().then(() => {
        this.$router.push({ path: "/login" });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.sideBar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #2c333c;
  width: 56px;
  height: 100vh;
  font-size: 28px;
  > .icons {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    > a {
      padding: 6px 0;
    }
    > .router-link-active {
      background: #5e6266;
    }
  }
}
.logout {
  margin-bottom: 20px;
}

* {
  color: white;
}
</style>
