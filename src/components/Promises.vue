<template>
  <div>
    <h1>Promises {{ promises.length > 0 ? `- ${promises.length}` : 0 }}</h1>
    <p v-if="promises.length === 0">Loading promises...</p>
    <template v-else>
      <div class="stats_container">
    <el-button v-for="stat in stats" :key="stat.value"><b>{{ stat.value }}</b> {{ stat.number }} </el-button>
    </div>
    <el-table
    :data="promises"
    border
    style="width: 100%">
    <el-table-column
      prop="title"
      label="Title"
      width="350">
    </el-table-column>
    <el-table-column
      prop="source_date"
      label="Date"
      width="150">
    </el-table-column>
    <el-table-column
      prop="category"
      label="Category"
      width="180">
    </el-table-column>
    <el-table-column
      prop="politician_name"
      label="Politician"
      width="150">
    </el-table-column>
    <!-- <el-table-column
      prop="quote"
      label="Quote"
      width="250">
    </el-table-column> -->
    <el-table-column
      prop="source_name"
      label="Source"
      width="180"
      >
    </el-table-column>
    <!-- <el-table-column
      prop="source_url"
      label="Source Link"
      width="100">
      <template slot-scope="scope">
        <a :href="scope.row.source_url" target="_blank">View Source</a>
      </template>
    </el-table-column> -->
    <el-table-column
      sortable
      prop="status"
      label="Status"
      width="125">
    </el-table-column>
  </el-table>
  </template>
  </div>
</template>

<script>
import { listPromises, listPoliticians } from '@/api'
import moment from 'moment'

export default {
  name: 'Promises',
  data () {
    return {
      promises: [],
      politicians: []
    }
  },
  computed: {
    stats: function () {
      const statusOptions = new Set(this.promises.map(promise => promise.status))
      const stats = []
      statusOptions.forEach(statusOption => {
        const hits = this.promises.filter(promise => promise.status === statusOption)
        stats.push({ value: statusOption || 'undefined', number: hits.length })
      })
      return stats
    }
  },
  async created () {
    try {
      const promises = await listPromises()
      const politicians = await listPoliticians()
      this.politicians = politicians
      this.promises = this.parsePromises(promises, politicians)
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    parsePromises: (promises, politicians) =>
      promises.map(promise => ({
        ...promise,
        status: promise.status,
        source_date: moment(promise.source_date).format('D MMMM YYYY'),
        politician_name: politicians.find(
          politician => politician.id === promise.politician_id
        ).name
      }))
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stats_container {
  margin: 0 0 20px
}
</style>
