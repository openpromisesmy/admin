<template>
  <el-card id="PromiseStats">
    <b>Total Promises Made: {{ promises.length }}</b>
    <div v-for="stat in stats" :key="stat.value">
      <el-row>
        <el-col :span="8">
          <b>{{ stat.value }}</b>
        </el-col>
        <el-col :span="8">
          <vue-slide-bar
            v-model="stat.number"
            :max="promises.length"
            :processStyle="sliderCustomzie.processStyle"
            :lineHeight="sliderCustomzie.lineHeight"
            :tooltipStyles="sliderCustomzie.tooltipStyles"
            :isDisabled="true"
            :show-tooltip="false"
          />
        </el-col>
        <el-col :span="8">
          <span><b>{{ stat.number }}</b> out of<b> {{ promises.length }}</b></span>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import { generateStats } from '@/utils'
import VueSlideBar from 'vue-slide-bar'

export default {
  name: 'PromiseStatsWidget',
  components: { VueSlideBar },
  props: [ 'promises' ],
  computed: {
    stats: function () {
      return generateStats(this.promises)
    }
  },
  data () {
    return {
      sliderCustomzie: {
        // val: 9,
        lineHeight: 20,
        processStyle: {
          backgroundColor: '#42b883',
          borderRadius: '2px'
        },
        tooltipStyles: {
          backgroundColor: '#42b883',
          borderColor: '#42b883'
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#PromiseStats {
  max-width: 600px;
  margin: 0 auto
}

.vue-slide-bar-component {
  padding-top: 0px !important
}

.vue-slide-bar {
  border-radius: none !important
}

.el-row {
  margin: 10px auto
}
</style>
