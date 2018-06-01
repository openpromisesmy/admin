<template>
  <div>
    <h1>Promises</h1>
  </div>
</template>

<script>
import { listPromises } from '@/api'
export default {
  name: 'Promises',
  data () {
    return {
      promises: []
    }
  },
  async created () {
    this.promises = await listPromises()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
