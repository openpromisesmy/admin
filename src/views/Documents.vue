<template>
  <div class="container">

    <template v-if="appStatus === 'loading'">
      <p>Loading documents...This will take 2-4 seconds.</p>
      <LoadingSpinner />
    </template>
    <template v-else>
      <el-table :data="documents" border style="width: 100%">
        <el-table-column prop="name" label="Name">
          <template slot-scope="scope">
            <router-link :to="'/documents/' + scope.row.id">
              <p>{{ scope.row.name }}</p>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="Description">
          <template slot-scope="scope">
            <p>{{ scope.row.description }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="URL">
          <template slot-scope="scope">
            <a :href="scope.row.url">{{ scope.row.url }}</a>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { listDocuments } from '@/api'
import LoadingSpinner from '@/components/LoadingSpinner'

export default {
  name: 'Documents',
  data () {
    return {
      appStatus: '',
      documents: []
    }
  },
  components: { LoadingSpinner },
  async created () {
    try {
      this.appStatus = 'loading'
      this.documents = await this.listDocumentsHandler()
      this.appStatus = ''
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    async listDocumentsHandler () {
      return listDocuments()
    }
  }
}
</script>

<style scoped>
</style>
