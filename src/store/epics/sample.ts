import { ofType } from 'redux-observable'
import { delay, mapTo } from 'rxjs/operators'

export interface EpicType {
	pipe: any
}

const epic = (action$: EpicType) =>
	action$.pipe(
		ofType('PING'),
		delay(100),
		mapTo({ type: 'PONG', value: 'epic3' })
	)

export default epic
