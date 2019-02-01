<template>
  <div id="app">
    <div id="nav">
      <!-- router-link 定义点击后导航到哪个路径下 -->
      <router-link to="/home">首页</router-link> |
      <router-link to="/about">关于</router-link> |
      <router-link to="/">简写首页</router-link><br />
      <router-link to="/post/1.html">ID文章</router-link> |
      <router-link to="/post/my-post.html">别名文章</router-link> |
      <router-link to="/p/small-post.html">简写文章</router-link><br />
      <router-link to="/category/category1">分类</router-link> |
      <router-link to="/cat/cat2">简写分类</router-link> |
      <router-link to="/c/c3">超短分类</router-link>
    </div>
    <!-- 对应的组件内容渲染到router-view中 -->
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Microsoft YaHei", sans-serif, "Avenir", Helvetica, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  text-align: center;
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
