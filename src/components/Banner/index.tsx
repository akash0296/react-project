import React from 'react'

import { AppBanner } from 'assets/images'
import { BannerBlock, Banner, BannerImage } from './Banner.styled'

const index = ({ children }: { children: React.ReactNode }) => {
	return (
		<Banner>
			<BannerBlock>
				<BannerImage>
					<AppBanner />
				</BannerImage>
				{children}
			</BannerBlock>
		</Banner>
	)
}

export default index
