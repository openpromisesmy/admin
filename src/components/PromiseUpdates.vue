<template>
  <main>
      <el-card
        v-for="promiseUpdate in promiseUpdates"
        :key="promiseUpdate.id"
        v-if="promiseUpdates.length > 0"
      >
        <p
          v-for="(value,key) in promiseUpdate"
          :key="key"
        >
          <b>{{ key }}</b>: {{ value }}
        </p>
      </el-card>
      <promise-update-editor
        :contributors="contributors"
        :promiseID="promiseID"
        mode="new"
      />
  </main>
</template>

<script>
import PromiseUpdateEditor from '@/components/PromiseUpdateEditor'

export default {
  name: 'PromiseUpdates',
  props: ['promiseUpdates', 'contributors', 'promiseID'],
  components: { PromiseUpdateEditor }
}
</script>

<style scoped>
</style>
