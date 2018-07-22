<template>
  <el-card id="Politician_stats">
    <b>Promise Statistics:</b>
    <el-button v-for="stat in stats" :key="stat.value">
    <b>{{ stat.value }}</b> {{ stat.number }}
    </el-button>
  </el-card>
</template>

<script>
import { generateStats } from '@/utils'

export default {
  name: 'PromiseStatsWidget',
  props: [ 'promises' ],
  computed: {
    stats: function () {
      return generateStats(this.promises)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
