import * as types from './types'
import Firebase from 'services/Firebase'

type AUTH_TYPE = {
	auth?: boolean
	uid?: string
}

const signin = (authPayload: AUTH_TYPE) => {
	localStorage.setItem('user', JSON.stringify(authPayload))
	return {
		type: types.SIGN_IN,
		payload: {
			...authPayload,
		},
	}
}

const signout = () => {
	const user = {
		auth: false,
		uid: '',
	}

	localStorage.removeItem('user')
	Firebase.signout()

	return {
		type: types.SIGN_OUT,
		payload: user,
	}
}

export { signin, signout }
