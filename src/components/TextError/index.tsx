import React from 'react'

import { Error } from 'assets/icons'
import { ErrorText } from './TextError.styled'

type Props = {
	/**
	 * error message
	 */
	error?: string
}

const TextError = ({ error }: Props) => {
	if (!error) {
		return null
	}

	return (
		<ErrorText>
			<Error />
			<p>{error}</p>
		</ErrorText>
	)
}

export default TextError
