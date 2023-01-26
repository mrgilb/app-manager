import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default {
  actions: {
    async register ({ dispath, commit }, { email, password }) {
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password)

        console.log(response)
      } catch (exception) {
        console.log(exception)
      }
    }
  }
}
