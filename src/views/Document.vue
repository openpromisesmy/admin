<template>
  <div class="container">
    <template v-if="appStatus === 'loading'">
      <LoadingSpinner/>
    </template>
    <template v-else>
      <h1>{{ list.name }} </h1>
      <a :href="list.url">{{ list.url }}</a>
      <p>{{ list.description }}</p>
      <promises-table :promises="promises" :exclude="['source_name', 'politician_name']"/>
    </template>
  </div>
</template>

<script>
import { getList, getPromise } from '@/api'
import PromisesTable from '@/components/PromisesTable'
import LoadingSpinner from '@/components/LoadingSpinner'

export default {
  name: 'List',
  data () {
    return {
      appStatus: 'loading',
      list: {
        id: '6m5o7jPjQEryvrLZqnLa',
        name: 'PH Manifesto',
        description: "Pakatan Harapan's manifesto for GE15",
        url: 'https://sadfsadf.com/sadfasdf.pdf'
      },
      promises: []
    }
  },
  components: { LoadingSpinner, PromisesTable },
  async created () {
    // try {
    //   this.list = await this.getListHandler(this.$route.params.id)
    //   if (this.list.promise_ids.length === 0) {
    //     this.appStatus = ''
    //     return
    //   }
    //   this.list.promise_ids.forEach(async promiseId => {
    //     const promise = await getPromise(promiseId)
    //     if (promise) {
    //       this.promises.push(promise)
    //       this.appStatus = '' // show loading up until first promise is loaded
    //     } else {
    //       console.error(`promise with ID ${promiseId} is undefined`)
    //     }
    //   })
    // } catch (e) {
    //   console.error(e)
    // }
    this.appStatus = ''
  },
  methods: {
    // async getListHandler (id) {
    //   return getList(id)
    // },
    // async getPromiseHandler (id) {
    //   return getPromise(id)
    // }
  }
}
</script>

<style scoped>
</style>
