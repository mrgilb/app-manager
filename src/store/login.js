import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default {
  actions: {
    async login ({ dispath, commit }, { email, password }) {
      try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        console.log(response)
      } catch (exception) {
        console.log(exception)
      }
    }
  }
}
