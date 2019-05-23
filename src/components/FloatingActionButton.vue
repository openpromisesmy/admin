<template>
  <el-button @click="onClick">
    {{ text }}
  </el-button>
</template>

<script>
export default {
  name: 'FloatingActionButton',
  props: {
    text: {
      type: String
    },
    onClick: {
      type: Function
    }
  }
}
</script>
