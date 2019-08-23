<template>
  <div class="container">
    <template v-if="appStatus === 'loading'">
      <LoadingSpinner />
    </template>
    <template v-else>
      <el-card>
        <h1>{{ list.name }}</h1>
        <p>
          <b>url:</b>
          <a :href="list.url">{{ list.url }}</a>
        </p>
        <p>
          <b>description:</b>
          {{ list.description }}
        </p>
      </el-card>
      <h2>Promises in this document:</h2>
      <promises-table :promises="promises" :exclude="['source_name', 'politician_name']" />
    </template>
  </div>
</template>

<script>
import { getDocument } from '@/api'
import PromisesTable from '@/components/PromisesTable'
import LoadingSpinner from '@/components/LoadingSpinner'

export default {
  name: 'List',
  data () {
    return {
      appStatus: '',
      document: undefined
    }
  },
  components: { LoadingSpinner, PromisesTable },
  async created () {
    try {
      this.appStatus = 'loading'
      this.list = await this.getDocumentHandler(this.$route.params.id)
      this.appStatus = ''
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    async getDocumentHandler (id) {
      return getDocument(id)
    }
  }
}
</script>

<style scoped>
</style>
