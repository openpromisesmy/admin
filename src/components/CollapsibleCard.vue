<template>
  <el-card>
    <h1>{{ title }}
        <el-button type="success" v-if="!show" @click="toggleShow">
          View
        </el-button>
        <el-button type="primary" v-else @click="toggleShow">
          Hide
        </el-button>
    </h1>
    <slot v-if="show"/>
  </el-card>
</template>

<script>
export default {
  name: 'CollapsibleCard',
  data: () => ({
    show: false
  }),
  props: {
    title: {
      type: String,
      default: 'Collapsible'
    },
    buttonText: {
      type: String,
      default: 'View'
    }
  },
  methods: {
    toggleShow () {
      this.show = !this.show
    }
  }
}
</script>
