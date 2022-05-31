<template>
  <div class="noteDetailView">
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
    return {};
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
.noteDetailView {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>
