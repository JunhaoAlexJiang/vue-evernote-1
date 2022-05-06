<template>
  <div class="sideBar">
    <nav class="icons">
      <user-avatar />
      <router-link to="/note/1">笔记</router-link>
      <router-link to="/notebook"> 笔记本 </router-link>
      <router-link to="/trash/1">回收站</router-link>
    </nav>
    <div class="logout" @click="onLogout">登出</div>
  </div>
</template>

<script>
import UserAvatar from "./UserAvatar.vue";
import Auth from "@/apis/auth";
export default {
  components: { UserAvatar },
  data() {
    return {};
  },
  methods: {
    onLogout() {
      //和后端交互
      Auth.logout().then((data) => {
        console.log(data);
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
