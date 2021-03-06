import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  user: {
    authenticated: false
  },
  stats: {},
  politicians: [],
  contributors: [],
  promises: []
}

const mutations = {
  login (state, user) {
    state.user = { ...user, authenticated: true }
  },
  logout (state) {
    state.user = {}
  },
  cacheStats (state, stats) {
    state.stats = { ...stats }
  },
  cachePoliticians (state, politicians) {
    state.politicians = [...politicians]
  },
  cacheContributors (state, contributors) {
    state.contributors = [...contributors]
  },
  cachePromises (state, promises) {
    state.promises = [...promises]
  },
  cacheLists (state, lists) {
    state.lists = [...lists]
  }
}

export default new Vuex.Store({
  state,
  mutations,
  plugins: [createPersistedState()]
})
