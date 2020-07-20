import React, { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from 'theme/GlobalStyles'
import theme from 'theme'
import 'reset-css'

type Props = {
	children?: ReactNode
}

/**
 * Wrapper component to expose theme to styleguide files
 */

const StyleGuideWrapper = function ({ children }: Props) {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			{children}
		</ThemeProvider>
	)
}

export default StyleGuideWrapper
