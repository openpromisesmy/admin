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

    <template v-if="appStatus === 'loading'">
      <p>Loading promises...This will take 2-4 seconds.</p>
      <LoadingSpinner />
      </template>
    <template v-else>
    <div class="stats_container">
    <el-button type="info" class="add-button" @click="resetFilter()">Reset Filter</el-button>
    <el-button v-for="stat in stats" :key="stat.value" @click="filterPromisesByStatus(stat.value)">
      <b>{{ stat.value }}</b> {{ stat.number }}
    </el-button>
    </div>
    <!-- <el-button v-if="pageNumber > 1" type="primary" @click="previousPage()">
      Previous Page
    </el-button> -->
    <span><b>{{ pageNumber }}</b></span>
    <el-button type="primary" @click="nextPage()">
      Next Page
    </el-button>
    <p>Pagination is based on {{ this.query.orderBy }}</p>

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
import { formatDate, filterByStatus, parsePromises } from '@/utils'
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
    },
    queryString: function () {
      return queryString.stringify(this.query)
    }
  },
  async created () {
    try {
      this.appStatus = 'loading'
      this.politicians = await listPoliticians()
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
      this.filteredPromises = [...this.promises]
      this.appStatus = ''
    },
    parsePromises,
    filterPromisesByStatus (status) {
      this.filteredPromises = filterByStatus(this.promises, status)
    },
    resetFilter () {
      this.filteredPromises = [...this.promises]
    },
    formatDate,
    updateStartAfter (reverse) {
      if (this.pageNumber === 1) delete this.query.startAfter

      if (this.pageNumber > 1) {
        this.query.startAfter = reverse ? this.promises[this.promises.length - 1][this.query.orderBy] : this.promises[0][this.query.orderBy]
      }
    },
    nextPage () {
      this.pageNumber++
      this.query.reverse = true
      this.updateQuery()
    },
    previousPage () {
      if (this.pageNumber === 1) return
      this.pageNumber--
      this.query.reverse = false
      this.updateQuery()
    },
    updateQuery (obj) {
      this.query = { ...this.query, ...obj }
      this.updateStartAfter(this.query.reverse)
      this.listPromisesHandler(this.queryString)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stats_container {
  margin: 0 0 20px
}
</style>
