<template>
  <div id="noteDetail">
    <note-sidebar :note.sync="notes" />
    <div class="note-detail">
      <div class="note-bar">
        <div class="msg">
          <span> 创建日期: {{ curNote.createdAtFriendly }}</span>
          <span> 更新日期: {{ curNote.updatedAtFriendly }}</span>
          <span> {{ statusText }}</span>
        </div>
        <div class="icon">
          <span
            class="iconFont el-icon-delete"
            title="删除笔记"
            @click="deleteNote"
          ></span>
          <span
            class="iconFont el-icon-full-screen"
            @click="isShowPreview = !isShowPreview"
            title="预览笔记"
          ></span>
        </div>
      </div>
      <div class="note-title">
        <input
          type="text"
          v-model="curNote.title"
          @input="updateNote"
          @keydown="statusText = '正在输入...'"
          placeholder="输入标题"
        />
      </div>
      <div class="editor">
        <textarea
          v-show="!isShowPreview"
          v-model="curNote.content"
          @input="updateNote"
          @keydown="statusText = '正在输入...'"
          placeholder="输入内容, 支持 markdown 语法"
        ></textarea>
        <div
          class="preview markdown-body"
          v-html="previewContent"
          v-show="isShowPreview"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "@/apis/auth";
import _ from "lodash";
import NoteSidebar from "@/components/NoteSidebar.vue";
import Notes from "@/apis/note";
import Bus from "@/helper/bus";
import MarkdownIt from "markdown-it";

let md = new MarkdownIt();

export default {
  components: { NoteSidebar },
  data() {
    return {
      curNote: {},
      notes: [],
      statusText: "",
      isShowPreview: false,
    };
  },

  created() {
    auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });

    Bus.$once("update:note", (value) => {
      this.curNote =
        value.find((note) => note.id == this.$route.query.noteId) || {};
    });
  },

  watch: {
    notes() {
      if (this.notes.length !== 0) {
        this.curNote = this.notes[0];
      } else {
        this.curNote = {};
      }
    },
  },

  computed: {
    previewContent() {
      return md.render(this.curNote.content || "");
    },
  },

  beforeRouteUpdate(to, from, next) {
    this.curNote = this.notes.find((note) => note.id == to.query.noteId) || {};
    next();
  },

  methods: {
    updateNote: _.debounce(function () {
      Notes.updateNote(
        { noteId: this.curNote.id },
        { title: this.curNote.title, content: this.curNote.content }
      )
        .then(() => {
          this.statusText = "已保存";
        })
        .catch(() => {
          this.statusText = "保存出错";
        });
    }, 300),

    deleteNote() {
      Notes.deleteNote({ noteId: this.curNote.id }).then((data) => {
        this.$message.success(data.msg);
        this.notes.splice(this.notes.indexOf(this.curNote), 1);
        this.$router.replace({ path: "/note" });
      });
    },
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

.markdown-body {
  ::v-deep * {
    text-align: left;
  }
}
</style>
