<template>
  <article>
    <el-card>
      <div slot="header">
        {{ promiseUpdate.status }} | {{ formatDate(promiseUpdate.source_date) }}
      </div>
      <p>
      </p>
      <h1> {{ promiseUpdate.title }}</h1>
      <p>Description: {{ promiseUpdate.description }}</p>
      <p>Notes: <i>{{ promiseUpdate.notes }}</i></p>
      <p>Quote: {{ promiseUpdate.quote }}</p>
      <p>
        Source: <a :href="promiseUpdate.source_url"> {{ promiseUpdate.source_name }}</a>
      </p>
    </el-card>
  </article>
</template>

<script>
import { formatDate } from '@/utils'
export default {
  name: 'PromiseUpdateCard',
  props: ['promiseUpdate'],
  methods: {
    formatDate
  }
}
</script>

<style scoped>
</style>
