/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import store from 'store'
import { addEpic } from './createStore'

type ActionTypes = {
	type: string
	payload: object | any
}

/**
 * @description Helper util to create reducer dynmically with action types and initial state
 * @param initialState - initial state of the reducer.
 * @example
 * import { createReducer } from 'utils/reducerUtil'
 * import * as types from 'your-types-export-file'
 * const initialState = {}
 * createReducer(initialState)(types)
 */
export const createReducer = (initialState = {}) =>
	/**
	 * @param types - all action types exports
	 * @return Function
	 */
	(types: string | object) => (state = initialState, action: ActionTypes) => {
		const typeKeys = typeof types === 'string' ? [types] : Object.values(types)
		for (let i = 0; i < typeKeys.length; i += 1) {
			if (action.type === typeKeys[i]) {
				return {
					...state,
					...action.payload,
				}
			}
		}

		return state
	}

/**
 * @description Remove a reducer from redux store.
 * @param key - registered reducer key name.
 */
export const unsyncReducer = (key: string) => {
	return store.removeDynamicReducer(key)
}

/**
 * @description HOC to dynamically register a wrappedComponent with a reducer and the epics.
 * @param reducerKey - key name of the reducer that is being registered.
 * @param reducer - reducer function that needs to registered.
 * @param epics - All or single observables epics.
 */
export const syncWithReducer = (
	reducerKey: string,
	reducers: any,
	epics?: any
) => (WrappedComponent: any) => {
	const Extended = (props: object) => {
		if (reducerKey && reducers) {
			store.addDynamicReducer(reducerKey, reducers)
		}
		if (epics) {
			addEpic(epics)
		}

		return <WrappedComponent {...props} />
	}

	return Extended
}
