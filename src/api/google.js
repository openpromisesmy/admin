import { firebase } from '@/config'

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

export {
  googleSignIn,
  googleLogout
}
