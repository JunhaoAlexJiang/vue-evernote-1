<template>
  <note-list />
</template>

<script>
import auth from "@/apis/auth";
import NoteList from "@/components/NoteList.vue";

export default {
  components: { NoteList },
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

<style lang="scss" scoped></style>
