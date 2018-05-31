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
      authenticated: this.$store.state.user.authenticated,
      status: this.$store.state.user.status
    }
  },
  methods: {
    googleSignInHandler: async function () {
      try {
        const user = await googleSignIn()
        const userData = await getContributor(user.email)
        this.$store.commit('login', Object.assign({}, user, userData[0]))
        this.$router.push('/home')
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style>
</style>
