<template>
  <div class="trashCenter">
    <h1>{{ msg }}:{{ $route.params.noteId }}</h1>
  </div>
</template>

<script>
import auth from "@/apis/auth";

export default {
  data() {
    return {
      msg: "回收站",
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
