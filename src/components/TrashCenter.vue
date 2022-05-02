<template>
  <div class="trashCenter">
    <h1>{{ msg }}:{{ $route.params.noteId }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "回收站",
    };
  },
};
</script>

<style lang="scss" scoped></style>
