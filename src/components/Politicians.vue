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

    <template v-if="politicians.length == 0">
      <p>Loading politicians...This will take 2-4 seconds.</p>
      <LoadingSpinner />
    </template>
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
       <template slot-scope="scope">
        <p>{{ formatDate(scope.row.created_at) }}</p>
      </template>
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
    <el-table-column
      sortable
      label="Actions"
      width="125">
      <template slot-scope="scope">
        <router-link :to="'/politicians/' + scope.row.id + '/edit'">
          <el-button type="info">
          Edit
          </el-button>
        </router-link>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { listPoliticians } from '@/api'
import { formatDate } from '@/utils'
import LoadingSpinner from '@/components/shared/LoadingSpinner'

export default {
  name: 'Politicians',
  components: { LoadingSpinner },
  data () {
    return {
      politicians: []
    }
  },
  methods: {
    formatDate
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
