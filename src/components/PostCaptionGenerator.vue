<template>
  <collapsible-card title="PROMISE MADE Caption">
    <div id="caption-text">
        <p><b>PROMISE MADE:</b> {{ promise.title }}</p>
        <p v-if="promise.description"><b>DESCRIPTION:</b> {{ promise.description }}</p>
        <p v-if="promise.elaboration"><b>ELABORATION:</b> {{ promise.elaboration }}</p>
        <p v-if="promise.context"><b>CONTEXT:</b> {{ promise.context }}</p>
        <p v-if="promise.clauses.broken"><b>BROKEN CLAUSE:</b> {{ promise.clauses.broken }}</p>
        <p>{{ captionText.project_info }}</p>
        <p>{{ captionText.cta }}</p>
        <p> Sources:</p>
        <p> {{ promise.source_name }} -
          <a :href="promise.source_url"> {{ promise.source_url }}</a>
        </p>
        <p>{{ captionText.hashtags }}</p>
        <p>View this promise on our website at {{captionText.promise_url}}</p>
    </div>
  </collapsible-card>
</template>

<script>
import { formatDate } from '@/utils'
import CollapsibleCard from '@/components/CollapsibleCard'

export default {
  components: { CollapsibleCard },
  props: {
    promise: {
      type: Object
    }
  },
  methods: {
    formatDate
  },
  computed: {
    captionText: function () {
      const { id } = this.promise

      return ({
        project_info: 'OpenPromises Malaysia is a Malaysian homegrown non-partisan project. None of our members are affiliated with any of the political parties and our intention of running this project is to increase the quality and integrity of our representatives.',
        cta: 'If you believe in what we do, share this post out.',
        hashtags: '#accountability #neutrality #checkandbalance',
        promise_url: `https://openpromises.com/promises/${id}`
      })
    }
  }
}
</script>

<style scoped>
#caption-text{
  margin: 20px
}
</style>
