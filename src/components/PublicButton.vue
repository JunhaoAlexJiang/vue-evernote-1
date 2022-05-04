<template>
  <div class="button">
    {{ content }}
  </div>
</template>

<script>
export default {
  props: {
    content: String,
  },
};
</script>

<style lang="scss" scoped>
.button {
  background-color: #2bb964;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-weight: bold;
  color: #fff;
  border-radius: 4px;
  margin-top: 18px;
  cursor: pointer;
}
</style>
