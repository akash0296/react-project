import React from 'react'
import TextError from 'components/TextError'
import Button from 'elements/Button'

import { EditProfileBlock, StyledForm } from '../../Home.styled'
import Input from 'elements/Input'

type EditProfileProfile = {
	profileData: any
	userEmail: string | undefined
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
	handleInputChange: (
		event: React.ChangeEvent<HTMLInputElement>,
		changeFor: string
	) => void
}

const EditProfileForm = ({
	userEmail,
	profileData,
	handleSubmit,
	handleInputChange,
}: EditProfileProfile) => {
	return (
		<EditProfileBlock>
			<StyledForm onSubmit={handleSubmit}>
				{Object.keys(profileData).map((key: string) => (
					<React.Fragment key={key}>
						<Input
							handleChange={(event: any) => handleInputChange(event, key)}
							inputType={profileData[key].type}
							val={profileData[key].value}
							placeholder={key}
							id={key}
							label={profileData[key].label}
						/>
						{profileData[key].error && (
							<TextError error={profileData[key].error} />
						)}
					</React.Fragment>
				))}
				<Button title="Save Changes" />
			</StyledForm>
		</EditProfileBlock>
	)
}

export default EditProfileForm
