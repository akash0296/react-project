import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html, body {
    height: 100%;
  }

  body {
    font-family: ${(props: any) => props.theme.fonts.join(', ')}
  }

`
