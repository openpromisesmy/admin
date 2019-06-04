import { firebase, API_URL } from '@/config'
import axios from 'axios'

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
    await setAuthData()
    const response = await axios.post(API_URL + path, data)
    return response.data
  } catch (e) {
    throw e
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
    throw e
  }
}

export {
  getSomething,
  postSomething,
  updateSomething
}
