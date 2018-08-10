<template>
  <main>
      <promise-update-card
        v-for="promiseUpdate in promiseUpdates"
        :key="promiseUpdate.id"
        v-if="promiseUpdates.length > 0"
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

export default {
  name: 'PromiseUpdates',
  props: ['promiseUpdates', 'contributors', 'promiseID'],
  components: { PromiseUpdateEditor, PromiseUpdateCard }
}
</script>

<style scoped>
</style>
