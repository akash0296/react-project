const initialState = {
	isLoading: false,
}

export interface ActionType {
	type: string
	payload: object
}

export default function sampleReducer(
	state: object = initialState,
	action: ActionType
) {
	switch (action.type) {
		default:
			return state
	}
}
