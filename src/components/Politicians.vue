<template>
  <div>

    <el-row>
      <el-col :span="16">
        <h1>Politicians</h1>
      </el-col>
      <el-col :span="8">
        <router-link to="/politicians/new">
          <el-button type="primary" class="add-button">Add Politician</el-button>
        </router-link>
      </el-col>
    </el-row>

    <p v-if="politicians.length == 0">Loading politicians...</p>
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
      label="Primary Position">
    </el-table-column>
    <el-table-column
      prop="live"
      label="Live"
      width="120">
      <template slot-scope="scope">
        <p>{{ scope.row.live }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label="Status"
      width="120">
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
    <el-table-column
      prop="contributor_id"
      label="Contributor ID"
      width="150">
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
.add-button {

}
</style>
