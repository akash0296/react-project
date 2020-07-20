import { lazy } from 'react'

type RouteConfig = {
	path?: string
	exact?: boolean
	component?: any
	render?: any
	title?: string
	auth?: boolean
	common?: boolean
}

const routerConfig: RouteConfig[] = [
	{
		title: 'Home',
		path: '/',
		exact: true,
		component: lazy(() => import('pages/Home')),
		auth: true,
	},
	{
		title: 'Signin',
		path: '/signin',
		component: lazy(() => import('pages/Signin')),
		auth: false,
	},
	{
		title: 'Signup',
		path: '/signup',
		component: lazy(() => import('pages/Signup')),
		auth: false,
	},
	{
		component: lazy(() => import('pages/NotFound')),
		auth: true,
	},
]

export default routerConfig
