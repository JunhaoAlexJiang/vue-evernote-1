<template>
  <div class="noteDetail">
    <h1>{{ msg }}:{{ $route.query.noteId }}</h1>
  </div>
</template>

<script>
import auth from "@/apis/auth";
export default {
  data() {
    return {
      msg: "笔记页详情",
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
