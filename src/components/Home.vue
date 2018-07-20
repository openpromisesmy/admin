<template>
  <div class="home">
    <h1>OpenPromises Tracking Dashboard</h1>
    <h2 id="slogan">"Shifting Malaysia's political culture, one promise at a time."</h2>
    <router-link to="/promises">
      <el-button type="default"> Promises </el-button>
    </router-link>
    <router-link to="/politicians">
      <el-button type="default"> Politicians </el-button>
    </router-link>
    <router-link to="/contributors">
      <el-button type="default"> Contributors </el-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#slogan {
  font-weight: 300
}
</style>
