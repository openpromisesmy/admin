import axios from 'axios'
import {
  getSomething,
  postSomething,
  updateSomething
} from './utils'
import {
  googleSignIn,
  googleLogout
} from './google'

const PROMISES_PATH = '/promises/'
const PROMISE_UPDATES_PATH = '/promiseUpdates/'
const POLITICIANS_PATH = '/politicians/'

axios.interceptors.response.use(
  function (response) {
    return response
  }, function (error) {
    if (!error.response) {
      alert('no response from API')
    }
    if (error.response.status === 401) {
      alert(`${error.response.data} [401] Try logging out then logging back in.`)
    }
    return Promise.reject(error)
  })

const listContributors = () => getSomething('/contributors/')
const getContributor = id => getSomething(`/contributors/?id=${id}`)
const getContributorByEmail = email => getSomething(`/contributors/?email=${email}`)

const listPoliticians = () => getSomething(POLITICIANS_PATH + 'all?orderBy=name')
const getPolitician = id => getSomething(`/politicians/${id}`)
const postPolitician = data => postSomething(POLITICIANS_PATH, data)
const updatePolitician = data => updateSomething(`${POLITICIANS_PATH}${data.id}`, data)

const listPoliticianPromises = id => getSomething(PROMISES_PATH + 'all?politician_id=' + id)

const listPromises = query => getSomething(PROMISES_PATH + 'all?' + query)
const getPromise = id => getSomething(PROMISES_PATH + id)
const postPromise = data => postSomething(PROMISES_PATH, data)
const updatePromise = data => updateSomething(`${PROMISES_PATH}${data.id}`, data)

const listPromiseUpdates = query => getSomething(PROMISE_UPDATES_PATH + 'all' + query)
const getPromiseUpdate = id => getSomething(PROMISE_UPDATES_PATH + id)
const postPromiseUpdate = data => postSomething(PROMISE_UPDATES_PATH, data)
const updatePromiseUpdate = data => updateSomething(`${PROMISE_UPDATES_PATH}${data.id}`, data)

const getGeneralStats = () => getSomething('/stats/general_stats')

export {
  googleSignIn,
  googleLogout,
  getContributor,
  getContributorByEmail,
  getPolitician,
  listContributors,
  listPoliticians,
  postPromise,
  postPromiseUpdate,
  postPolitician,
  listPromises,
  listPromiseUpdates,
  listPoliticianPromises,
  getPromise,
  getPromiseUpdate,
  updatePromise,
  updatePromiseUpdate,
  updatePolitician,
  getGeneralStats
}
