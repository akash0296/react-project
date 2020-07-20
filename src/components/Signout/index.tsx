import React from 'react'
import { useDispatch } from 'react-redux'

import Button from 'elements/Button'
import { signout } from 'services/Authentication/duck/actions'

const SignOutButton = () => {
	const dispatch = useDispatch()

	const handleSignout = () => {
		dispatch(signout())
	}

	return <Button title="Sign Out" onClick={handleSignout} />
}

export default SignOutButton
