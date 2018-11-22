<template>
  <main id="PromiseEditor">
    <h1 id="PromiseEditor_header">{{ mode }} Promise</h1>
    <template v-if="appStatus === 'loading'">
      <p> Loading {{ mode === 'edit' ? 'promise' : '' }}...</p>
    </template>
    <template v-else-if="appStatus === 'submitting'">
      <p>Submitting promise...</p>
    </template>
    <template v-else-if="appStatus === 'submitted'">
      <p>Promise has been {{ mode === 'edit' ? 'updated' : 'created' }}</p>
      <p>{{ JSON.stringify(result) }}</p>
      <router-link :to="`/promises/${result.id}`">
        <el-button type="primary">
          View Promise
        </el-button>
      </router-link>
    </template>
    <template v-else-if="appStatus === 'error'">
      <p>There has been an error: {{ error }}</p>
    </template>
    <template v-else>
    <el-form v-on:submit.prevent="onSubmit" :rules="rules" label-position="left" label-width="100px" ref="form" :model="promise">
        <el-row >

          <el-col :xs="24" :sm="8" >
            <p><b>Created at: </b>{{ formatDate(promise.created_at) }}</p>
          </el-col>

           <el-col :xs="24" :sm="8" >
            <p><b>Updated at: </b>{{ formatDate(promise.updated_at) }}</p>
          </el-col>

           <el-col :xs="24" :sm="8" >
            <p><b>Contributor: </b>{{ contributor }}</p>
          </el-col>

        <el-col :xs="24" :sm="8" >
              <el-form-item label="Live" prop="live">
            <el-select v-model="promise.live" placeholder="Select">
              <el-option
                v-for="item in liveOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
              </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="8" >
              <el-form-item label="Status" prop="status">
            <el-select v-model="promise.status" placeholder="Select">
              <el-option
                v-for="status in statusOptions"
                :key="status"
                :label="status"
                :value="status">
              </el-option>
            </el-select>
              </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="8" >
              <el-form-item label="State" prop="state">
            <el-select v-model="promise.state" placeholder="Select">
              <el-option
                v-for="state in malaysianStates"
                :key="state"
                :label="state"
                :value="state">
              </el-option>
            </el-select>
              </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" >
              <el-form-item label="Politician" prop="politician_id">
            <el-select v-model="promise.politician_id">
              <el-option
                  default-first-option
                  v-for="politician in politicians"
                  :value="politician.id"
                  :key="politician.id"
                  :label="politician.name"
              >
              </el-option>
            </el-select>
              </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" >
              <el-form-item label="Category" prop="category">
            <el-input type="text" placeholder="enter category. separate using comma" v-model="promise.category"></el-input>
              </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" >
              <el-form-item label="Title" prop="title">
            <el-input type="textarea" placeholder="enter title" v-model="promise.title"></el-input>
              </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" >
              <el-form-item label="Quote" prop="quote">
              <el-input type="textarea"
                        placeholder="enter quote"
                        v-model="promise.quote"
                        rows="5" />
              </el-form-item>
          </el-col>

           <el-col :xs="24" :sm="12" >
              <el-form-item label="Source Name" prop="source_name">
              </el-form-item>
              <el-select v-model="promise.source_name" placeholder="Select Source Name">
                <el-option
                  v-for="source_name in source_names"
                  :key="source_name"
                  :label="source_name"
                  :value="source_name">
                </el-option>
              </el-select>
          </el-col>

         <el-col :xs="24" :sm="12" >
              <el-form-item label="Source Date" prop="source_date">
            <el-date-picker type="date" placeholder="enter source date" v-model="promise.source_date"></el-date-picker>
              </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" >
              <el-form-item label="Source URL" prop="source_url">
            <el-input type="text" placeholder="enter source url" v-model="promise.source_url"></el-input>
              </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" >
              <el-form-item label="Image" prop="cover_image">
            <el-input type="text" placeholder="enter image link" v-model="promise.cover_image"></el-input>
              </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" >
              <el-form-item label="Notes" prop="notes">
            <el-input type="textarea" placeholder="enter notes" v-model="promise.notes" rows="4"></el-input>
              </el-form-item>
          </el-col>

        </el-row>

          <el-button @click="onSubmit"> Submit </el-button>

        </el-form>

        <el-card v-if="appStatus === ''" id="caption-text" class="box-card">
          <h1>Caption Text Generator
            <el-button type="success" v-if="!viewCaption" @click="toggleViewCaption">
              View Caption Text
            </el-button>
            <el-button type="primary" v-else @click="toggleViewCaption">
              Hide Caption Text
              </el-button>
          </h1>
          <div v-if="viewCaption">
            <p>{{ captionText.header }}</p>
            <p>{{ captionText.brief }}</p>
            <p><b>ELABORATION_HERE</b></p>
            <p>{{ captionText.project_info }}</p>
            <p>{{ captionText.cta }}</p>
            <p> Source: {{ promise.source_name }}
              <a :href="promise.source_url"> {{ promise.source_url }}</a>
            </p>
            <p>{{ captionText.hashtags }}</p>
          </div>
        </el-card>

        <promise-updates
          v-if="mode === 'edit'"
          :promiseUpdates="promiseUpdates"
          :contributors="contributors"
          :promiseID="promise.id"
        />

    </template>
</main>
</template>

<script>
import {
  postPromise,
  getPromise,
  listPoliticians,
  listContributors,
  updatePromise,
  listPromiseUpdates
} from '@/api'
import PromiseUpdates from '@/components/PromiseUpdates'
import { formatDate, loadCache, updateCache } from '@/utils'
import malaysianStates from '@/utils/malaysianStates'

export default {
  name: 'PromiseEditor',
  components: { PromiseUpdates },
  data () {
    return {
      appStatus: 'loading',
      mode: '',
      error: undefined,
      promise: {},
      promiseUpdates: [],
      politicians: [],
      contributors: [],
      viewCaption: false,
      result: null,
      source_names: [
        'The Star',
        'Malay Mail',
        'PH Manifesto GE14',
        'MalaysiaKini',
        'The Malaysian Insight',
        'New Straits Times',
        'The Sun',
        'The Borneo Post',
        'Daily Express',
        'If not listed, notify Nazreen now' // TODO: move this out to a file, like in utils
      ],
      statusOptions: [
        'Review Needed', // TODO: move this out to a file, like in utils
        'Fulfilled',
        'Broken',
        'Partially Fulfilled',
        'In Progress',
        'Not Started',
        'At Risk',
        'Retracted'
      ],
      malaysianStates,
      liveOptions: [{ label: 'true', value: true }, { label: 'false', value: false }],
      rules: {
        live: [{ required: true, type: 'boolean', message: 'Please select whether promise is live.', trigger: 'blur' }],
        title: [{ required: true, message: 'Please select a politician', trigger: 'blur' }],
        quote: [{ required: true, message: 'Please paste exact words from the source', trigger: 'blur' }],
        contributor_id: [{ required: true, type: 'text', message: 'contributor_id is required', trigger: 'blur' }],
        politician_id: [{ required: true, message: 'politician_id is required', trigger: 'blur' }],
        category: [{ required: true, message: 'Please enter category', trigger: 'blur' }],
        date: [{ message: 'Please select a date', trigger: 'blur' }],
        source_date: [{ required: true, type: 'date', message: 'Please select a source date', trigger: 'blur' }],
        source_url: [{ required: true, type: 'url', message: 'Please indicate a source url', trigger: 'blur' }],
        source_name: [{ required: true, message: 'Please indicate a source name', trigger: 'blur' }],
        status: [{ message: 'Please indicate promise status', trigger: 'blur' }]
      }
    }
  },
  computed: {
    contributor: function () {
      if (this.contributors.length > 0) {
        const contributor = this.contributors.find(contributor => contributor.id === this.promise.contributor_id)
        if (!contributor) return
        return contributor.name + ' - ' + contributor.email
      }
    },
    captionText: function () {
      const politician = this.politicians.find(politician => this.promise.politician_id === politician.id) || {}// eslint-disable-next-line
      const { primary_position, name } = politician// eslint-disable-next-line
      const { source_date, title, source_name, source_url } = this.promise

      return ({// eslint-disable-next-line
        header: `PROMISE MADE: ${title}`,
        // eslint-disable-next-line
        brief: `On ${formatDate(source_date)}, ${primary_position}, ${name}, said that ${title}.`,
        // eslint-disable-next-line
        source: `Source: ${source_name} - ${source_url}`,
        project_info: 'OpenPromises Malaysia is a Malaysian homegrown non-partisan project. None of our members are affiliated with any of the political parties and our intention of running this project is to increase the quality and integrity of our representatives.',
        cta: 'If you believe in what we do, share this post out.',
        hashtags: '#accountability #neutrality #checkandbalance'
      })
    }
  },
  async created () {
    try {
      this.mode = this.$route.path.split('/').slice(-1)[0]
      // TODO: use Promise.all to make faster?
      this.politicians = await loadCache(this, 'politicians', listPoliticians())
      this.contributors = await await loadCache(this, 'contributors', listContributors())

      if (this.$route.query) {
        if (this.$route.query.politician_id && !this.promise.politician_id) {
          this.promise.politician_id = this.$route.query.politician_id
        }
      }

      if (this.mode === 'edit') {
        const promise = await getPromise(this.$route.params.id)
        this.promise = promise
        this.promiseUpdates = await listPromiseUpdates(`?promise_id=${this.$route.params.id}&orderBy=source_date`)
      } else {
        this.promise.contributor_id = this.$store.state.user.id
      }
      this.appStatus = ''
    } catch (e) {
      console.error(e)
    }
  },
  async mounted () {
    try {
      this.politicians = await updateCache(this, 'politicians', listPoliticians())
      this.contributors = await updateCache(this, 'contributors', listContributors())
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    formatDate,
    toggleViewCaption () {
      this.viewCaption = !this.viewCaption
    },
    onSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.appStatus = 'submitting'
          this.submitPromise(this.promise)
        } else {
          return false
        }
      })
    },
    async submitPromise (promise) {
      try {
        if (this.mode === 'edit') {
          delete promise.contributor_id
          await updatePromise(promise)
        } else {
          const result = await postPromise(promise)
          if (result instanceof Error) {
            throw result
          }
          this.result = result
        }
        this.appStatus = 'submitted'
        return
      } catch (e) {
        console.error(e)
        this.appStatus = 'error'
        this.error = e.response.data
      }
    }
  }
}
</script>

<style scoped>
#PromiseEditor {
  max-width: 900px
}

#PromiseEditor_header {
  text-transform: capitalize
}

#caption-text{
  margin: 20px
}

#caption-text > h2 {
  margin: 0
}

</style>
