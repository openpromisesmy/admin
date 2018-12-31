<template>
  <article id="caption-text">
    <h1>Caption Text Generator
              <el-button type="success" v-if="!viewCaption" @click="toggleViewCaption">
                View Caption Text
              </el-button>
              <el-button type="primary" v-else @click="toggleViewCaption">
                Hide Caption Text
                </el-button>
            </h1>
    <div v-if="viewCaption">
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
  </article>
</template>

<script>
import { formatDate } from '@/utils'
export default {
  data: () => ({
    viewCaption: false
  }),
  props: {
    promise: {
      type: Object
    }
  },
  methods: {
    formatDate,
    toggleViewCaption () {
      this.viewCaption = !this.viewCaption
    },
  },
  computed: {
    captionText: function () {
      const { source_date, title, source_name, source_url, id } = this.promise

      return ({// eslint-disable-next-line
        // eslint-disable-next-line
        // eslint-disable-next-line
        source: `Source: ${source_name} - ${source_url}`,
        project_info: 'OpenPromises Malaysia is a Malaysian homegrown non-partisan project. None of our members are affiliated with any of the political parties and our intention of running this project is to increase the quality and integrity of our representatives.',
        cta: 'If you believe in what we do, share this post out.',
        hashtags: '#accountability #neutrality #checkandbalance',
        promise_url: `https://openpromises.com/promises/${id}`
      })
    }
  }
}
</script>

<style>
#caption-text{
  margin: 20px
}

#caption-text > h2 {
  margin: 0
}
</style>


