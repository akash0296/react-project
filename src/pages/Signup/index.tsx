import React from 'react'
import { useDispatch } from 'react-redux'
import { cloneDeep } from 'lodash'

import Banner from 'components/Banner'
import Loader from 'components/Loader'
import Heading from 'elements/Heading'
import validation from 'utils/validation'
import Firebase from 'services/Firebase'
import { signin } from 'services/Authentication/duck/actions'
import Form from './components/Form'
import ProfileImage from './components/ProfileImage'
import { INITIAL_FORM_STATE } from './duck/constants'
import {
	ALL_FIELDS_MANATORY_ERROR,
	ERRORS,
	IMAGE_ERROR,
	SOMETHING_WENT_WRONG,
} from 'utils/constants'
import { SignupBlock } from './Signup.styled'

type SignupDataType = {
	email: string
	password: string
}

type Prop = {
	firebase: any
	history: any
}

type ImageAsFile = {
	imageAsFile: null | {
		name: string
	}
}

const Signup = ({ history }: Prop) => {
	const [signupData, setSignupData] = React.useState(
		cloneDeep(INITIAL_FORM_STATE)
	)
	const [error, setError]: [any, any] = React.useState(null)
	const [imageAsFile, setImageAsFile]: [any, any] = React.useState(null)
	const [isLoading, setIsLoading] = React.useState(false)

	const dispatch = useDispatch()

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		changeFor: string
	) => {
		const tempFormState = { ...signupData }
		tempFormState[changeFor].value = event.target.value
		setSignupData(tempFormState)
	}

	const handleFileChange = async (e: any) => {
		const image = e.target.files[0]
		if (image) {
			if (validation.validateImageFile(image)) {
				const imageData = {
					imageSrc: image,
					error: '',
					name: image.name,
				}
				setImageAsFile(imageData)
			} else {
				const imageData = {
					imageSrc: '',
					error: IMAGE_ERROR,
					name: '',
				}
				setImageAsFile(imageData)
			}
		}
	}

	const validateAllFields = () => {
		const tempSignupData: any = { ...signupData }
		Object.keys(tempSignupData).forEach((key: any) => {
			const validationKey = tempSignupData[key].validation
			if (validationKey) {
				const isValid = tempSignupData[key].validation(
					tempSignupData[key].value
				)
				tempSignupData[key].error = !isValid ? ERRORS[key] : ''
			}
		})

		return tempSignupData
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault()
			const anyEmptyValue = Object.keys(signupData).some(
				(key: any) => !signupData[key].value
			)

			if (anyEmptyValue) {
				setError(ALL_FIELDS_MANATORY_ERROR)

				return
			}

			const tempSignupData = validateAllFields()

			const fieldsWithError = Object.keys(tempSignupData).some(
				key => tempSignupData[key].error
			)

			if (fieldsWithError) {
				setSignupData(tempSignupData)

				return
			}
			setIsLoading(true)
			const {
				email: { value: email },
				password: { value: password },
			} = signupData

			const data = (function () {
				const obj: any = {}
				Object.keys(signupData).forEach((key: any) => {
					if (key !== 'password') {
						obj[key] = signupData[key].value
					}
				})

				return obj
			})()

			// Cannot use subscription model as it'll result in callback hell
			let imageUrl = null

			if (imageAsFile && imageAsFile.imageSrc) {
				const uploadTask = await Firebase.storage
					.ref(`/images/${imageAsFile.name}`)
					.put(imageAsFile.imageSrc)

				imageUrl = await Firebase.storage
					.ref('images')
					.child(uploadTask.metadata.name)
					.getDownloadURL()
			}

			const singupUser = await Firebase.createUserWithEmailAndPassword(
				email,
				password
			)

			const uid: any = singupUser?.user?.uid

			const userData = {
				...data,
				...(imageUrl ? { imageUrl } : {}),
			}

			await Firebase.saveUser(uid, userData)

			const authData = {
				auth: true,
				uid,
			}
			dispatch(signin(authData))
			history.push('/')
		} catch (error) {
			const errorMessage = error.message || SOMETHING_WENT_WRONG
			setError(errorMessage)
			throw error
		}
	}

	return (
		<Banner>
			{isLoading && <Loader />}
			<SignupBlock>
				<Heading text="Sign Up" />
				<ProfileImage
					imageData={imageAsFile}
					handleFileChange={handleFileChange}
				/>
				<Form
					handleInputChange={handleChange}
					handleSubmit={handleSubmit}
					formData={signupData}
					error={error}
				/>
			</SignupBlock>
		</Banner>
	)
}

export default Signup
