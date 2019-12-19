<template>
  <div class="container">
    <router-link to="/lists/new">
      <el-button type="primary" class="add-button">Add List</el-button>
    </router-link>

    <template v-if="appStatus === 'loading'">
      <p>Loading lists...This will take 2-4 seconds.</p>
      <LoadingSpinner />
    </template>
    <template v-else>
      <el-table :data="lists" border style="width: 100%">
        <el-table-column prop="live" label="Live" width="125">
          <template slot-scope="scope">
            <el-button v-if="scope.row.live" type="success" icon="el-icon-check" circle></el-button>
            <span v-else>{{ scope.row.live.toString() }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="Title">
          <template slot-scope="scope">
            <router-link :to="'/lists/' + scope.row.id">
              <p>{{ scope.row.title }}</p>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="Description">
          <template slot-scope="scope">
            <p>{{ scope.row.description }}</p>
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="125">
          <template slot-scope="scope">
            <router-link :to="'/lists/' + scope.row.id + '/edit'">
              <el-button type="info">Edit</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { listLists } from '@/api'
import LoadingSpinner from '@/components/LoadingSpinner'

export default {
  name: 'Lists',
  data () {
    return {
      appStatus: '',
      lists: []
    }
  },
  components: { LoadingSpinner },
  async created () {
    try {
      this.appStatus = 'loading'
      this.lists = await this.listListsHandler(this.queryString)
      this.appStatus = ''
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    async listListsHandler (query) {
      return listLists(query)
    }
  }
}
</script>

<style scoped>
</style>
