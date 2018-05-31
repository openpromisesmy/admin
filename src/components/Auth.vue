<template>
  <main class="auth">
      <template v-if="!authenticated">
        <h1>Login or Sign Up</h1>
        <el-button type="primary" v-on:click="googleSignInHandler">Google Sign In</el-button>
      </template>
  </main>
</template>

<script>
import { googleSignIn, getContributor } from '@/api'

export default {
  name: 'Auth',
  data () {
    return {
      authenticated: this.$store.state.user.authenticated
    }
  },
  methods: {
    googleSignInHandler: async function () {
      try {
        const user = await googleSignIn()
        const userData = await getContributor(user.email)
        this.$store.commit('login', Object.assign({}, user, userData[0]))
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style>
</style>
