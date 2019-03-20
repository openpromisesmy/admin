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
const getContributor = id => getSomething(`/contributors/${id}`)
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

const mockLists = [
  {
    id: 'm54ertdfgcv',
    live: false,
    title: 'Student Aids',
    contributor_id: '-LAEDTAC6HQeWYrV3atG',
    created_at: "2019-03-17T18:35:05.441Z",
    updated_at: "2019-03-17T18:35:05.441Z",
    promise_ids: [
      'CeX1MLvSq7IVx3nI1CgI',
      'U5zwNgRbdu0NZRjFLoBF',
      'o3lyMjqZrCALP6HSUZFS'
    ]
  },
  {
    id: 'ytughjbsdf8t7yiu',
    live: true,
    title: 'Broadband service in Malaysia',
    contributor_id: '-LAEDTAC6HQeWYrV3atG',
    created_at: "2019-03-17T18:35:05.441Z",
    updated_at: "2019-03-17T18:35:05.441Z",
    promise_ids: [
      'XjGLsRtJ9spk5VeBidDl',
      'bGvbmCPqIcpWQIZAp92C'
    ]
  }
]

// TODO: replace with real
const listLists = () => mockLists
const getList = id => mockLists.find(x => x.id === id)
const postList = data => ({ id: mockLists[0].id })
const updateList = data => ({ id: mockLists[1].id })

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
  getGeneralStats,
  listLists,
  getList,
  postList,
  updateList
}
