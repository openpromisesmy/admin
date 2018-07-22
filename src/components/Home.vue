<template>
  <div class="home">
    <h1>OpenPromises Tracking Dashboard</h1>
    <h2 id="slogan">"Shifting Malaysia's political culture, one promise at a time."</h2>
    <el-card id="shortcuts">
        <div slot="header" class="clearfix">
          <b>Shortcuts</b>
        </div>
            <el-row>
              <router-link to="/promises/new">
                <el-button type="primary"> New Promise </el-button>
              </router-link>
              <router-link to="/politicians">
                <el-button type="primary"> New Politician </el-button>
              </router-link>
            </el-row>
            <el-row>
              <a href="https://www.facebook.com/openpromises.malaysia/" target="_blank">
                  <el-button type="default"> Facebook Page </el-button>
              </a>
              <a href="https://www.facebook.com/groups/1809117962724326/" target="_blank">
                  <el-button type="default"> Watchers Group </el-button>
              </a>
            </el-row>
    </el-card>
    <general-stats v-bind="{ generalStats }" />
  </div>
</template>

<script>
import { getGeneralStats } from '@/api'
import GeneralStats from '@/components/GeneralStats'

export default {
  name: 'Home',
  components: { GeneralStats },
  data () {
    return {
      generalStats: {}
    }
  },
  async created () {
    try {
      this.generalStats = await getGeneralStats()
    } catch (e) {
      alert(e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#slogan {
  font-weight: 300
}

#shortcuts {
  max-width: 900px;
  margin: 20px auto
}

.el-card .el-row {
  margin-bottom: 10px
}
</style>
