<template>
<main id="Politician">
    <template v-if="politician === 'loading'">
      <p>Loading politician...</p>
    </template>
    <template v-else>
      <politician-details v-bind="{ politician }" />
    </template>
    <template v-if="promises === 'loading'">
      <p>Loading promises...This will take 2-4 seconds.</p>
      <LoadingSpinner />
    </template>
    <template v-else>
    <h2>Promises by {{ politician.name }}</h2>
    <el-card id="Politician_stats">
      <b>Promise Statistics:</b>
      <el-button v-for="stat in stats" :key="stat.value">
        <b>{{ stat.value }}</b> {{ stat.number }}
      </el-button>
    </el-card>
    <el-table
      :data="promises"
      border
      style="width: 100%">
    <el-table-column
      prop="live"
      label="Live"
      width="125">
      <template slot-scope="scope">
        <el-button v-if="scope.row.live" type="success" icon="el-icon-check" circle></el-button>
        <span v-else>
          {{ scope.row.live.toString() }}
        </span>
      </template>
    </el-table-column>
    <el-table-column
      sortable
      prop="created_at"
      label="Created Date"
    >
    </el-table-column>
    <el-table-column
      prop="title"
      label="Title">
      <template slot-scope="scope">
        <router-link :to="'/promises/' + scope.row.id">{{ scope.row.title }}</router-link>
      </template>
    </el-table-column>
    <el-table-column
      sortable
      prop="source_date"
      label="Source Date"
      width="150">
    </el-table-column>
    <el-table-column
      prop="category"
      label="Category"
      width="180">
    </el-table-column>
    <el-table-column
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
  </main>
</template>

<script>
import { getPolitician, listPoliticianPromises } from '@/api'
import { generateStats, formatDate } from '@/utils'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import PoliticianDetails from '@/components/PoliticianDetails'

export default {
  name: 'Politician',
  components: { LoadingSpinner, PoliticianDetails },
  data () {
    return {
      politician: 'loading',
      promises: 'loading'
    }
  },
  computed: {
    stats: function () {
      return generateStats(this.promises)
    }
  },
  methods: {
    parsePromises: (promises, politicians) => promises.map(promise =>
      ({
        ...promise,
        status: promise.status ? promise.status : 'Review Needed',
        created_at: formatDate(promise.created_at),
        source_date: formatDate(promise.source_date)
      })
    )
  },
  async created () {
    try {
      this.politician = await getPolitician(this.$route.params.id)
      const promises = await listPoliticianPromises(this.$route.params.id)
      this.promises = this.parsePromises(promises)
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image {
  min-width: 30%;
  display: inline-block;
  object-fit: cover; /* Do not scale the image */
  object-position: top; /* Center the image within the element */
  height: 300px;
}

#politicians p b {
  display: inline-block
}
</style>
