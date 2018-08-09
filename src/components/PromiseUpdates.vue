<template>
  <main class="account">
      <el-card v-for="promiseUpdate in promiseUpdates" :key="promiseUpdate.id">
        <p v-for="(value,key) in promiseUpdate" :key="key"><b>{{ key }}</b>: {{ value }}</p>
      </el-card>
  </main>
</template>

<script>
export default {
  name: 'PromiseUpdates',
  props: ['promiseUpdates']
}
</script>

<style scoped>
</style>
