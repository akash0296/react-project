import React from 'react'

import Input from 'elements/Input'
import Button from 'elements/Button'
import TextError from 'components/TextError'
import { StyledForm } from '../../Signup.styled'
import { Link } from 'react-router-dom'

type FormProps = {
	formData: any
	error: null | string
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
	handleInputChange: (
		event: React.ChangeEvent<HTMLInputElement>,
		changeFor: string
	) => void
}

const Form = ({
	handleInputChange,
	handleSubmit,
	formData,
	error,
}: FormProps) => {
	return (
		<div>
			<StyledForm onSubmit={handleSubmit}>
				{Object.keys(formData).map((key: string) => (
					<React.Fragment key={key}>
						<Input
							handleChange={event => handleInputChange(event, key)}
							inputType={formData[key].type}
							val={formData[key].value}
							placeholder={key}
							id={key}
							label={formData[key].label}
						/>
						{formData[key].error && <TextError error={formData[key].error} />}
					</React.Fragment>
				))}
				{error && <TextError error={error} />}
				<Button title="Sign Up" />
			</StyledForm>
			<Link to="/signin" title="Sign In">
				Already have an account? Sign in
			</Link>
		</div>
	)
}

export default Form
