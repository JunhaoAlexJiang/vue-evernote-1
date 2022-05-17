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
            v-for="note in noteList"
            :key="note.id"
            to="/note/1"
            class="notebook"
          >
            <div>
              <span class="el-icon-notebook-2"></span>
              {{ note.title }}
              <span>{{ note.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(note)"
                >编辑</span
              >
              <span class="action" @click.stop.prevent="onDelete(note)"
                >删除</span
              >
              <span class="date">{{ note.friendlyCreatedAt }}</span>
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
      console.log(res.data);
      this.noteList = res.data;
    });
  },
  methods: {
    //新增笔记按钮功能实现
    onAddNote() {
      let title = window.prompt("创建笔记本");
      if (title.trim() === "") {
        alert("笔记本名不能为空");
        return;
      }
      notebooks.addNotebook({ title }).then((res) => {
        console.log(res);
        res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt);
        this.noteList.unshift(res.data);
      });
    },

    //编辑笔记按钮功能实现
    onEdit(note) {
      let title = window.prompt("修改标题", note.title);
      notebooks.updateNotebook(note.id, { title }).then(() => {
        note.title = title;
      });
    },

    //删除笔记按钮功能实现
    onDelete(note) {
      let isConfirm = window.confirm("你确定要删除吗?");
      if (isConfirm) {
        notebooks
          .deleteNotebook(note.id)
          .then(() => {
            this.noteList.splice(this.noteList.indexOf(note), 1);
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
