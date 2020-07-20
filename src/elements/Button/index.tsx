import React, { FunctionComponent } from 'react'

import { StyledButton } from './Button.styled'

type ButtonProps = {
	/**
	 * class name for the button element
	 */
	buttonClass?: string
	/**
	 * handles button clicks
	 */
	onClick?:
		| ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
		| undefined
	/**
	 * button's title attribute
	 */
	title: string
	/**
	 * flag to disable the button
	 */
	isDisabled?: boolean
}

const Button: FunctionComponent<ButtonProps> = ({
	buttonClass,
	onClick,
	title,
	isDisabled,
}) => {
	return (
		<StyledButton
			className={buttonClass}
			onClick={onClick}
			title={title}
			disabled={isDisabled}
		>
			{title}
		</StyledButton>
	)
}
Button.defaultProps = {
	isDisabled: false,
	buttonClass: 'btn-primary',
}

export default Button
