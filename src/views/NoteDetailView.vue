<template>
  <div class="noteDetailView">
    <note-detail />
  </div>
</template>

<script>
import auth from "@/apis/auth";

import NoteDetail from "@/components/NoteDetail.vue";

export default {
  components: { NoteDetail },
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
  width: 100%;
}
</style>
