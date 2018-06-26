import { firebase, API_URL } from '@/config'
import axios from 'axios'
const provider = new firebase.auth.GoogleAuthProvider()

const PROMISES_PATH = '/promises/'
const POLITICIANS_PATH = '/politicians/'

async function setAuthData () {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        axios.interceptors.request.use(
          async function (config) {
            const email = localStorage.getItem('openpromises_email')
            // if (firebase.auth().currentUser) {
            config.headers['X-FIREBASE-TOKEN'] = await firebase.auth().currentUser.getIdToken()
            config.headers['X-USER-EMAIL'] = email
            // }
            return config
          },
          function (error) {
            return Promise.reject(error)
          }
        )
        resolve(user)
      } else {
        // No user is signed in.
      }
    })
  })
}

axios.interceptors.response.use(
  function (response) {
    return response
  }, function (error) {
    if(!error.response) {
      alert('no response from API')
    }
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
    await setAuthData()
    const response = await axios.get(API_URL + path)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

async function postSomething (path, data) {
  try {
    const response = await axios.post(API_URL + path, data)
    return response.data
  } catch (e) {
    console.error(e)
    return e
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
    return e
  }
}

const getContributor = email => getSomething(`/contributors/?email=${email}`)
const getPolitician = id => getSomething(`/politicians/${id}`)
const getPromise = id => getSomething(PROMISES_PATH + id)
const listContributors = () => getSomething('/contributors/')

const postPromise = data => postSomething(PROMISES_PATH, data)
const postPolitician = data => postSomething(POLITICIANS_PATH, data)
const listPoliticians = () => getSomething(POLITICIANS_PATH + 'all')
const listPromises = () => getSomething(PROMISES_PATH + 'all')

const updatePromise = data => updateSomething(`${PROMISES_PATH}${data.id}`, data)
const updatePolitician = data => updateSomething(`${POLITICIANS_PATH}${data.id}`, data)

export {
  googleSignIn,
  googleLogout,
  getContributor,
  getPolitician,
  listContributors,
  listPoliticians,
  postPromise,
  postPolitician,
  listPromises,
  getPromise,
  updatePromise,
  updatePolitician
}
