<template>
  <div>
    <el-row>
      <el-col :span="16">
        <h1>Promises {{ promises.length > 0 ? `- ${promises.length}` : '' }}</h1>
      </el-col>
      <el-col :span="8">
        <router-link to="/promises/new">
          <el-button type="primary" class="add-button">Add Promise</el-button>
        </router-link>
      </el-col>
    </el-row>

    <template v-if="promises.length === 0">
      <p>Loading promises...This will take 3-5 seconds.</p>
      <LoadingSpinner />
      </template>
    <template v-else>
      <div class="stats_container">
    <el-button v-for="stat in stats" :key="stat.value" @click="filterPromisesByStatus(stat.value)">
      <b>{{ stat.value }}</b> {{ stat.number }}
    </el-button>
    </div>
    <el-table
    :data="filteredPromises"
    :default-sort = "{prop: 'created_at', order: 'descending'}"
    border
    style="width: 100%">
    <el-table-column
      sortable
      prop="created_at"
      label="Created At"
      width="150">
      <template slot-scope="scope">
        <p>{{ formatDate(scope.row.created_at) }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="title"
      label="Title"
      width="350">
    </el-table-column>
    <el-table-column
      sortable
      prop="source_date"
      label="Source Date"
      width="150">
      <template slot-scope="scope">
        <p>{{ formatDate(scope.row.source_date) }}</p>
      </template>
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
    <el-table-column
      sortable
      label="Actions"
      width="125">
      <template slot-scope="scope">
        <router-link :to="'/promises/' + scope.row.id + '/edit'">
          <el-button type="info">
          Edit
          </el-button>
        </router-link>
      </template>
    </el-table-column>
  </el-table>
  </template>
  </div>
</template>

<script>
import { listPromises, listPoliticians } from '@/api'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import { formatDate, filterByStatus } from '@/utils'
import queryString from 'query-string'

export default {
  name: 'Promises',
  data () {
    return {
      pageNumber: 1,
      query: {
        pageSize: 25,
        orderBy: 'source_date',
        reverse: true
      },
      promises: [],
      filteredPromises: [],
      politicians: []
    }
  },
  components: { LoadingSpinner },
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
      const query = queryString.stringify(this.query);
      console.log(query)
      const promises = await listPromises(query)
      const politicians = await listPoliticians()
      this.politicians = politicians
      this.promises = this.parsePromises(promises, politicians)
      this.filteredPromises = [...this.promises]
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    parsePromises: (promises, politicians) =>
      promises.map(promise => ({
        ...promise,
        status: promise.status,
        politician_name: politicians.find(
          politician => politician.id === promise.politician_id
        ).name
      })),
    filterPromisesByStatus (status) {
      this.filteredPromises = filterByStatus(this.promises, status)
    },
    formatDate
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stats_container {
  margin: 0 0 20px
}
</style>
