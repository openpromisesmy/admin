<template>
  <el-button @click="onClick" :type="type" class="action-button">
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
    },
    type: {
      type: String
    }
  }
}
</script>

<style scoped>
.action-button {
  position: fixed;
  bottom: 10px;
  right: 10px;
  padding: 20px;
  font-size: 2rem;
}
</style>
