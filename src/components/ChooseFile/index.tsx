import React, { FunctionComponent } from 'react'

import { StyledInput } from './ChooseFile.styled'

type Props = {
	/**
	 * name of the input field
	 */
	name?: string
	/**
	 * acceptabe file type
	 */
	accept?: string
	/**
	 * ref
	 */
	inputRef?: any
	/**
	 * handles change event
	 */
	handleChange: React.FormEventHandler<HTMLInputElement>
}

const ChooseFile: FunctionComponent<Props> = ({
	name,
	accept,
	handleChange,
	inputRef,
}) => {
	return (
		<StyledInput
			type="file"
			name={name}
			id={name}
			accept={accept}
			onChange={handleChange}
			className="custom-file-input"
			ref={inputRef}
		/>
	)
}

ChooseFile.defaultProps = {
	name: 'upload file',
	accept: '.jpg, .jpeg, .png',
}

export default ChooseFile
