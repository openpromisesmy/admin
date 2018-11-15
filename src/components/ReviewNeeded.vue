<template>
  <div class="container">
    <el-row>
      <el-col :span="16">
        <h1>Promises that need reviewing {{ promises.length > 0 ? `- ${promises.length}` : '' }}</h1>
      </el-col>
      <el-col :span="8">
        <router-link to="/promises/new">
          <el-button type="primary" class="add-button">Add Promise</el-button>
        </router-link>
      </el-col>
    </el-row>

    <template v-if="appStatus === 'loading'">
      <p>Loading promises...This will take 2-4 seconds.</p>
      <LoadingSpinner />
      </template>
    <template v-else>
    <div class="stats_container">
    </div>

    <el-table
    :data="promises"
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
    <el-table-column
      sortable
      prop="status"
      label="Status"
      width="125">
    </el-table-column>
    <el-table-column
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
import { formatDate, parsePromises, loadCache, updateCache } from '@/utils'
import queryString from 'query-string'

export default {
  name: 'ReviewNeeded',
  data () {
    return {
      query: {
        status: 'Review Needed',
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
    queryString: function () {
      return queryString.stringify(this.query)
    }
  },
  async created () {
    try {
      this.appStatus = 'loading'
      this.politicians = await loadCache(this, 'politicians', listPoliticians())
      this.listPromisesHandler(this.queryString)
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    async listPromisesHandler (queryString) {
      this.appStatus = 'loading'

      const promises = await listPromises(queryString)

      this.promises = this.parsePromises(promises, this.politicians)
      this.appStatus = ''
    },
    parsePromises,
    formatDate
  },
  async mounted () {
    try {
      this.politicians = await updateCache(this, 'politicians', listPoliticians())
    } catch (e) {
      console.error(e)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stats_container {
  margin: 0 0 20px;
}
</style>
