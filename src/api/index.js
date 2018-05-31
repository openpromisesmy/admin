import { firebase, API_URL } from '@/config'
import axios from 'axios'
const provider = new firebase.auth.GoogleAuthProvider()

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
    const { data } = response
    return data
  } catch (e) {
    console.error(e)
  }
}

const getContributor = email => getSomething(`/contributors/?email=${email}`)

export {
  googleSignIn,
  googleLogout,
  getContributor
}
