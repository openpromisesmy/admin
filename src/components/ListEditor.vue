<template>
  <main id="ListEditor">
    <h1 id="ListEditor_header">{{ mode }} List</h1>
    <!-- TODO: extract RequestStatus, make modular/dry -->
    <error-panel v-if="appStatus === 'error'" :message="error"/>
    <template v-if="appStatus === 'loading'">
      <p>Loading {{ mode === 'edit' ? 'list' : '' }}...</p>
    </template>
    <template v-else-if="appStatus === 'submitting'">
      <p>Submitting list...</p>
    </template>
    <template v-else-if="appStatus === 'submitted'">
      <p>List has been {{ mode === 'edit' ? 'updated' : 'created' }}</p>
      <p v-if="Object.keys(result) > 0">{{ JSON.stringify(result) }}</p>
      <router-link :to="`/lists/${result.id || $route.params.id}`">
        <el-button type="primary">View List</el-button>
      </router-link>
    </template>
    <template v-else>
      <el-form
        v-on:submit.prevent="onSubmit"
        :rules="rules"
        label-position="left"
        label-width="100px"
        ref="form"
        :model="list"
      >
        <el-row>
          <el-col :xs="24" :sm="8">
            <p>
              <b>Created at:</b>
              {{ formatDate(list.created_at) }}
            </p>
          </el-col>

          <el-col :xs="24" :sm="8">
            <p>
              <b>Updated at:</b>
              {{ formatDate(list.updated_at) }}
            </p>
          </el-col>

          <el-col :xs="24" :sm="8">
            <p>
              <b>Contributor:</b>
              {{ contributor.email }}
            </p>
          </el-col>

          <el-col :xs="24" :sm="8">
            <el-tooltip
              class="item"
              effect="dark"
              content="Whether or not the list will be displayed to the public. True means it will be public. False means it will be saved in the database but not viewable by the public."
              placement="top"
            >
              <el-form-item label="Live" prop="live">
                <el-select v-model="list.live" placeholder="Select">
                  <el-option
                    v-for="item in liveOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-tooltip>
          </el-col>

          <el-col :xs="24" :sm="24">
            <el-form-item label="Title" prop="title">
              <el-input type="textarea" placeholder="enter title" v-model="list.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button id="submit" type="primary" @click="onSubmit">Submit</el-button>
      </el-form>
    </template>
  </main>
</template>

<script>
import { postList, getList, updateList, getContributor } from '@/api'
import { formatDate } from '@/utils'
import ErrorPanel from '@/components/ErrorPanel'

export default {
  name: 'ListEditor',
  components: { ErrorPanel },
  data () {
    return {
      appStatus: 'loading',
      mode: '',
      error: undefined,
      contributor: {},
      list: {
        live: false,
        title: null
      },
      liveOptions: [
        { label: 'true', value: true },
        { label: 'false', value: false }
      ],
      rules: {
        live: [
          { required: true, message: 'Please select live value' }],
        title: [
          { required: true, message: 'Please enter a title', trigger: 'blur' }
        ]
      }
    }
  },
  async created () {
    try {
      this.mode = this.$route.path.split('/').slice(-1)[0]

      if (this.mode === 'edit') {
        this.list = await getList(this.$route.params.id)
        this.contributor = await getContributor(this.list.contributor_id)
      } else {
        this.list.contributor_id = this.$store.state.user.id
        this.contributor.email = this.$store.state.user.email
      }
      this.appStatus = ''
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    formatDate,
    onSubmit () {
      try {
        this.appStatus = null
        this.error = null
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.appStatus = 'submitting'
            this.submitList(this.list)
          }
        })
      } catch (e) {
        console.error(e)
      }
    },
    displaySuccessToast () {
      const verb = this.mode === 'edit' ? 'updated' : 'submitted'
      this.$toast.success(`list ${verb}`, 'Success', { position: 'topRight' })
    },
    navigateToList (id) {
      const route = `/lists/${id}`
      this.$router.push(route)
    },
    async submitList (list) {
      try {
        if (this.mode === 'edit') {
          delete list.contributor_id
          this.result = await updateList(list)
        } else {
          const res = await postList(list)
          console.log(res)
          const postResult = res
          if (postResult instanceof Error) {
            throw postResult
          }
          this.result = postResult
        }
        this.appStatus = 'submitted'
        this.displaySuccessToast()
        this.navigateToList(this.result.id || this.$route.params.id)
        return
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
#ListEditor {
  max-width: 900px;
}

#ListEditor_header {
  text-transform: capitalize;
}

#submit {
  width: 100%;
  padding: 20px;
  font-size: 2rem;
  margin-bottom: 30px;
}
</style>
