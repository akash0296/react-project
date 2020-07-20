import styled from 'styled-components'

const SignupBlock = styled.div`
	margin: 0 auto;
	flex: 1;
	padding: 20px 20px 30px;
	a {
		display: block;
		text-align: center;
		font-size: 15px;
		color: ${(props: any) => props.theme.colors.LIGHT_GREY};
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
`

const StyledForm = styled.form`
	padding: 20px 0;
	.input-group {
		margin-bottom: 5px;
	}
`

export { StyledForm, SignupBlock }
