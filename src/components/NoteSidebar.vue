<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="addNote">添加笔记</span>
    <el-dropdown
      class="notebook-title"
      @command="handleCommand"
      placement="bottom"
    >
      <span class="el-dropdown-link">
        {{ curBook.title }}<i class="el-icon-arrow-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="notebook in notebooks"
          :key="notebook.id"
          :command="notebook.id"
          >{{ notebook.title }}</el-dropdown-item
        >
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes" :key="note.id">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="date">{{ note.updatedAtFriendly }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Notebooks from "@/apis/notebooks";
import Notes from "@/apis/note";
import Bus from "@/helper/bus";

export default {
  created() {
    Notebooks.getALL().then((res) => {
      this.notebooks = res.data;
      this.curBook =
        this.notebooks.find(
          (notebook) => notebook.id == this.$route.query.notebookId
        ) ||
        this.notebooks[0] ||
        {};
      return Notes.getALL({ notebookId: this.curBook.id }).then((res) => {
        this.notes = res.data;
        this.$emit("update:note", this.notes);
        Bus.$emit("update:note", this.notes);
      });
    });
  },

  data() {
    return {
      notebooks: [],
      notes: [],
      curBook: {},
    };
  },

  methods: {
    handleCommand(notebookId) {
      if (notebookId === "trash") {
        return this.$router.push({ path: "/trash" });
      }
      this.curBook = this.notebooks.find(
        (notebook) => notebook.id == notebookId
      );
      Notes.getALL({ notebookId }).then((res) => {
        this.notes = res.data;
        this.$emit("update:note", this.notes);
      });
    },

    addNote() {
      Notes.addNotebook({ notebookId: this.curBook.id }).then((res) => {
        this.notes.unshift(res.data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/CSS/note-sidebar.scss";
</style>
