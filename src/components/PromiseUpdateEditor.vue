<template>
  <main id="PromiseUpdateEditor">
    <h1 id="PromiseUpdateEditor_header">{{ mode }} Promise Update</h1>
    <template v-if="appStatus === 'loading'">
      <p> Loading {{ mode === 'edit' ? 'promiseUpdate' : '' }}...</p>
    </template>
    <template v-else-if="appStatus === 'submitting'">
      <p>Submitting promiseUpdate...</p>
    </template>
    <template v-else-if="appStatus === 'submitted'">
      <p>Promise Update has been {{ mode === 'edit' ? 'updated' : 'submitted' }}. Refresh the page to see it here.</p>
    </template>
    <template v-else-if="appStatus === 'error'">
      <p>There has been an error: {{ error }}</p>
    </template>
    <el-form v-else v-on:submit.prevent="onSubmit" :rules="rules" label-position="left" label-width="100px" ref="form" :model="promiseUpdate">
        <el-row >

          <el-col :xs="24" :sm="8" >
            <p><b>Created at: </b>{{ promiseUpdate.created_at }}</p>
          </el-col>

           <el-col :xs="24" :sm="8" >
            <p><b>Updated at: </b>{{ promiseUpdate.updated_at }}</p>
          </el-col>

           <el-col :xs="24" :sm="8" >
            <p><b>Contributor: </b>{{ contributor }}</p>
          </el-col>

        <el-col :xs="24" :sm="12" >
              <el-form-item label="Live" prop="live">
            <el-select v-model="promiseUpdate.live" placeholder="Select">
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
            <el-select v-model="promiseUpdate.status" placeholder="Select">
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
              <el-form-item label="Title" prop="title">
            <el-input type="textarea" placeholder="enter title" v-model="promiseUpdate.title"></el-input>
              </el-form-item>
          </el-col>

          <el-col :xs="24">
              <el-form-item label="Description" prop="description">
              <el-input type="textarea" placeholder="enter description" v-model="promiseUpdate.description" :rows=5></el-input>
              </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" >
              <el-form-item label="Quote" prop="quote">
              <el-input type="textarea" placeholder="enter quote" v-model="promiseUpdate.quote"></el-input>
              </el-form-item>
          </el-col>

           <el-col :xs="24" :sm="12" >
              <el-form-item label="Source Name" prop="source_name">
            <el-input type="text" placeholder="enter source name" v-model="promiseUpdate.source_name"></el-input>
              </el-form-item>
          </el-col>

         <el-col :xs="24" :sm="12" >
              <el-form-item label="Source Date" prop="source_date">
            <el-date-picker type="date" placeholder="enter source date" v-model="promiseUpdate.source_date"></el-date-picker>
              </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" >
              <el-form-item label="Source URL" prop="source_url">
            <el-input type="text" placeholder="enter source url" v-model="promiseUpdate.source_url"></el-input>
              </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" >
              <el-form-item label="Image" prop="cover_image">
            <el-input type="text" placeholder="enter image link" v-model="promiseUpdate.cover_image"></el-input>
              </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" >
              <el-form-item label="Notes" prop="notes">
            <el-input type="textarea" placeholder="enter notes" v-model="promiseUpdate.notes"></el-input>
              </el-form-item>
          </el-col>

        </el-row>

          <el-button v-on:click="onSubmit"> Submit </el-button>

        </el-form>
</main>
</template>

<script>
import { postPromiseUpdate, getPromiseUpdate, updatePromiseUpdate } from '@/api'

export default {
  name: 'PromiseUpdateEditor',
  props: ['contributors', 'promiseID', 'mode'],
  data() {
    return {
      appStatus: 'loading',
      error: undefined,
      promiseUpdate: {},
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
      liveOptions: [
        { label: 'true', value: true },
        { label: 'false', value: false }
      ],
      rules: {
        live: [
          {
            required: true,
            type: 'boolean',
            message: 'Please select whether promiseUpdate is live.',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: 'Please select a politician',
            trigger: 'blur'
          }
        ],
        quote: [
          {
            required: true,
            message: 'Please paste exact words from the source',
            trigger: 'blur'
          }
        ],
        contributor_id: [
          {
            required: true,
            type: 'text',
            message: 'contributor_id is required',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: 'Please enter description',
            trigger: 'blur'
          }
        ],
        date: [{ message: 'Please select a date', trigger: 'blur' }],
        source_date: [
          {
            required: true,
            type: 'date',
            message: 'Please select a source date',
            trigger: 'blur'
          }
        ],
        source_url: [
          {
            required: true,
            type: 'url',
            message: 'Please indicate a source url',
            trigger: 'blur'
          }
        ],
        source_name: [
          {
            required: true,
            message: 'Please indicate a source name',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: 'Please indicate promiseUpdate status',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    contributor: function() {
      if (this.contributors.length > 0) {
        const contributor = this.contributors.find(
          contributor => contributor.id === this.promiseUpdate.contributor_id
        )
        if (!contributor) return
        return contributor.name + ' - ' + contributor.email
      }
    }
  },
  async created() {
    try {
      if (this.mode === 'edit') {
        const promiseUpdate = await getPromiseUpdate(this.$route.params.id)
        this.promiseUpdate = promiseUpdate
      } else if (this.mode === 'new') {
        this.promiseUpdate.contributor_id = this.$store.state.user.id
      }
      this.appStatus = ''
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.appStatus = 'submitting'
          this.promiseUpdate.promise_id = this.promiseID
          this.submitPromiseUpdate(this.promiseUpdate)
        } else {
          return false
        }
      })
    },
    async submitPromiseUpdate(promiseUpdate) {
      try {
        if (this.mode === 'edit') {
          delete promiseUpdate.contributor_id
          await updatePromiseUpdate(promiseUpdate)
        } else if (this.mode === 'new') {
          await postPromiseUpdate(promiseUpdate)
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
</style>
