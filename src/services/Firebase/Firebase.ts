import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

const config = {
	apiKey: process.env.REACT_APP_APIKEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
	databaseURL: process.env.REACT_APP_DATABASEURL,
	projectId: process.env.REACT_APP_PROJECTID,
	storageBucket: process.env.REACT_APP_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
	appId: process.env.REACT_APP_APPID,
}

class Firebase {
	auth: app.auth.Auth
	storage: app.storage.Storage
	db: app.database.Database
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.storage = app.storage()
		this.db = app.database()
	}

	/**
	 * Auth APIS
	 */
	createUserWithEmailAndPassword = (email: string, password: string) =>
		this.auth.createUserWithEmailAndPassword(email, password)

	signInWithEmailAndPassword = (email: string, password: string) =>
		this.auth.signInWithEmailAndPassword(email, password)

	signout = () => this.auth.signOut()

	/**
	 * User profile data APIS
	 */

	getUser = (uid: string) => {
		return this.db.ref(`users/${uid}`).on('value', snapshot => {
			const userData = snapshot.val()
			return userData
		})
	}

	saveUser = (uid: string, data: object) => {
		return this.db.ref('users').child(uid).set(data)
	}

	updateUser = (uid: string, data: object) => {
		return this.db.ref(`users/${uid}`).update(data)
	}
}

export default Firebase
