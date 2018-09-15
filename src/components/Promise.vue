<template>
  <main id="Promise">
    <p v-if="appStatus === 'loading'">
      Loading ...
    </p>
    <template v-else>

      <el-card class="Promise_Mobile_hero">
        <p class="card-title">{{ politician.name }}</p>
        <h2>{{ promise.title }}</h2>
        <p class="Promise_Mobile_date">{{ formatDate(promise.source_date) }}</p>
      </el-card>

      <el-card class="Promise_Mobile_quote">
        <p class="card-title"> <b> Quote </b></p>
        <p> {{ promise.quote }} </p>
        <a :href="promise.source_url" target="_blank">
          <p class="quote_source_link" >Source: {{ promise.source_name }} </p>
        </a>
      </el-card>

      <el-card>
        <p class="card-title"> <b> Category </b></p>
        <p> {{ promise.category }} </p>
      </el-card>

      <el-card>
        <p class="card-title"> <b> Status </b></p>
        <p>{{ promise.status || 'Review Needed' }}</p>
      </el-card>

      <el-card v-if="promise.cover_image" class="Promise_card_image">
        <p class="card-title"> <b> Image </b></p>
        <img :src="promise.cover_image" />
      </el-card> 

      <el-button type="success" class="edit-button"> Edit Promise </el-button>

    </template>

  </main>
</template>

<script>
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import { formatDate } from '@/utils'
import { getPromise, getPolitician, listPromiseUpdates } from '@/api'

export default {
  name: 'PromiseDesktop',
  data () {
    return {
      appStatus: 'loading',
      politician: '',
      promise: '',
      promiseUpdates: ''
    }
  },
  methods: { formatDate },
  computed: {
    displayedValues () {
      let data = { ...this.promise }
      return {
        'Source Date': formatDate(data.source_date),
        'Source URL': data.source_url,
        'Source Name': data.source_name,
        'Status': data.status,
        'Category': data.category,
        'Quote': data.quote
      }
    }
  },
  async created () {
    try {
      this.promise = await getPromise(this.$route.params.id)
      this.promiseUpdates = await listPromiseUpdates(`?promise_id=${this.$route.params.id}&orderBy=source_date`)
      this.politician = await getPolitician(this.promise.politician_id)
      this.appStatus = ''
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#Promise {
  max-width: 900px
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.el-row {
  padding: 10px;
}

.el-col {
  border-radius: 4px;
}

.Promise_Mobile_date {
  text-align: right
}

.quote_source_link {
  text-align: right
}

.el-card {
  margin-bottom: 10px
}

.card-title {
  text-align: left
}

.Promise_card_image img {
  display: block;
  margin: 0 auto;
  width: 50%;
  text-align: center;
  border-radius: 5%
}

.edit-button {
  width: 100%;
  padding: 20px;
  font-size: 2rem
}
</style>
