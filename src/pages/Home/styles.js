import { Box, css, styled } from '@mui/material'

export const Container = styled(Box)`
  ${({ theme, mode }) => {
    const currentColorSchemePalette =
      mode === 'dark' ? theme.colorSchemes.dark.palette : theme.colorSchemes.light.palette

    return css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      border: 0.125rem solid ${currentColorSchemePalette.primary.main};
      border-radius: ${theme.shape.borderRadius}px;
      background-color: ${currentColorSchemePalette.background.paper};

      > div {
        border-bottom: 0.125rem solid ${currentColorSchemePalette.primary.main};
      }
    `
  }}
`
