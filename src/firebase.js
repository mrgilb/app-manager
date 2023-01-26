import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase, ref, set } from 'firebase/database'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: 'testvue-1a3ee.firebaseapp.com',
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: 'testvue-1a3ee',
  storageBucket: 'testvue-1a3ee.appspot.com',
  messagingSenderId: '1579712608',
  appId: '1:1579712608:web:7ff1f1684949a1d5278305',
  measurementId: 'G-3Q66RQ64HL'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const database = getDatabase(app)
export const auth = getAuth(app)

export async function addNewUser (database, url, uId, email) {
  await set(ref(database, url + uId), {
    user: email
  })
}

// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user
//     console.log(user)
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code
//     const errorMessage = error.message

//     console.log(errorCode, errorMessage)
//     // ..
//   })
