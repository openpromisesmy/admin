<template>
  <main id="PoliticianEditor">
    <h1>{{ mode }} Politician</h1>
    <template v-if="appStatus === 'loading'">
      <p>Loading ...</p>
    </template>
    <template v-else-if="appStatus === 'submitting'">
      <p>Submitting politician...</p>
    </template>
    <template v-else-if="appStatus === 'submitted'">
      <p>Politician has been {{ mode === 'new' ? 'submitted' : 'updated' }}</p>
    </template>
    <el-form v-else v-on:submit.prevent="onSubmit" :rules="rules" label-position="left" label-width="100px" ref="form" :model="politician">
        <el-row >

        <el-col :xs="24" :sm="12" >
              <el-form-item label="Live" prop="live">
            <el-select v-model="politician.live" placeholder="Select">
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
              <el-form-item label="Name" prop="name">
            <el-input type="text" placeholder="enter name" v-model="politician.name"></el-input>
              </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" >
              <el-form-item label="Primary Position" prop="primary_position">
            <el-input type="text" placeholder="enter primary position" v-model="politician.primary_position"></el-input>
              </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" >
              <el-form-item label="Brief" prop="brief">
            <el-input type="text" placeholder="enter brief" v-model="politician.brief"></el-input>
              </el-form-item>
          </el-col>


          <el-col :xs="24" :sm="12" >
              <el-form-item label="Status" prop="stats">
            <el-input type="text" placeholder="enter status" v-model="politician.status"></el-input>
              </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" >
              <el-form-item label="Profile Image" prop="profile_image">
            <el-input type="text" placeholder="enter profile image link" v-model="politician.profile_image"></el-input>
              </el-form-item>
          </el-col>

        </el-row>

          <el-button v-on:click="onSubmit"> Submit </el-button>
        </el-form>
  </main>
</template>

<script>
import { postPolitician } from '@/api'
export default {
  name: 'PoliticianEditor',
  data () {
    return {
      appStatus: 'loading',
      mode: '',
      liveOptions: [{ label: 'true', value: true }, { label: 'false', value: false}], 
      politician: {
        contributor_id: this.$store.state.user.id
      },
      rules: {
        live: [{ required: true, type: 'boolean', message: 'Please select whether politician is live.', trigger: 'blur' }],
        name: [{ required: true, message: 'Please input politician name', trigger: 'blur' }],
        // contributor_id: [{ required: true, type: 'text', message: 'contributor_id is required', trigger: 'blur' }],
        primary_position: [{ required: true, message: 'primary position is required', trigger: 'blur' }],
        brief: [{ required: true, message: 'brief is required', trigger: 'blur' }],
        status: [{ required: true, message: 'Please enter status', trigger: 'blur' }],
        profile_image: [{ required: true, type: 'url', message: 'Please indicate the profile image url', trigger: 'blur' }]
      }
    }
  },
  computed: {
    contributor: function () {
      if (this.contributors.length > 0) {
        const contributor = this.contributors.find(contributor => contributor.id === this.politician.contributor_id)
        if (!contributor) return
        return contributor.name + ' - ' + contributor.email
      }
    }
  },
  async created () {
    try {
      this.mode = this.$route.path.split('/').slice(-1)[0]
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
          this.submitPolitician(this.politician)
        } else {
          return false
        }
      })
    },
    async submitPolitician (politician) {
      try {
        const res = await postPolitician(politician)
        console.log(res)
        if(res.id) {
          return this.appStatus = 'submitted'
        } else if(res.response.status === 200) {
          return alert(res.response.data)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>
#PoliticianEditor {
  max-width: 900px
}

</style>
