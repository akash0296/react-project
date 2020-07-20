import styled from 'styled-components'

const StyledButton = styled.button`
	width: 100%;
	background-color: ${(props: any) => props.theme.colors.NEON_BLUE};
	border: 1px solid transparent;
	color: ${(props: any) => props.theme.colors.WHITE};
	font-size: 16px;
	padding: 10px 0;
	margin-top: 20px;
	border-radius: 3px;
	transition: 0.3s ease;
	&:hover,
	&:focus {
		border-color: ${(props: any) => props.theme.colors.NIGHT_GRAY};
		background-color: ${(props: any) => props.theme.colors.BLUE};
	}
	cursor: pointer;
`

export { StyledButton }
