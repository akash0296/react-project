import React from 'react'
import { Head } from './Heading.styled'

type Props = {
	/**
	 * heading text
	 */
	text: string
}

const Heading = ({ text }: Props) => {
	return (
		<Head>
			<h1>{text}</h1>
		</Head>
	)
}

export default Heading
