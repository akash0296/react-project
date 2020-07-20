import { BehaviorSubject } from 'rxjs'
import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { mergeMap } from 'rxjs/operators'

import staticReducers from 'store/reducers'
import staticEpics from 'store/epics'

let epic$: any = null
let epicMiddleware: any = null

/**
 * @description Inject Epic dynamically at runtime.
 * @param asyncEpic - single epic or array of epics to be added.
 */
export function addEpic(asyncEpic: []) {
	if (Array.isArray(asyncEpic)) {
		return asyncEpic.forEach(epic => epic$.next(epic))
	}

	return epic$.next(asyncEpic)
}

/**
 * Function responsible for creating and configuring redux store,
 * also registers all the static reducers and epics with methods supporting dynamic reducer registering.
 * @param reducerMap - static reducers
 */
export default (reducerMap: object) => {
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

	const injectAsyncReducers = (
		store: any,
		name: string,
		reducers: object | any
	) => {
		let asyncReducers = null

		if (typeof reducers === 'function') {
			asyncReducers = reducers
		}

		if (typeof reducers === 'object') {
			asyncReducers = combineReducers(reducers)
		}

		store.asyncReducers[name] = asyncReducers
		store.replaceReducer(
			combineReducers({
				...reducerMap,
				...store.asyncReducers,
			})
		)
	}

	epicMiddleware = createEpicMiddleware()
	epic$ = new BehaviorSubject(combineEpics(...staticEpics))

	const rootEpic = (action$: object, state$: object) =>
		epic$.pipe(mergeMap((epic: any) => epic(action$, state$)))

	const store: any = createStore(
		combineReducers(staticReducers),
		composeEnhancers(applyMiddleware(epicMiddleware))
	)

	epicMiddleware.run(rootEpic)

	store.asyncReducers = {}
	store.addDynamicReducer = (name: string, reducers: any) => {
		injectAsyncReducers(store, name, reducers)
	}
	store.removeDynamicReducer = (name: string) => {
		const noopReducer = (state = {}) => state
		injectAsyncReducers(store, name, noopReducer)
	}

	return store
}
