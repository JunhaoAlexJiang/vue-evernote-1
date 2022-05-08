<template>
  <div class="noteList">
    <h1>
      {{ msg }}
    </h1>
    <ul>
      <li>
        <router-link to="/note/1"> 笔记1 </router-link>
      </li>
      <li>
        <router-link to="/note/2"> 笔记2 </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import auth from "@/apis/auth";

export default {
  data() {
    return {
      msg: "笔记列表",
    };
  },
  created() {
    auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
  },
};
</script>

<style lang="scss" scoped></style>
