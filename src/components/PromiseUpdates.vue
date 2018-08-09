<template>
  <main class="account">
      <el-card
        v-for="promiseUpdate in promiseUpdates"
        :key="promiseUpdate.id"
        v-if="promiseUpdates.length > 0"
      >
        <p
          v-for="(value,key) in promiseUpdate"
          :key="key"
        >
          <b>{{ key }}</b>: {{ value }}
        </p>
      </el-card>
      <p v-else>No promise updates.</p>
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
