import styled from 'styled-components'

const Figure = styled.figure`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	img {
		width: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`

export { Figure }
