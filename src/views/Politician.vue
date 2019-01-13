<template>
<main id="Politician">
    <template v-if="politician === 'loading'">
      <p>Loading politician...</p>
    </template>
    <template v-else>
      <el-row id="main-info">
        <el-col :span="16">
          <politician-details v-bind="{ politician }" />
        </el-col>
        <el-col :span="8">
          <contact-details v-bind="politician.contact_details"/>
        </el-col>
      </el-row>
      <el-row>
          <promise-stats-widget v-if="promises !== 'loading'"
          :promises="promises"/>
      </el-row>
    </template>
    <template v-if="promises === 'loading'">
      <p>Loading promises...This will take 2-4 seconds.</p>
      <LoadingSpinner />
    </template>
    <template v-else>
    <h2>Promises by {{ politician.name }}</h2>
    <promises-table :promises="promises" :exclude="['politician_name', 'source_name']" />
    </template>
  </main>
</template>

<script>
import { getPolitician, listPoliticianPromises } from '@/api'
import { formatDate } from '@/utils'
import LoadingSpinner from '@/components//LoadingSpinner'
import PoliticianDetails from '@/components/PoliticianDetails'
import PromiseStatsWidget from '@/components/PromiseStatsWidget'
import PromisesTable from '@/components/PromisesTable'
import ContactDetails from '@/components/ContactDetails'

export default {
  name: 'Politician',
  components: { LoadingSpinner, PoliticianDetails, PromiseStatsWidget, PromisesTable, ContactDetails },
  data () {
    return {
      politician: 'loading',
      promises: 'loading'
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

#main-info {
  padding: 20px
}
</style>
