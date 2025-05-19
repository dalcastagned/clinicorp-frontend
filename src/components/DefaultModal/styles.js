import { Box, IconButton, Paper, Typography, css, lighten, styled } from '@mui/material'

export const Container = styled(Paper)`
  box-shadow: 2.4rem;
  padding: 1rem 1.5rem 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  width: calc(100vw - 4rem);
  max-width: 45rem;
  max-height: calc(100dvh - 4rem);
  z-index: 9999;
`

export const Children = styled(Box)`
  ${({ theme }) => css`
  overflow-y: auto;
  padding: 1rem 1rem 0 1rem;
  margin-bottom: 1rem;

  ::-webkit-scrollbar: {
    width: 0.4rem;
    height: 0.4rem;
  };

  ::-webkit-scrollbar-track: {
    border-radius: ${theme.shape.borderRadius};
    background: ${lighten(theme.palette.primary.main, 0.9)};
  };

  ::-webkit-scrollbar-thumb: {
    border-radius: ${theme.shape.borderRadius};
    background: ${lighten(theme.palette.primary.main, 0.8)};

    &:hover: {
      background: ${lighten(theme.palette.primary.main, 0.6)};
    };
  },
`}
`

export const IconButtonS = styled(IconButton)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`

export const Title = styled(Typography)`
  text-align: left;
  white-space: pre-line;
  font-size: 24;
  width: calc(100% - 2rem);
  padding: 0 1rem;
`

export const Footer = styled(Box)`
  ${({ theme, mode }) => {
    const currentColorSchemePalette =
      mode === 'dark' ? theme.colorSchemes.dark.palette : theme.colorSchemes.light.palette

    return css`
      display: flex;
      justify-content: center;
      width: 100%;
      gap: 1rem;
      margin-top: auto;
      padding: 1rem;
      border-top: ${`1px solid ${currentColorSchemePalette.divider}`};

      button {
        width: 100%;
        max-width: 10rem;
      }
    `
  }}
`
