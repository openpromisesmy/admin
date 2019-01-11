<template>
  <el-container>
    <el-header height="150px">
      <h1>Sandbox</h1>
      <p>Use this for building new components in isolation before importing them into their parent components.</p>
    </el-header>
    <el-main>
      <div id="test"/>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped>
.el-header,
.el-footer,
.el-aside {
  text-align: center;
}

.el-main {
  background-color: black;
}

#test {
  height: 100px;
  width: 100px;
  background-color: red;
}
</style>
