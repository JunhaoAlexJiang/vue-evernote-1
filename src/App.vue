<template>
  <div id="app">
    <side-bar />
    <router-view />
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";

export default {
  components: { SideBar },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
ul,
li {
  list-style: none;
}
</style>
