<template>
  <div class="home container">
    <h1>OpenPromises Tracking Dashboard</h1>
    <h2 id="slogan">"Shifting Malaysia's political culture, one promise at a time."</h2>
            <!-- <el-row>
              <el-col :span="12">
                <el-card id="shortcuts">
                <div slot="header" class="clearfix">
                  <b>Add New Shortcuts</b>
                </div>
                <router-link to="/promises/new">
                  <el-button type="primary"> New Promise </el-button>
                </router-link>
                <router-link to="/politicians">
                  <el-button type="primary"> New Politician </el-button>
                </router-link>
                </el-card>
              </el-col>

              <el-col :span="12">
                <el-card id="shortcuts">
                  <div slot="header" class="clearfix">
                    <b>External Shortcuts</b>
                  </div>
                  <a href="https://www.facebook.com/openpromises.malaysia/" target="_blank">
                      <el-button type="default"> Facebook Page </el-button>
                  </a>
                  <a href="https://www.facebook.com/groups/1809117962724326/" target="_blank">
                      <el-button type="default"> Watchers Group </el-button>
                  </a>
                </el-card>
              </el-col>
            </el-row> -->
            <el-card>
              <promise-editor />
            </el-card>
    </div>
</template>

<script>
import PromiseEditor from '@/components/PromiseEditor'
export default {
  name: 'Home',
  components: { PromiseEditor }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#slogan {
  font-weight: 300;
}

#shortcuts {
  /* max-width: 900px; */
  margin: 20px auto;
}

.el-card .el-row {
  margin-bottom: 10px;
}
</style>
