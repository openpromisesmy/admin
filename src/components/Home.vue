<template>
  <div class="home">
    <h1>Home</h1>
    <router-link to="/promises">Promises</router-link>
    <router-link to="/politicians">Politicians</router-link>
    <router-link to="/contributors">Contributors</router-link>
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
</style>
