/// <reference types="react-scripts" />
/**
 * This is an extension of .env file to add support for environmental variables to the typscript compiler.
 * Change the example variables with your required variables.
 */
declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'test'
		REACT_APP_APIKEY: string
		REACT_APP_AUTHDOMAIN: string
		REACT_APP_DATABASEURL: string
		REACT_APP_PROJECTID: string
		REACT_APP_STORAGEBUCKET: string
		REACT_APP_MESSAGINGSENDERID: string
		REACT_APP_APPID: string
	}
}

interface Window {
	// add you custom properties and methods
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}
