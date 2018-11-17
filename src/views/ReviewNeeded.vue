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

   <promises-table :promises="promises" :exclude="['source_name']"/>
  </template>
  </div>
</template>

<script>
import { listPromises, listPoliticians } from '@/api'
import PromisesTable from '@/components/PromisesTable'
import LoadingSpinner from '@/components//LoadingSpinner'
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
  components: { LoadingSpinner, PromisesTable },
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
