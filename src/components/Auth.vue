<template>
  <main class="auth">
      <template v-if="appStatus === 'loading'">
        <p>Signing in...</p>
      </template>
      <template v-else-if="!authenticated">
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
      appStatus: '',
      authenticated: this.$store.state.user.authenticated,
      status: this.$store.state.user.status
    }
  },
  methods: {
    googleSignInHandler: async function () {
      try {
        const user = await googleSignIn()
        this.appStatus = 'loading'
        const userData = await getContributor(user.email)
        this.appStatus = ''
        this.$store.commit('login', Object.assign({}, user, userData[0]))
        this.$router.push('/')
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style>
</style>
