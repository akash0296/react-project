import styled from 'styled-components'

const Banner = styled.div`
	display: flex;
	align-items: center;
	width: 80%;
	height: 100vh;
	margin: 0 auto;
`

const BannerBlock = styled.div`
	display: flex;
	background: $WHITE;
	box-shadow: 2px 4px 6px ${(props: any) => props.theme.colors.SHADOW_GREY};
	width: 100%;
`

const BannerImage = styled.div`
	background-color: ${(props: any) => props.theme.colors.PARADISO};
	position: relative;
	padding: 80px 0;
	flex-basis: 60%;
	svg {
		width: 80%;
		margin: 0 auto;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		left: 50%;
	}
`

export { Banner, BannerBlock, BannerImage }
