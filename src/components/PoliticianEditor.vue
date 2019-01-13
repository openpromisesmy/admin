<template>
  <main id="PoliticianEditor">
    <h1 class="PoliticianEditor_header">{{ mode }} Politician</h1>
    <error-panel
      v-if="appStatus === 'error'"
      :message="error"
    />
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

        <el-col>
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

          <el-col>
            <h1>Main Information</h1>
          </el-col>

          <el-col>
              <el-form-item label="Name" prop="name">
                <el-input type="text" placeholder="enter name" v-model="politician.name"></el-input>
              </el-form-item>
          </el-col>

          <el-col>
              <el-form-item label="Primary Position" prop="primary_position">
                <el-input type="text" placeholder="enter primary position" v-model="politician.primary_position"></el-input>
              </el-form-item>
          </el-col>

          <el-col>
              <el-form-item label="Brief" prop="brief">
                <el-input type="textarea" placeholder="enter brief" v-model="politician.brief"></el-input>
              </el-form-item>
          </el-col>

          <el-col>
              <el-form-item label="Profile Image" prop="profile_image">
                <el-input type="text" placeholder="enter profile image link" v-model="politician.profile_image"></el-input>
              </el-form-item>
          </el-col>

          <el-col>
            <h1>Contact Details</h1>
          </el-col>

          <el-col>
              <el-form-item label="Email" prop="email">
                <el-input type="text" placeholder="enter email" v-model="politician.contact_details.email"></el-input>
              </el-form-item>
              <el-form-item label="Phone number" prop="phone_number">
                <el-input type="text" placeholder="enter phone number" v-model="politician.contact_details.phone_number"></el-input>
              </el-form-item>
              <el-form-item label="Facebook Link" prop="facebook_url">
                <el-input type="text" placeholder="enter facebook url" v-model="politician.contact_details.facebook_url"></el-input>
              </el-form-item>
              <el-form-item label="Twitter Link" prop="twitter_url">
                <el-input type="text" placeholder="enter twitter url" v-model="politician.contact_details.twitter_url"></el-input>
              </el-form-item>
          </el-col>

        </el-row>

          <el-button v-on:click="onSubmit"> Submit </el-button>
        </el-form>
  </main>
</template>

<script>
import { postPolitician, getPolitician, updatePolitician } from '@/api'
import ErrorPanel from '@/components/ErrorPanel'

export default {
  name: 'PoliticianEditor',
  components: { ErrorPanel },
  data () {
    return {
      appStatus: 'loading',
      error: null,
      mode: '',
      liveOptions: [{ label: 'true', value: true }, { label: 'false', value: false }],
      politician: {
        contact_details: {}
      },
      rules: {
        email: [{ type: 'string', trigger: 'blur' }],
        phone_number: [{ type: 'string', trigger: 'blur' }],
        facebook_url: [{ type: 'url', trigger: 'blur' }],
        twitter_url: [{ type: 'url', trigger: 'blur' }],
        name: [{ required: true, message: 'Please input politician name', trigger: 'blur' }],
        live: [{ required: true, type: 'boolean', message: 'Please select whether politician is live.', trigger: 'blur' }],
        name: [{ required: true, message: 'Please input politician name', trigger: 'blur' }],
        primary_position: [{ required: true, message: 'primary position is required', trigger: 'blur' }],
        brief: [{ required: true, message: 'brief is required', trigger: 'blur' }],
        status: [{ required: true, message: 'Please enter status', trigger: 'blur' }],
        profile_image: [{ required: true, type: 'url', message: 'Please indicate the profile image url', trigger: 'blur' }]
      }
    }
  },
  async created () {
    try {
      this.mode = this.$route.path.split('/').slice(-1)[0]
      if (this.mode === 'edit') {
        this.appStatus = 'loading'
        const id = this.$route.path.split('/').slice(-2)[0]
        const politician = await getPolitician(id)
        if (!politician.contact_details) {
          politician.contact_details = {}
        }
        this.politician = politician
        this.appStatus = ''
      } else {
        this.appStatus = ''
      }
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    onSubmit () {
      try {
        this.appStatus = null
        this.error = null
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.appStatus = 'submitting'
            this.submitPolitician(this.politician)
          } else {
            return false
          }
        })
      } catch (e) {
        this.$toast.warning('There seems to be an error with validation.', 'Oops', { position: 'topRight' })
      }
    },
    displaySuccessToast () {
      const verb = this.mode === 'edit' ? 'updated' : 'submitted'
      this.$toast.success(`politician ${verb}`, 'Success', { position: 'topRight' })
    },
    async submitPolitician (politician) {
      try {
        if (this.mode === 'new') {
          const res = await postPolitician(politician)
          if (!res.id) {
            throw res.response.data
          }
        } else if (this.mode === 'edit') {
          const res = await updatePolitician(politician)
          if (res !== '') {
            throw res.response.data
          }
        }
          this.appStatus = 'submitted'
          this.displaySuccessToast()

      } catch (e) {
        console.error(e)
        this.appStatus = 'error'
        this.error = e.response.data
        this.$toast.error(this.error, 'Error:', { position: 'topRight' })
      }
    }
  }
}
</script>

<style scoped>
#PoliticianEditor {
  max-width: 900px
}

.PoliticianEditor_header {
  text-transform: capitalize;
  text-align: center
}

</style>
