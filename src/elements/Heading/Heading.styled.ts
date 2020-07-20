import styled from 'styled-components'

const Head = styled.div`
	border-left: 5px solid ${(props: any) => props.theme.colors.BLUE};
	padding: 10px 0;
	h1 {
		font-size: 20px;
		color: ${(props: any) => props.theme.colors.BLACK};
		margin-left: 10px;
	}
`

export { Head }
