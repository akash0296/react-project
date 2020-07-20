import styled from 'styled-components'

const StyledInput = styled.input`
	font-size: 1.2em;
	padding: 20px 5px 15px;
	border: none;
	outline: none;
	transition: 0.4s ease;
	border-left: 5px solid transparent;
	box-shadow: 0px 2px 4px ${(props: any) => props.theme.colors.SHADOW_GREY};
	font-size: 14px;
	&:focus,
	&:not(:placeholder-shown) {
		border-left-color: ${(props: any) => props.theme.colors.ULTRAMARINE};
	}

	&:focus {
		box-shadow: 0px 5px 6px ${(props: any) => props.theme.colors.SHADOW_GREY};
	}

	&:not(:placeholder-shown) ~ label,
	&:focus ~ label {
		transform: translate(10px, -35px) scale(0.8);
		padding-left: 0px;
	}

	&::placeholder {
		opacity: 0;
	}
`
const InputBlock = styled.div`
	display: flex;
	flex-direction: column-reverse;
	margin: 1.2em 0;
`

const Label = styled.label`
	padding-left: 10px;
	transform: translate(4px, -20px) scale(1.02);
	cursor: text;
	transform-origin: left top;
	color: ${(props: any) => props.theme.colors.GREY};
	position: absolute;
	transition: 0.4s ease;
	text-transform: capitalize;
	color: ${(props: any) => props.theme.colors.GAINSBORO};
	font-size: 14px;
`

export { StyledInput, Label, InputBlock }
