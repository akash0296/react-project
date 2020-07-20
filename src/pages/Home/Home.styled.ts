import styled from 'styled-components'

const StyledForm = styled.form`
	padding: 20px 0;
	.input-group {
		margin-bottom: 5px;
	}
`

const EditProfileBlock = styled.div`
	flex: 1;
`
const ProfileImageBlock = styled.div`
	flex: 1;
	position: relative;
	input {
		display: none;
	}
	.content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	figure {
		width: 300px;
		border-radius: 50%;
		height: 300px;
		box-shadow: 0px 3px 6px ${(props: any) => props.theme.colors.SHADOW_GREY};
		display: flex;
		justify-content: center;
		align-items: center;
		background: ${(props: any) => props.theme.colors.WHITE};
		img {
			max-width: 200px;
			max-height: 200px;
		}
	}
	svg {
		position: absolute;
		bottom: 5px;
		right: 75px;
		cursor: pointer;
	}
`

const ProfileBlock = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: 50px;
`

const ProfileHead = styled.div`
	padding: 20px 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	button {
		flex-basis: 10%;
		min-width: 200px;
	}
`

export {
	StyledForm,
	EditProfileBlock,
	ProfileImageBlock,
	ProfileBlock,
	ProfileHead,
}
