<template>
  <el-card id="PromiseStats">
    <b>Total Promises Made: {{ promises.length }}</b>
    <div v-for="stat in stats" :key="stat.value">
      <span>{{ stat.value }}</span>
      <vue-slide-bar
        v-model="stat.number"
        :max="promises.length"
        :processStyle="sliderCustomzie.processStyle"
        :lineHeight="sliderCustomzie.lineHeight"
        :tooltipStyles="sliderCustomzie.tooltipStyles"
        :isDisabled="true"
      />
      <span>{{ promises.length }}</span>
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
          backgroundColor: '#42b883'
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
  max-width: 500px;
  margin: 0 auto
}
</style>
