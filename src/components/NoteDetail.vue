<template>
  <div class="noteDetail">
    <h1>{{ msg }}:{{ $route.params.noteId }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "笔记页详情",
    };
  },
};
</script>

<style lang="scss" scoped></style>
