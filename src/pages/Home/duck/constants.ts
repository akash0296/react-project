import validation from 'utils/validation'

const INITIAL_FORM_STATE: any = {
	firstName: {
		label: 'first name',
		type: 'text',
		value: '',
		error: '',
		prevValue: '',
		validation: (value: string) => validation.checkIfEmptyField(value),
	},
	lastName: {
		label: 'last name',
		type: 'text',
		value: '',
		error: '',
		prevValue: '',
		validation: (value: string) => validation.checkIfEmptyField(value),
	},
	age: {
		label: 'age',
		type: 'text',
		value: '',
		error: '',
		prevValue: '',
		validation: (value: string) => validation.validateAge(value),
	},
	phoneNumber: {
		label: 'phone number',
		type: 'text',
		value: '',
		error: '',
		validation: (value: string) => validation.checkContactNumber(value),
	},
	address: {
		label: 'address',
		type: 'text',
		value: '',
		error: '',
		prevValue: '',
		validation: (value: string) => validation.checkIfEmptyField(value),
	},
}

export { INITIAL_FORM_STATE }
