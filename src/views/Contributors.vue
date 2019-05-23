<template>
  <div class="container">
    <h1>Contributors {{ contributors.length > 0 ? contributors.length : '' }}</h1>
    <template v-if="contributors.length == 0">
      <p>Loading contributors...This would take 1-3 seconds.</p>
      <LoadingSpinner />
      </template>
    <el-table
    v-else
    :data="contributors"
    border
    style="width: 100%">
    <el-table-column
      prop="email"
      label="Email"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name"
      width="150">
    </el-table-column>
    <el-table-column
      prop="status"
      label="Status"
      width="180">
    </el-table-column>
    <el-table-column
      prop="created_at"
      label="Created At"
      width="150">
    </el-table-column>
    <el-table-column
      prop="profile_image"
      label="Profile Image"
      width="200">
      <template slot-scope="scope">
        <img class="profile_img" :src="scope.row.profile_image" />
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { listContributors } from '@/api'
import { loadCache, updateCache } from '@/utils'
import LoadingSpinner from '@/components/LoadingSpinner'

export default {
  name: 'Contributors',
  components: { LoadingSpinner },
  data () {
    return {
      contributors: []
    }
  },
  async created () {
    try {
      this.contributors = await loadCache(this, 'contributors', listContributors())
    } catch (e) {
      console.error(e)
    }
  },
  async mounted () {
    try {
      this.contributors = await updateCache(this, 'contributors', listContributors())
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile_img {
  max-height: 80px
}
</style>
