import React from 'react'

import ChooseFile from 'components/ChooseFile'
import TextError from 'components/TextError'
import { User } from 'assets/images'
import { Image } from 'assets/icons'
import base64Convertor from 'utils/base64Convertor'
import RegexUtil from 'utils/RegexUtil'
import { ProfileImageBlock } from '../../Home.styled'

type Props = {
	imageData?: any
	handleFileChange?: any
}

const ProfileImage = ({ imageData, handleFileChange }: Props) => {
	const [image, setImage] = React.useState('')
	const inputRef: any = React.useRef()
	const inputTrigger = () => inputRef?.current?.click()

	const imageSrc = React.useCallback(async () => {
		const src =
			imageData && RegexUtil.url.test(imageData)
				? imageData
				: imageData?.imageSrc
				? await base64Convertor(imageData.imageSrc)
				: User

		setImage(src)
	}, [imageData])

	React.useEffect(() => {
		imageSrc()
	}, [imageSrc])
	return (
		<ProfileImageBlock>
			<div className="content">
				<figure>
					<img src={image} alt={imageData?.name || 'user'} />
				</figure>
				<Image onClick={inputTrigger} title="upload image" />
				<ChooseFile handleChange={handleFileChange} inputRef={inputRef} />
				{imageData?.error && <TextError error={imageData.error} />}
			</div>
		</ProfileImageBlock>
	)
}

export default ProfileImage
