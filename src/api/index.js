import { firebase, API_URL } from '@/config'
import axios from 'axios'
const provider = new firebase.auth.GoogleAuthProvider()

const PROMISES_PATH = '/promises/'
const POLITICIANS_PATH = '/politicians/'

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('openpromises_token')
    const email = localStorage.getItem('openpromises_email')
    const name = localStorage.getItem('openpromises_name')
    const photo = localStorage.getItem('openpromises_photo')
    if (token) {
      config.headers['X-FIREBASE-TOKEN'] = token
      config.headers['X-USER-EMAIL'] = email
      config.headers['X-USER-NAME'] = name
      config.headers['X-USER-PHOTO'] = photo
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    return response
  }, function (error) {
    console.error(error)
    if (error.response.status === 401) {
      alert(`${error.response.data} [401] Try logging out then logging back in.`)
    }
    return Promise.reject(error)
  })

function googleSignIn () {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const raw = result.user
        let user = {}

        user.name = raw.displayName
        user.email = raw.email
        user.photoURL = raw.photoURL

        firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(idToken => {
            user.token = idToken
            localStorage.setItem('openpromises_token', idToken)
            localStorage.setItem('openpromises_email', user.email)
            localStorage.setItem('openpromises_name', user.name)
            localStorage.setItem('openpromises_photo', user.photoURL)
            resolve(user)
          })
          .catch(error => {
            reject(error)
          })
      })
      .catch(error => {
        console.error(error)
        reject(error)
      })
  })
}

function googleLogout () {
  return new Promise((resolve, reject) => {
    firebase.auth().signOut().then(function () {
      resolve()
    }, function (error) {
      reject(error)
    })
  })
}

async function getSomething (path) {
  try {
    const response = await axios.get(API_URL + path)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

async function updateSomething (path, data) {
  try {
    delete data.id
    delete data.created_at
    delete data.updated_at
    const response = await axios.post(API_URL + path, data)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

const getContributor = email => getSomething(`/contributors/?email=${email}`)
const getPromise = id => getSomething(PROMISES_PATH + id)
const listContributors = () => getSomething('/contributors/')
const listPoliticians = () => getSomething(POLITICIANS_PATH + 'all')
const listPromises = () => getSomething(PROMISES_PATH + 'all')

const updatePromise = data => updateSomething(`${PROMISES_PATH}${data.id}`, data)

export {
  googleSignIn,
  googleLogout,
  getContributor,
  listContributors,
  listPoliticians,
  listPromises,
  getPromise,
  updatePromise
}
