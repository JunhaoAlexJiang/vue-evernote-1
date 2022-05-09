<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn"> <i class="iconFont icon-plus"></i>新建笔记本 </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表(10)</h3>
        <div class="book-list">
          <a href="#" class="notebook">
            <div>
              <span class="iconFont icon-notebook"></span>笔记本标题1
              <span>3</span>
              <span class="action">编辑</span>
              <span class="action">删除</span>
              <span class="date">3天前</span>
            </div>
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noteList: [],
    };
  },
};
</script>

<style lang="scss" scoped>
#notebook-list {
  text-align: left;
  background: rgb(238, 238, 238);
  flex: 1;

  .btn {
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
