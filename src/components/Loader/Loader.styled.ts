import styled from 'styled-components'

const StyledLoader = styled.div`
	height: 4px;
	width: 100%;
	position: fixed;
	overflow: hidden;
	top: 0;
	left: 0;
	right: 0;
	background-color: ${(props: any) => props.theme.colors.WHITE};
	z-index: 10;
	&:before {
		display: block;
		position: fixed;
		z-index: 10;
		content: '';
		left: -200px;
		width: 200px;
		height: 4px;
		background-color: ${(props: any) => props.theme.colors.NEON_BLUE};
		animation: loading 2s linear infinite;
	}

	@keyframes loading {
		from {
			left: -200px;
			width: 30%;
		}
		50% {
			width: 30%;
		}
		70% {
			width: 70%;
		}
		80% {
			left: 50%;
		}
		95% {
			left: 120%;
		}
		to {
			left: 100%;
		}
	}
`

export { StyledLoader }
