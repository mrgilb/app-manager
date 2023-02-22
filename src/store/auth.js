import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, database, addNewUser } from '../firebase'

export default {
  actions: {
    async register ({
      commit
    }, {
      email,
      password,
      name
    }) {
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password)

        await addNewUser(database, 'users/', response.user.uid, email, name)

        commit('setAuthState', true)
      } catch (exception) {
        commit('setError', exception)
      }
    },

    async login ({
      commit
    }, {
      email,
      password
    }) {
      try {
        const response = await signInWithEmailAndPassword(auth, email, password)

        console.log(response.user.uid)
        commit('setAuthState', true)
      } catch (exception) {
        commit('setError', exception)
      }
    },

    async logOut ({ commit }) {
      await signOut(auth)
      commit('setAuthState', false)
    }
  }
}
