import app from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from './config'

class Firebase {
    constructor() {
        app?.initializeApp(firebaseConfig)
        this.auth = app?.auth()
    }

    async register(name, email, password) {
        const newUser = await this?.auth?.createUserWithEmailAndPassword(email, password)
        return await newUser?.user.updateProfile({
            displayName: name
        })
    }
}

const firebase = new Firebase();

export default firebase;