<template>
  <main id="Promise">
    <p v-if="appStatus === 'loading'">
      <loading-spinner/>
    </p>
    <template v-else>
      <el-row>
        <el-col :xs="24" :sm="8">
          <p>
            <b>Created at:</b>
            {{ formatDate(promise.created_at) }}
          </p>
        </el-col>

        <el-col :xs="24" :sm="8">
          <p>
            <b>Updated at:</b>
            {{ formatDate(promise.updated_at) }}
          </p>
        </el-col>

        <el-col :xs="24" :sm="8">
          <p>
            <b>Contributor:</b>
            {{ contributor.email }}
          </p>
        </el-col>
      </el-row>

      <el-card v-if="promise.list_ids" class="Promise_card_image">
        <p class="card-title">
          <b>List IDs</b>
        </p>
        <p v-for="list_id in promise.list_ids" :key="list_id">{{ list_id }}</p>
      </el-card>

      <el-card class="Promise_Mobile_hero">
        <p class="card-title">{{ politician.name }}</p>
        <h2 id="promiseTitle">{{ promise.title }}</h2>
        <button class="el-button" @click="copyTitle()">Copy Title</button>
        <p class="Promise_Mobile_date">{{ formatDate(promise.source_date) }}</p>
      </el-card>

      <el-card class="Promise_Mobile_quote">
        <p class="card-title">
          <b>Quote</b>
        </p>
        <p>{{ promise.quote }}</p>
        <a :href="promise.source_url" target="_blank">
          <p class="quote_source_link">Source: {{ promise.source_name }}</p>
        </a>
      </el-card>

      <el-card>
        <p class="card-title">
          <b>Context</b>
        </p>
        <p>{{ promise.context || '-' }}</p>

        <p class="card-title">
          <b>Elaboration</b>
        </p>
        <p>{{ promise.elaboration || '-' }}</p>
      </el-card>

      <el-card>
        <el-row>
          <el-col :span="12">
            <p class="card-title">
              <b>Deadline</b>
            </p>
            <p>{{ formatDate(promise.deadline) || '-' }}</p>
          </el-col>

          <el-col :span="12">
            <p class="card-title">
              <b>Status</b>
            </p>
            <p>{{ promise.status || 'Review Needed' }}</p>
          </el-col>
        </el-row>
      </el-card>

      <el-card>
        <el-row>
          <el-col :span="12">
            <p class="card-title">
              <b>State</b>
            </p>
            <p>{{ promise.state || '-' }}</p>
          </el-col>
          <el-col :span="12">
            <p class="card-title">
              <b>Category</b>
            </p>
            <p>{{ promise.category || '-' }}</p>
          </el-col>
        </el-row>
      </el-card>

      <el-card v-if="promise.clauses">
        <template v-if="promise.clauses.fulfilled">
          <p class="card-title">
            <b>Fulfilled Clause</b>
          </p>
          <p>{{ promise.clauses.fulfilled }}</p>
        </template>
        <template v-if="promise.clauses.broken">
          <p class="card-title">
            <b>Broken Clause</b>
          </p>
          <p>{{ promise.clauses.broken }}</p>
        </template>
      </el-card>

      <el-card v-if="promise.cover_image" class="Promise_card_image">
        <p class="card-title">
          <b>Image</b>
        </p>
        <img :src="promise.cover_image">
      </el-card>

      <el-card>
        <post-caption-generator :promise="promise"/>
      </el-card>

      <promise-updates :promiseUpdates="promiseUpdates" :promiseID="promise.id" mode="view"/>

      <router-link :to="'/promises/' + promise.id + '/edit'">
        <floating-action-button text="Edit" type="success" />
      </router-link>
    </template>
  </main>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner'
import FloatingActionButton from '@/components/FloatingActionButton'
import { formatDate, copyById } from '@/utils'
import {
  getPromise,
  getPolitician,
  listPromiseUpdates,
  getContributor
} from '@/api'
import PromiseUpdates from '@/components/PromiseUpdates'
import PostCaptionGenerator from '@/components/PostCaptionGenerator'

export default {
  name: 'Promise',
  components: {
    FloatingActionButton,
    LoadingSpinner,
    PostCaptionGenerator,
    PromiseUpdates
  },
  data () {
    return {
      appStatus: 'loading',
      politician: null,
      promise: null,
      promiseUpdates: [],
      contributor: {}
    }
  },
  methods: {
    formatDate,
    copyTitle () {
      copyById('promiseTitle')
      this.$toast.success(
        `Title copied to your clipboad! - ${this.promise.title}`
      )
    }
  },
  computed: {
    displayedValues () {
      let data = { ...this.promise }
      return {
        'Source Date': formatDate(data.source_date),
        'Source URL': data.source_url,
        'Source Name': data.source_name,
        Status: data.status,
        Category: data.category,
        Quote: data.quote
      }
    }
  },
  async created () {
    try {
      this.promise = await getPromise(this.$route.params.id)
      this.promiseUpdates = await listPromiseUpdates(
        `?promise_id=${this.$route.params.id}&orderBy=source_date`
      )
      this.politician = await getPolitician(this.promise.politician_id)
      this.contributor = await getContributor(this.promise.contributor_id)
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
  max-width: 900px;
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
  text-align: right;
}

.quote_source_link {
  text-align: right;
}

.el-card {
  margin-bottom: 10px;
}

.card-title {
  text-align: left;
}

.Promise_card_image img {
  display: block;
  margin: 0 auto;
  width: 50%;
  text-align: center;
  border-radius: 5%;
}
</style>
