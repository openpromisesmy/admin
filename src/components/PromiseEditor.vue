<template>
  <main id="PromiseEditor">
    <h1 id="PromiseEditor_header">{{ mode }} Promise</h1>
    <template v-if="appStatus === 'loading'">
      <p>Loading promise...</p>
    </template>
    <template v-else-if="appStatus === 'submitting'">
      <p>Submitting promise...</p>
    </template>
    <template v-else-if="appStatus === 'submitted'">
      <p>Promise has been {{ this.mode === 'edit' ? 'updated' : 'created' }}</p>
    </template>
    <template v-else-if="appStatus === 'error'">
      <p>There has been an error: {{ error }}</p>
    </template>
    <el-form v-else v-on:submit.prevent="onSubmit" :rules="rules" label-position="left" label-width="100px" ref="form" :model="promise">
        <el-row >

          <el-col :xs="24" :sm="8" >
            <p><b>Created at: </b>{{ promise.created_at }}</p>
          </el-col>

           <el-col :xs="24" :sm="8" >
            <p><b>Updated at: </b>{{ promise.updated_at }}</p>
          </el-col>

           <el-col :xs="24" :sm="8" >
            <p><b>Contributor: </b>{{ contributor }}</p>
          </el-col>

        <el-col :xs="24" :sm="12" >
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

          <el-col :xs="24" :sm="12" >
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

          <el-col :xs="24" :sm="24" >
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

          <el-col :xs="24" :sm="24" >
              <el-form-item label="Title" prop="title">
            <el-input type="textarea" placeholder="enter title" v-model="promise.title"></el-input>
              </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" >
              <el-form-item label="Category" prop="category">
            <el-input type="text" placeholder="enter category" v-model="promise.category"></el-input>
              </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" >
              <el-form-item label="Quote" prop="quote">
            <el-input type="textarea" placeholder="enter quote" v-model="promise.quote"></el-input>
              </el-form-item>
          </el-col>

           <el-col :xs="24" :sm="12" >
              <el-form-item label="Source Name" prop="source_name">
            <el-input type="text" placeholder="enter source name" v-model="promise.source_name"></el-input>
              </el-form-item>
          </el-col>

         <el-col :xs="24" :sm="12" >
              <el-form-item label="Source Date" prop="source_date">
            <el-date-picker type="date" placeholder="enter source date" v-model="promise.source_date"></el-date-picker>
              </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" >
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
            <el-input type="textarea" placeholder="enter notes" v-model="promise.notes"></el-input>
              </el-form-item>
          </el-col>

        </el-row>

          <el-button v-on:click="onSubmit"> Submit </el-button>

          <el-card id="caption-text" class="box-card">
            <h2>Caption Text</h2>
            <p>{{ captionText.statement }}</p>
            <p>{{ captionText.quote }}</p>
            <p>{{ captionText.source }}</p>
            <p>{{ captionText.project_info }}</p>
            <p>{{ captionText.cta }}</p>
          </el-card>

        </el-form>
  </main>
</template>

<script>
import { postPromise, getPromise, listPoliticians, listContributors, updatePromise } from '@/api'
import { formatDate } from '@/utils'

export default {
  name: 'PromiseEditor',
  data () {
    return {
      appStatus: 'loading',
      mode: '',
      error: undefined,
      promise: {},
      politicians: [],
      contributors: [],
      statusOptions: [
        'Review Needed',
        'Fulfilled',
        'Broken',
        'Partially Fulfilled',
        'In Progress',
        'Not Started',
        'At Risk',
        'Retracted'
      ],
      liveOptions: [{ label: 'true', value: true }, { label: 'false', value: false }],
      rules: {
        live: [{ required: true, type: 'boolean', message: 'Please select whether promise is live.', trigger: 'blur' }],
        title: [{ required: true, message: 'Please select a politician', trigger: 'blur' }],
        contributor_id: [{ required: true, type: 'text', message: 'contributor_id is required', trigger: 'blur' }],
        politician_id: [{ required: true, message: 'politician_id is required', trigger: 'blur' }],
        category: [{ required: true, message: 'Please enter category', trigger: 'blur' }],
        date: [{ message: 'Please select a date', trigger: 'blur' }],
        source_date: [{ type: 'date', message: 'Please select a source date', trigger: 'blur' }],
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
      const { source_date, title, quote, source_name, source_url } = this.promise

      return ({// eslint-disable-next-line
        statement: `On ${formatDate(source_date)}, ${primary_position}, ${name}, said that ${title}.`,
        quote, // eslint-disable-next-line
        source: `Source: ${source_name} - ${source_url}`,
        project_info: 'OpenPromises is a Malaysian homegrown non-partisan project. None of our members are affiliated with any of the political parties and our intention of running this project is to increase the quality and integrity of our representatives.',
        cta: 'Join our community group at OpenPromises Malaysia Watchers to get involved in the discussion.'
      })
    }
  },
  async created () {
    try {
      this.mode = this.$route.path.split('/').slice(-1)[0]
      this.politicians = await listPoliticians()
      this.contributors = await listContributors()

      if (this.mode === 'edit') {
        const promise = await getPromise(this.$route.params.id)
        this.promise = promise
      } else if (this.mode === 'new') {
        this.promise.contributor_id = this.$store.state.user.id
      }
      this.appStatus = ''
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
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
        } else if (this.mode === 'new') {
          await postPromise(promise)
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
