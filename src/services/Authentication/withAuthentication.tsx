import React from 'react'
import { useDispatch } from 'react-redux'

import Firebase from 'services/Firebase'
import { syncWithReducer } from 'utils/reducerUtil'
import reducer from './duck/reducer'
import { signout } from './duck/actions'

const Authentication = (WrappedComponent: any) =>
	function AuthenticationContainer() {
		const dispatch = useDispatch()

		React.useEffect(() => {
			// Handling firebase session
			const listener = Firebase.auth.onAuthStateChanged((authUser: any) => {
				if (!authUser) {
					dispatch(signout())
				}
			})

			return () => {
				listener()
			}
		}, [dispatch])

		return <WrappedComponent />
	}

const withAuthentication = (Component: any) =>
	syncWithReducer('authState', reducer)(Authentication(Component))

export default withAuthentication
