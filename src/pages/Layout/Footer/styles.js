import { css, lighten, Link, styled } from '@mui/material'

export const Footer = styled('footer')`
  ${({ theme, mode }) => {
    const currentColorSchemePalette =
      mode === 'dark' ? theme.colorSchemes.dark.palette : theme.colorSchemes.light.palette

    return css`
      background-color: ${mode === 'dark'
        ? lighten(currentColorSchemePalette.background.default, 0.05)
        : currentColorSchemePalette.background.default};
      height: 3.5rem;
      border-top: 1px solid ${currentColorSchemePalette.divider};
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: ${theme.zIndex.appBar};
    `
  }}
`

export const LinkStyled = styled(Link)`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  font-size: 1.25rem;
`
