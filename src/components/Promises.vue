<template>
  <div>
    <h1>Promises {{ promises.length > 0 ? `- ${promises.length}` : 0 }}</h1>
    <p v-if="promises.length === 0">Loading promises...</p>
    <el-table
    v-else
    :data="promises"
    border
    style="width: 100%">
    <el-table-column
      prop="title"
      label="Title"
      width="220">
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
</style>
