<template>
    <el-card id="shortcuts">
        <div slot="header" class="clearfix">
          <b>General Stats</b>
        </div>
          <b>Politicians</b>
          <p v-for="(value, key) in generalStats.politicians" :key="key">
              {{ key }}: {{ value }}
          </p>
          <b>Promises</b>
            <pre>{{ JSON.stringify(generalStats.promises, null, 2) }}</pre>
          <p>by status:</p>
          <p v-for="(value, key) in generalStats.promises.countByStatus" :key="key">
              {{ key }}: {{ value }}
          </p>
    </el-card>
</template>

<script>
export default {
  name: 'GeneralStats',
  props: ['generalStats']
}
</script>

<style scoped>
</style>
