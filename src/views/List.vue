<template>
  <div class="container">
    <template v-if="appStatus === 'loading'">
      <LoadingSpinner/>
    </template>
    <template v-else>
      <h1>{{ list.title }}</h1>
      <p>{{ list.description }}</p>
      <promises-table :promises="promises" :exclude="['source_name', 'politician_name']"/>
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
      appStatus: 'loading',
      list: {},
      promises: []
    }
  },
  components: { LoadingSpinner, PromisesTable },
  async created () {
    try {
      this.list = await this.getListHandler(this.$route.params.id)
      this.list.promise_ids.forEach(async promiseId => {
        const promise = await getPromise(promiseId)
        if (promise) {
          this.promises.push(promise)
          this.appStatus = '' // show loading up until first promise is loaded
        } else {
          console.error(`promise with ID ${promiseId} is undefined`)
        }
      })
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    async getListHandler (id) {
      return getList(id)
    },
    async getPromiseHandler (id) {
      return getPromise(id)
    }
  }
}
</script>

<style scoped>
</style>
