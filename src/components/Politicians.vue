<template>
  <div>
    <h1>Politicians</h1>
    <p v-if="politicians.length == 0">Loading contributors...</p>
    <el-table
    v-else
    :data="politicians"
    border
    style="width: 100%">
    <el-table-column
      prop="name"
      label="Name"
      width="150">
    </el-table-column>
    <el-table-column
      prop="primary_position"
      label="Primary Position"
      width="150">
    </el-table-column>
    <el-table-column
      prop="live"
      label="Live"
      width="180">
      <template slot-scope="scope">
        <p>{{ scope.row.live }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label="Status"
      width="150">
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
import { listPoliticians } from '@/api'
export default {
  name: 'Politicians',
  data () {
    return {
      politicians: []
    }
  },
    async created () {
    this.politicians = await listPoliticians()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile_img {
  max-height: 80px
}
</style>
