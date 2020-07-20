import React from 'react'

import { Wrapper } from './Layout.styled'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main>
			<Wrapper>{children}</Wrapper>
		</main>
	)
}

export default Layout
