<template>
  <div>
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
import LoadingSpinner from '@/components/shared/LoadingSpinner'

export default {
  name: 'Contributors',
  components: { LoadingSpinner },
  data () {
    return {
      contributors: []
    }
  },
  async created () {
    this.contributors = await listContributors()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile_img {
  max-height: 80px
}
</style>
