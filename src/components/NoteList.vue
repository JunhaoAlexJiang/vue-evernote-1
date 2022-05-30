<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click="onAddNote">
        <i class="el-icon-plus"></i>新建笔记本
      </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{ noteList.length }})</h3>
        <div class="book-list">
          <router-link
            v-for="notebook in noteList"
            :key="notebook.id"
            :to="`/note?notebookId=${notebook.id}`"
            class="notebook"
          >
            <div>
              <span class="el-icon-notebook-2"></span>
              {{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)"
                >编辑</span
              >
              <span class="action" @click.stop.prevent="onDelete(notebook)"
                >删除</span
              >
              <span class="date">{{ notebook.friendlyCreatedAt }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import notebooks from "@/apis/notebooks";
import { friendlyDate } from "@/helper/time";

export default {
  data() {
    return {
      noteList: [],
    };
  },
  created() {
    //渲染数据库数据
    notebooks.getALL().then((res) => {
      this.noteList = res.data;
      console.log(res.data);
    });
  },
  methods: {
    //新增笔记按钮功能实现
    onAddNote() {
      let title = "";

      this.$prompt("输入笔记本标题", "创建笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: "标题不能为空,且不超过30个字符",
      })
        .then(({ value }) => {
          title = value;
          return notebooks.addNotebook({ title });
        })
        .then((res) => {
          res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt);
          this.noteList.unshift(res.data);
          this.$message({
            type: "success",
            message: res.msg,
          });
        });
    },

    //编辑笔记按钮功能实现
    onEdit(notebook) {
      let title = "";
      this.$prompt("输入新的笔记本标题", "修改笔记本标题", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputValue: notebook.title,
        inputErrorMessage: "标题不能为空,且不超过30个字符",
      })
        .then(({ value }) => {
          title = value;
          return notebooks.updateNotebook(notebook.id, { title });
        })
        .then((res) => {
          notebook.title = title;
          this.$message({
            type: "success",
            message: res.msg,
          });
        });
    },

    //删除笔记按钮功能实现
    onDelete(notebook) {
      this.$confirm("删除该笔记,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        notebooks.deleteNotebook(notebook.id).then(() => {
          this.noteList.splice(this.noteList.indexOf(notebook), 1);
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#notebook-list {
  text-align: left;
  background: rgb(238, 238, 238);
  flex: 1;

  .btn {
    background: #fff;
    padding: 6px;
    font-size: 12px;
    color: #666;
    cursor: pointer;
    margin-left: 10px;
  }
  .btn .iconFont {
    font-size: 12px;
  }

  input {
    width: 300px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 3px 5px;
    outline: none;
  }

  header {
    padding: 12px;
    border-bottom: 1px solid #ccc;
  }

  main {
    padding: 30px 40px;
  }
  .layout {
    max-width: 966px;
    margin: 0 auto;
  }

  main h3 {
    font-size: 12px;
    color: #000;
  }

  main .book-list {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
    background-color: #fff;
    border-radius: 4px;
    font-weight: bold;
  }
  main .book-list span {
    font-size: 12px;
    font-weight: bold;
    color: #b3c0c8;
  }
  main .date,
  main .action {
    float: right;
    margin-left: 10px;
  }
  main .iconFont {
    color: #1687ea;
    margin-right: 4px;
  }
  main .notebook {
    display: block;
    cursor: pointer;
  }
  main a.notebook:hover {
    background-color: #f7fafd;
  }

  main a.notebook div {
    border-bottom: 1px solid #ebebeb;
    padding: 12px 14px;
  }

  main .error-msg {
    font-size: 12px;
    color: red;
  }
}
</style>
