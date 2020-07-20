import styled from 'styled-components'

const ProfileBlock = styled.div`
	width: 100px;
	height: 100px;
	margin: 0 auto;
	input {
		display: none;
	}
	text-align: center;
	border-radius: 50%;
	padding: 20px;
	box-shadow: 0px 3px 6px ${(props: any) => props.theme.colors.SHADOW_GREY};
	position: relative;
	svg {
		position: absolute;
		bottom: 5px;
		right: 20px;
		cursor: pointer;
	}
	figure {
		overflow: hidden;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
			max-width: 100px;
			max-height: 100px;
		}
	}
`

export { ProfileBlock }
