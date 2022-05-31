<template>
  <div class="note-detail">
    <div class="note-bar">
      <div class="msg">
        <span> 创建日期: {{ curNote.createdAtFriendly }}</span>
        <span> 更新日期: {{ curNote.updatedAtFriendly }}</span>
        <span> {{ curNote.statusText }}</span>
      </div>
      <div class="icon">
        <span class="iconFont el-icon-delete" @click="deleteNote"></span>
        <span
          class="iconFont el-icon-full-screen"
          @click="isShowPreview = !isShowPreview"
        ></span>
      </div>
    </div>
    <div class="note-title">
      <input type="text" :value="curNote.title" placeholder="输入标题" />
    </div>
    <div class="editor">
      <textarea
        v-show="true"
        :value="curNote.content"
        placeholder="输入内容, 支持 markdown 语法"
      ></textarea>
      <div
        class="preview markdown-body"
        v-html="previewContent"
        v-show="false"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curNote: {
        title: "我的笔记",
        content: "笔记内容",
        createdAtFriendly: "1天前",
        updatedAtFriendly: "刚刚",
        statusText: "未更新",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/CSS/note-detail.scss";
</style>
