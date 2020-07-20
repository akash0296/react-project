import React, { FunctionComponent } from 'react'

import { StyledInput, InputBlock, Label } from './Input.styled'

type Props = {
	/**
	 * type of input
	 */
	inputType?: string
	/**
	 * input placeholder
	 */
	placeholder?: string
	/**
	 * value of input
	 */
	val?: string
	/**
	 * id of input
	 */
	id?: string
	/**
	 * label of input
	 */
	label?: string
	/**
	 * handles change event
	 */
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const Input: FunctionComponent<Props> = ({
	inputType,
	val,
	handleChange,
	placeholder,
	handleBlur,
	id,
	label,
}) => {
	return (
		<InputBlock className="input-group">
			<StyledInput
				type={inputType}
				value={val}
				onChange={handleChange}
				className="custom-input"
				placeholder={placeholder}
				onBlur={handleBlur}
				id={id}
				formNoValidate
			/>
			{label && <Label htmlFor={id}>{label}</Label>}
		</InputBlock>
	)
}

Input.defaultProps = {
	inputType: 'text',
	handleChange: () => undefined,
	handleBlur: () => undefined,
}

export default Input
