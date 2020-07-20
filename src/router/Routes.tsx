import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'

import routeConfig from './config'
import { withAuthentication } from 'services/Authentication'
import Layout from 'components/Layout'
import Loader from 'components/Loader'

const Routes = () => {
	const authState = useSelector((state: any) => state?.authState?.auth)

	return (
		<Suspense fallback={<Loader />}>
			<Layout>
				<Router>
					<Switch>
						{routeConfig.map((routeProp, index) =>
							routeProp.common || routeProp.auth === authState ? (
								<Route key={index} {...routeProp} />
							) : null
						)}
						{!authState && <Redirect from="*" to="/signin" />}
					</Switch>
				</Router>
			</Layout>
		</Suspense>
	)
}

export default withAuthentication(Routes)
