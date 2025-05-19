import { Box, css, lighten, Menu, MenuItem, styled } from '@mui/material'

export const Header = styled('header')`
  ${({ theme, mode }) => {
    const currentColorSchemePalette =
      mode === 'dark' ? theme.colorSchemes.dark.palette : theme.colorSchemes.light.palette

    return css`
      background-color: ${mode === 'dark'
        ? lighten(currentColorSchemePalette.background.default, 0.05)
        : currentColorSchemePalette.background.default};
      height: 4.5rem;
      border-bottom: 1px solid ${currentColorSchemePalette.divider};
      padding: 0.5rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: ${theme.zIndex.appBar};
    `
  }}
`

export const LogoContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 3rem;
    height: 3rem;
  }
`

export const MenuStyled = styled(Menu)`
  ${({ theme, mode }) => css`
    .MuiMenu-paper {
      padding: 0.5rem;
      background-image: none;
      background-color: ${mode === 'dark'
        ? theme.colorSchemes.dark.palette.background.paper
        : theme.colorSchemes.light.palette.background.paper};
    }
  `}
`

export const MenuItemStyled = styled(MenuItem)`
  ${({ theme }) => css`
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: ${theme.shape.borderRadius}rem;
    min-width: 12rem;
  `}
`
