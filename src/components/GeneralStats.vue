<template>
    <main class="container">
    <el-card id="shortcuts">
        <div slot="header" class="clearfix">
          <b>General Stats</b>
        </div>
        <template v-if="appStatus === 'loading'">
          <p>Loading stats...This would take 1-3 seconds.</p>
          <LoadingSpinner />
        </template>
        <div v-else>
          <b>Politicians</b>
          <p v-for="(value, key) in stats.politicians" :key="key">
              {{ key }}: {{ value }}
          </p>
          <b>Promises</b>
          <p>livePromises: {{ stats.promises.livePromises }}</p>
          <p>livePromisesByLivePoliticians: {{ stats.promises.livePromisesByLivePoliticians }}</p>
          <p>by status:</p>
            <el-button v-for="(value,key) in stats.promises.countByStatus" :key="key" @click="filterPromisesByStatus(stat.value)">
                <b>{{ key }}</b> {{ value }}
            </el-button>
        </div>
    </el-card>
    </main>
</template>

<script>
import { getGeneralStats } from '@/api'
import { loadCache, updateCache } from '@/utils'
import LoadingSpinner from '@/components/shared/LoadingSpinner'

export default {
  name: 'GeneralStats',
  components: { LoadingSpinner },
  data () {
    return {
      stats: {},
      appStatus: ''
    }
  },
  async created () {
    try {
      this.appStatus = 'loading'
      this.stats = await loadCache(this, 'stats', getGeneralStats())
      this.appStatus = ''
    } catch (e) {
      alert(e)
    }
  },
  async mounted () {
    try {
      this.stats = await updateCache(this, 'stats', getGeneralStats())
    } catch (e) {
      alert(e)
    }
  }
}

</script>

<style scoped>
</style>
