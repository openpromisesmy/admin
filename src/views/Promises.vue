<template>
  <div class="container">
    <el-row>
      <el-col :span="16">
        <h1>{{ promises.length > 0 ? `${promises.length}` : '' }} Recently Submited/Updated Promises</h1>
        <p>Based on updated_at date</p>
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

    <promises-table :promises="promises" exclude="[source_name]" />
  </template>
  </div>
</template>

<script>
import { listPromises, listPoliticians } from '@/api'
import PromisesTable from '@/components/PromisesTable'
import LoadingSpinner from '@/components/LoadingSpinner'
import { formatDate, parsePromises, loadCache, updateCache } from '@/utils'
import queryString from 'query-string'

export default {
  name: 'Promises',
  data () {
    return {
      pageNumber: 1,
      query: {
        pageSize: 25,
        orderBy: 'updated_at',
        reverse: true
      },
      promises: [],
      politicians: []
    }
  },
  components: { LoadingSpinner, PromisesTable },
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
      this.listPromisesHandler(this.queryString, true)
    }
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
