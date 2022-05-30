<template>
  <div class="noteDetail">
    <note-sidebar />
    <h1>{{ msg }}:{{ $route.query.notebookId }}</h1>
  </div>
</template>

<script>
import auth from "@/apis/auth";
import NoteSidebar from "@/components/NoteSidebar.vue";
export default {
  components: { NoteSidebar },
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

<style lang="scss" scoped>
.noteDetail {
  display: flex;
}
</style>
