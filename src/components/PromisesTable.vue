<template>
    <el-table
    :data="promises"
    :default-sort = "{prop: 'created_at', order: 'descending'}"
    border
    style="width: 100%">
    <el-table-column
      sortable
      v-if="!exclude.includes('created_at')"
      prop="created_at"
      label="Created At"
      width="150">
      <template slot-scope="scope">
        <p>{{ formatDate(scope.row.created_at) }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="title"
      label="Title"
      width="350">
    </el-table-column>
    <el-table-column
      v-if="!exclude.includes('source_name')"
      prop="source_name"
      label="Source Name"
      width="200">
    </el-table-column>
    <el-table-column
      sortable
      v-if="!exclude.includes('source_date')"
      prop="source_date"
      label="Source Date"
      width="150">
      <template slot-scope="scope">
        <p>{{ formatDate(scope.row.source_date) }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="category"
      label="Category"
      width="180">
    </el-table-column>
    <el-table-column
      v-if="!exclude.includes('politician_name')"
      prop="politician_name"
      label="Politician"
      width="150">
    </el-table-column>
    <el-table-column
      sortable
      v-if="!exclude.includes('status')"
      prop="status"
      label="Status"
      width="125">
    </el-table-column>
    <el-table-column
      v-if="!exclude.includes('actions')"
      label="Actions"
      width="125">
      <template slot-scope="scope">
        <router-link :to="'/promises/' + scope.row.id">
          <el-button type="primary">
          View
          </el-button>
        </router-link>
        <router-link :to="'/promises/' + scope.row.id + '/edit'">
          <el-button type="info">
          Edit
          </el-button>
        </router-link>
      </template>
    </el-table-column>
  </el-table>
  </template>

<script>
import LoadingSpinner from '@/components//LoadingSpinner'
import { formatDate } from '@/utils'

export default {
  name: 'PromisesTable',
  props: ['promises', 'exclude'],
  methods: { formatDate },
  components: { LoadingSpinner }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
