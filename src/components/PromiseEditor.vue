<template>
  <main id="PromiseEditor">
    <h1>Edit Promise</h1>
    <p v-if="appStatus === 'submitting'">Updating promise...</p>
    <template v-if="appStatus === 'submitted'">
      <p>Promise has been updated</p>
    </template>
    <el-form v-else v-on:submit.prevent="onSubmit" :rules="rules" label-position="left" label-width="100px" ref="form" :model="promise">
        <el-row >

          <el-col :xs="24" :sm="12" >
            <p><b>Created at: </b>{{ promise.created_at }}</p>
          </el-col>

           <el-col :xs="24" :sm="12" >
            <p><b>Updated at: </b>{{ promise.updated_at }}</p>
          </el-col>

           <el-col :xs="24" :sm="12" >
            <p><b>Contributor ID: </b>{{ promise.contributor_id }}</p>
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
            <el-input type="text" placeholder="enter source date" v-model="promise.source_date"></el-input>
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

        </el-row>

          <el-button v-on:click="onSubmit"> Submit </el-button>
        </el-form>
  </main>
</template>

<script>
import { getPromise, listPoliticians } from '@/api'
export default {
  name: 'PromiseEditor',
  data () {
    return {
      appStatus: '',
      promise: {},
      politicians: [],
      liveOptions: [{ label: 'true', value: true }, { label: 'false', value: false }],
      rules: {
        live: [{ required: true, type: 'boolean', message: 'Please select whether promise is live.', trigger: 'blur' }],
        title: [{ required: true, message: 'Please select a politician', trigger: 'blur' }],
        contributor_id: [{ required: true, message: 'contributor_id is required', trigger: 'blur' }],
        politician_id: [{ required: true, message: 'politician_id is required', trigger: 'blur' }],
        category: [{ required: true, message: 'Please enter category', trigger: 'blur' }],
        date: [{ type: 'date', message: 'Please select a date', trigger: 'blur' }],
        source_date: [{ type: 'date', message: 'Please select a source date', trigger: 'blur' }],
        source_url: [{ required: true, type: 'url', message: 'Please indicate a source url', trigger: 'blur' }],
        source_name: [{ required: true, message: 'Please indicate a source name', trigger: 'blur' }],
        status: [{ message: 'Please indicate promise status', trigger: 'blur' }]
      }
    }
  },
  async created () {
    try {
      this.politicians = await listPoliticians()
      const promise = await getPromise(this.$route.params.id)
      this.promise = promise
    } catch (e) {

    }
  },
  methods: {
    onSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.submitPromise(this.promise)
        } else {
          return false
        }
      })
    },
    submitPromise (promise) {
      console.log('to submit')
    }
  }
}
</script>

<style scoped>
</style>
