import styled from 'styled-components'

const SigninBlock = styled.div`
	margin: 0 auto;
	flex: 1;
	padding: 10px 20px 30px;
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

const Figure = styled.figure`
  text-align: center;
  padding: 40px 0;
  img {
    width: 100%:
  }
`

const StyledForm = styled.form`
	padding: 10px 0 20px;
`

export { SigninBlock, Figure, StyledForm }
