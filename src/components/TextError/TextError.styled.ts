import styled from 'styled-components'

const ErrorText = styled.div`
	display: flex;
	align-items: center;
	svg {
		width: 13px;
		fill: ${(props: any) => props.theme.colors.PERSIAN_RED};
	}
	p {
		color: ${(props: any) => props.theme.colors.PERSIAN_RED};
		font-size: 14px;
		margin-left: 5px;
	}
`

ErrorText.displayName = 'ErrorTextBlock'

export { ErrorText }
