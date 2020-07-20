import React from 'react'
import { Link } from 'react-router-dom'

import TextError from 'components/TextError'
import Input from 'elements/Input'
import { StyledForm } from '../../Signin.styled'
import Button from 'elements/Button'

type FormProps = {
	formData: any
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
	handleInputChange: (
		event: React.ChangeEvent<HTMLInputElement>,
		changeFor: string
	) => void
}

const Form = ({ handleInputChange, handleSubmit, formData }: FormProps) => {
	return (
		<div>
			<StyledForm onSubmit={handleSubmit}>
				{Object.keys(formData).map((key: string, index: number) =>
					key !== 'error' ? (
						<Input
							key={index}
							handleChange={event => handleInputChange(event, key)}
							inputType={formData[key].type}
							val={formData[key].value}
							placeholder={formData[key].label}
							id={key}
							label={formData[key].label}
						/>
					) : null
				)}
				{formData.error && <TextError error={formData.error?.message} />}
				<Button title="Sign In" />
			</StyledForm>
			<Link to="/signup" title="Sign Up">
				Don’t have an account? Sign up
			</Link>
		</div>
	)
}

export default Form
