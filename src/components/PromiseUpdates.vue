<template>
  <main>
      <promise-update-card
        v-for="promiseUpdate in promiseUpdates"
        :key="promiseUpdate.id"
        :contributors="contributors"
        :promiseUpdate="promiseUpdate"
      />
      <promise-update-editor
        :contributors="contributors"
        :promiseID="promiseID"
        mode="new"
      />
  </main>
</template>

<script>
import PromiseUpdateEditor from '@/components/PromiseUpdateEditor'
import PromiseUpdateCard from '@/components/PromiseUpdateCard'
import { listContributors } from '@/api'

export default {
  name: 'PromiseUpdates',
  props: ['promiseUpdates', 'promiseID', 'mode'],
  components: { PromiseUpdateEditor, PromiseUpdateCard },
  data: () => ({
    contributors: []
  }),
  async created () {
    try {
      this.contributors = await listContributors()
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style scoped>
</style>
