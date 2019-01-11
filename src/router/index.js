import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Promises from '@/views/Promises'
import Politicians from '@/views/Politicians'
import Politician from '@/views/Politician'
import Contributors from '@/views/Contributors'
import Auth from '@/components/Auth'
import Account from '@/views/Account'
import PromiseEditor from '@/components/PromiseEditor'
import PoliticianEditor from '@/components/PoliticianEditor'
import Stats from '@/views/Stats'
import Promise from '@/views/Promise'
import ReviewNeeded from '@/views/ReviewNeeded'
import Sandbox from '@/views/Sandbox'

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

const routes = [
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
    path: '/promises/review-needed',
    name: 'Review Needed',
    component: ReviewNeeded,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/promises/new',
    name: 'New Promise',
    component: PromiseEditor,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/promises/:id',
    name: 'Promise',
    component: Promise,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/promises/:id/edit',
    name: 'Edit Promise',
    component: PromiseEditor,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/politicians/new',
    name: 'New Politician',
    component: PoliticianEditor,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/politicians/:id',
    name: 'Politician',
    component: Politician,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/politicians/:id/edit',
    name: 'Edit Politician',
    component: PoliticianEditor,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/stats',
    name: 'Stats',
    component: Stats,
    beforeEnter: ifAuthenticated
  }
]

if (process.env.NODE_ENV === 'development') {
  routes.push({
    path: '/sandbox',
    name: 'Sandbox',
    component: Sandbox
  })
}

export default new Router({
  mode: 'history',
  routes
})
