import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Promises from '@/components/Promises'
import Politicians from '@/components/Politicians'
import Politician from '@/components/Politician'
import Contributors from '@/components/Contributors'
import Auth from '@/components/Auth'
import Account from '@/components/Account'
import PromiseEditor from '@/components/PromiseEditor'
import PoliticianEditor from '@/components/PoliticianEditor'

import store from '../store'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (store.state.user.status !== 'Admin') {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.state.user.status === 'Admin') {
    next()
    return
  }
  next('/login')
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/promises',
      name: 'Promises',
      component: Promises,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/politicians',
      name: 'Politicians',
      component: Politicians,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/contributors',
      name: 'Contributors',
      component: Contributors,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/login',
      name: 'Login',
      component: Auth,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/promises/new',
      name: 'New Promise',
      component: PromiseEditor,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/promises/:id/edit',
      name: 'Edit Promise',
      component: PromiseEditor,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/politicians/:id',
      name: 'Politician',
      component: Politician,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/politicians/new',
      name: 'New Politician',
      component: PoliticianEditor,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/politicians/:id/edit',
      name: 'Edit Politician',
      component: PoliticianEditor,
      beforeEnter: ifAuthenticated
    }
  ]
})
