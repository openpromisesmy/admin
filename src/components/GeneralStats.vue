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
          <p>livePromises: {{ generalStats.promises.livePromises }}</p>
          <p>livePromisesByLivePoliticians: {{ generalStats.promises.livePromisesByLivePoliticians }}</p>
          <p>by status:</p>
            <el-button v-for="(value,key) in generalStats.promises.countByStatus" :key="key" @click="filterPromisesByStatus(stat.value)">
                <b>{{ key }}</b> {{ value }}
            </el-button>
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
