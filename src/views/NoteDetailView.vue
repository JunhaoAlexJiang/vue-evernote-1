<template>
  <div class="noteDetail">
    <note-sidebar />
    <note-detail />
  </div>
</template>

<script>
import auth from "@/apis/auth";
import NoteSidebar from "@/components/NoteSidebar.vue";
import NoteDetail from "@/components/NoteDetail.vue";
export default {
  components: { NoteSidebar, NoteDetail },
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
