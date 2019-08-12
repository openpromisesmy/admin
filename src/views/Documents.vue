<template>
  <div class="container">
    <!-- <router-link to="/documents/new">
      <el-button type="primary" class="add-button">Add Document</el-button>
    </router-link>-->

    <template v-if="appStatus === 'loading'">
      <p>Loading documents...This will take 2-4 seconds.</p>
      <LoadingSpinner />
    </template>
    <template v-else>
      <el-table :data="documents" border style="width: 100%">
        <el-table-column prop="name" label="Name">
          <template slot-scope="scope">
            <router-link :to="'/document/' + scope.row.id">
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
        <!-- <el-table-column label="Actions" width="125">
          <template slot-scope="scope">
            <router-link :to="'/documents/' + scope.row.id + '/edit'">
              <el-button type="info">Edit</el-button>
            </router-link>
          </template>
        </el-table-column> -->
      </el-table>
    </template>
  </div>
</template>

<script>
import { listLists } from "@/api";
import LoadingSpinner from "@/components/LoadingSpinner";

export default {
  name: "Documents",
  data() {
    return {
      appStatus: "",
      documents: [
        {
          id: "6m5o7jPjQEryvrLZqnLa",
          name: "PH Manifesto",
          description: "Pakatan Harapan's manifesto for GE15",
          url: "https://sadfsadf.com/sadfasdf.pdf"
        },
        {
          id: "6m5o7jPjQEryvrLZqnLa",
          name: "PH Manifesto",
          description: "Pakatan Harapan's manifesto for GE15",
          url: "https://sadfsadf.com/sadfasdf.pdf"
        },
        {
          id: "6m5o7jPjQEryvrLZqnLa",
          name: "PH Manifesto",
          description: "Pakatan Harapan's manifesto for GE15",
          url: "https://sadfsadf.com/sadfasdf.pdf"
        },
        {
          id: "6m5o7jPjQEryvrLZqnLa",
          name: "PH Manifesto",
          description: "Pakatan Harapan's manifesto for GE15",
          url: "https://sadfsadf.com/sadfasdf.pdf"
        }
      ]
    };
  },
  components: { LoadingSpinner },
  async created() {
    // try {
    //   this.appStatus = 'loading'
    //   this.lists = await this.listListsHandler(this.queryString)
    //   this.appStatus = ''
    // } catch (e) {
    //   console.error(e)
    // }
  },
  methods: {
    // async listListsHandler() {
    //   return listLists();
    // }
  }
};
</script>

<style scoped>
</style>
