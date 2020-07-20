import React from 'react'
import { useSelector } from 'react-redux'
import { cloneDeep } from 'lodash'

import Firebase from 'services/Firebase'
import TextError from 'components/TextError'
import Loader from 'components/Loader'
import SignOutButton from 'components/Signout'
import Heading from 'elements/Heading'
import { INITIAL_FORM_STATE } from './duck/constants'
import { isObject } from 'util'
import validation from 'utils/validation'
import EditProfileForm from './components/EditProfileForm'
import ProfileImage from './components/ProfileImage'
import { ProfileBlock, ProfileHead } from './Home.styled'
import Notification from 'utils/Notification'
import {
	IMAGE_ERROR,
	ERRORS,
	ALL_FIELDS_MANATORY_ERROR,
	SOMETHING_WENT_WRONG,
	CHANGES_SAVED,
} from 'utils/constants'

const Home: React.FunctionComponent = () => {
	const uid = useSelector((state: any) => state.authState?.uid)
	const [isLoading, setIsLoading] = React.useState(false)
	const [userProfileData, setUserProfileData]: [any, any] = React.useState(null)
	const [profileImage, setProfileImage]: [any, any] = React.useState(null)
	const [userEmail, setUserEmail] = React.useState('')
	const [error, setError] = React.useState('')

	const formatFormData = (data: any) => {
		if (!data) return undefined
		const tempState = cloneDeep(INITIAL_FORM_STATE)
		Object.keys(tempState).forEach((key: string) => {
			if (data[key]) {
				tempState[key].value = data[key]
				tempState[key].prevValue = data[key]
			}
		})
		setUserProfileData(tempState)
	}

	const getResponse = React.useCallback(() => {
		setIsLoading(true)
		Firebase.db.ref(`users/${uid}`).on('value', snapshot => {
			const userData = snapshot.val()
			setIsLoading(false)
			formatFormData(userData)
			setUserEmail(userData?.email)
			setProfileImage(userData?.imageUrl)
			return userData
		})
	}, [uid])

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		changeFor: string
	) => {
		const tempFormState = { ...userProfileData }
		tempFormState[changeFor].value = event.target.value
		setUserProfileData(tempFormState)
	}

	const handleFileChange = (e: any) => {
		const image = e.target.files[0]
		if (image) {
			if (validation.validateImageFile(image)) {
				const imageData = {
					imageSrc: image,
					error: '',
					name: image.name,
				}
				setProfileImage(imageData)
			} else {
				const imageData = {
					imageSrc: '',
					error: IMAGE_ERROR,
					name: '',
				}
				setProfileImage(imageData)
			}
		}
	}

	const validateAllFields = () => {
		const tempData: any = { ...userProfileData }
		Object.keys(tempData).forEach((key: any) => {
			const validationKey = tempData[key].validation
			if (validationKey) {
				const isValid = tempData[key].validation(tempData[key].value)
				tempData[key].error = !isValid ? ERRORS[key] : ''
			}
		})
		return tempData
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault()
			const anyEmptyValue = Object.keys(userProfileData).some(
				(key: any) => !userProfileData[key].value
			)

			if (anyEmptyValue) {
				setError(ALL_FIELDS_MANATORY_ERROR)
				return
			}

			const tempProfileData = validateAllFields()

			const fieldsWithError = Object.keys(tempProfileData).some(
				key => tempProfileData[key].error
			)

			if (fieldsWithError) {
				setUserProfileData(tempProfileData)
				return
			}
			setIsLoading(true)

			const data = (function () {
				const dataObj: any = {}
				Object.keys(tempProfileData).forEach((key: string) => {
					if (tempProfileData[key].value !== tempProfileData[key].prevValue) {
						dataObj[key] = tempProfileData[key].value
					}
				})
				return dataObj
			})()

			setIsLoading(true)

			let imageUrl = null

			if (profileImage?.imageSrc && isObject(profileImage?.imageSrc)) {
				const uploadTask = await Firebase.storage
					.ref(`/images/${profileImage.name}`)
					.put(profileImage.imageSrc)

				imageUrl = await Firebase.storage
					.ref('images')
					.child(uploadTask.metadata.name)
					.getDownloadURL()
			}

			const userData = {
				...data,
				...(imageUrl ? { imageUrl } : {}),
			}

			if (Object.keys(userData).length) {
				await Firebase.updateUser(uid, userData)
				Notification.success({
					message: CHANGES_SAVED,
				})
			}
			setIsLoading(false)
		} catch (error) {
			const errorMessage = error.message || SOMETHING_WENT_WRONG
			setError(errorMessage)
			console.log(error.message)
		}
	}

	React.useEffect(() => {
		getResponse()
	}, [getResponse])

	return (
		<div className="App">
			{isLoading && <Loader />}
			{userProfileData && (
				<>
					<ProfileHead>
						<Heading text={`Welcome, ${userEmail}`} />
						<SignOutButton />
					</ProfileHead>
					<ProfileBlock>
						<EditProfileForm
							handleInputChange={handleChange}
							profileData={userProfileData}
							userEmail={userEmail}
							handleSubmit={handleSubmit}
						/>
						<ProfileImage
							imageData={profileImage}
							handleFileChange={handleFileChange}
						/>
					</ProfileBlock>
				</>
			)}
			{error && <TextError error={error} />}
		</div>
	)
}

export default Home
