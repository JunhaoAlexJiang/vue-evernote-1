<template>
  <div id="noteDetail">
    <note-sidebar @update:note="(val) => (notes = val)" />
    <div class="note-detail">
      <div class="note-bar">
        <div class="msg">
          <span> 创建日期: {{ curNote.createdAtFriendly }}</span>
          <span> 更新日期: {{ curNote.updatedAtFriendly }}</span>
          <span> {{ curNote.statusText }}</span>
        </div>
        <div class="icon">
          <span class="iconFont el-icon-delete"></span>
          <span class="iconFont el-icon-full-screen"></span>
        </div>
      </div>
      <div class="note-title">
        <input type="text" v-model="curNote.title" placeholder="输入标题" />
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
  </div>
</template>

<script>
import auth from "@/apis/auth";

import NoteSidebar from "@/components/NoteSidebar.vue";

export default {
  components: { NoteSidebar },
  data() {
    return {
      curNote: {},
      notes: [],
    };
  },

  created() {
    auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
  },

  beforeRouteUpdate(to, from, next) {
    this.curNote = this.notes.find((note) => note.id == to.query.noteId) || {};
    next();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/CSS/note-detail.scss";
#noteDetail {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>
