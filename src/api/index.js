import { firebase, API_URL } from '@/config'
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

export {
  googleSignIn,
  googleLogout
}
