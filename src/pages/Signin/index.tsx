import React from 'react'
import { useDispatch } from 'react-redux'
import { from, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { cloneDeep } from 'lodash'

import Loader from 'components/Loader'
import { User } from 'assets/images'
import Banner from 'components/Banner'
import Firebase from 'services/Firebase'
import { signin } from 'services/Authentication/duck/actions'
import Form from './components/Form'
import { INITIAL_STATE } from './duck/constants'
import { SigninBlock, Figure } from './Signin.styled'
import Heading from 'elements/Heading'

type Props = {
	history?: any
}

const Signin = ({ history }: Props) => {
	const [signinData, setSigninData] = React.useState(cloneDeep(INITIAL_STATE))
	const [isLoading, setIsLoading] = React.useState(false)
	const dispatch = useDispatch()

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		changeFor: string
	) => {
		const tempFormState = JSON.parse(JSON.stringify(signinData))
		tempFormState[changeFor].value = event.target.value
		setSigninData(tempFormState)
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsLoading(true)

		const {
			email: { value: email },
			password: { value: password },
		} = signinData

		const $signup = from(Firebase.signInWithEmailAndPassword(email, password))

		$signup
			.pipe(
				map(response => response),
				catchError(error => {
					return of({
						...error,
					})
				})
			)
			.subscribe(response => {
				setIsLoading(false)
				if (response.code) {
					const tempState = { ...signinData }
					tempState.error = response
					setSigninData(tempState)
				} else {
					const uid = response?.user?.uid
					dispatch(
						signin({
							auth: true,
							uid,
						})
					)
					history.push('/')
				}
			})
	}

	return (
		<Banner>
			{isLoading && <Loader />}
			<SigninBlock>
				<Figure>
					<img src={User} alt="user" />
				</Figure>
				<Heading text="Sign In" />
				<Form
					handleInputChange={handleChange}
					handleSubmit={handleSubmit}
					formData={signinData}
				/>
			</SigninBlock>
		</Banner>
	)
}

export default Signin
