import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, database, addNewUser } from '../firebase'

export default {
  actions: {
    async register ({ dispath, commit }, { email, password }) {
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password)

        await addNewUser(database, 'users/', response.user.uid, email)
      } catch (exception) {
        commit('setError', exception)
      }
    },

    async login ({ dispath, commit }, { email, password }) {
      try {
        const response = await signInWithEmailAndPassword(auth, email, password)

        console.log(response)
      } catch (exception) {
        commit('setError', exception)
      }
    }
  }
}
