<template>
  <div class="container">
    <template v-if="appStatus === 'loading'">
      <LoadingSpinner/>
    </template>
    <template v-else>
      <h1>{{ list.title }}</h1>
      <promises-table :promises="promises" exclude="[source_name, politician_name]"/>
    </template>
  </div>
</template>

<script>
import { getList, getPromise } from '@/api'
import PromisesTable from '@/components/PromisesTable'
import LoadingSpinner from '@/components//LoadingSpinner'

export default {
  name: 'List',
  data () {
    return {
      appStatus: '',
      list: {},
      promises: []
    }
  },
  components: { LoadingSpinner, PromisesTable },
  async created () {
    try {
      this.appStatus = 'loading'
      this.list = await this.getListHandler(this.$route.params.id)
      this.list.promise_ids.forEach(async promise_id => {
        this.promises.push(await getPromise(promise_id))
      })
      this.appStatus = ''
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    async getListHandler (id) {
      return await getList(id)
    },
    async getPromiseHandler (id) {
      return await getPromise(id)
    }
  }
}
</script>

<style scoped>
</style>
