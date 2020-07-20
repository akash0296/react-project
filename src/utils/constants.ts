const SOMETHING_WENT_WRONG = 'Something went wrong, please try again'
const ALL_FIELDS_MANATORY_ERROR = 'All fields are mandatory'
const CHANGES_SAVED = 'Changes successfully saved'

const ERRORS: any = {
	firstName: 'Cannot be empty',
	lastName: 'Cannot be empty',
	age: 'Enter a valid age',
	phoneNumber: 'Enter a valid phone number',
	address: 'Cannot be empty',
	email: 'Enter a valid email address',
	password: 'Password must be at least eight characters long with a number',
}

const IMAGE_ERROR = 'Invalid image file'

export {
	ALL_FIELDS_MANATORY_ERROR,
	ERRORS,
	IMAGE_ERROR,
	SOMETHING_WENT_WRONG,
	CHANGES_SAVED,
}
