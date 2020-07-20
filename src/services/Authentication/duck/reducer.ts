import { createReducer } from 'utils/reducerUtil'
import * as types from './types'

const initialState =
	localStorage.getItem('user') !== null
		? JSON.parse(localStorage.getItem('user') || '{}')
		: { auth: false }

export default createReducer(initialState)(types)
