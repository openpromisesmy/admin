import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Promises from '@/components/Promises'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/promises',
      name: 'Promises',
      component: Promises
    }
  ]
})
