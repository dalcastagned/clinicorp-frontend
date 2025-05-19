import { Box, css, styled } from '@mui/material'

export const ContentContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`

export const ItemContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

export const ThemeContainer = styled(Box)`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`

export const LightTheme = styled(Box)`
  ${({ theme, mode }) => css`
    color: ${mode === 'light'
      ? theme.palette.common.white
      : theme.colorSchemes.dark.palette.text.primary};
    font-size: 1rem;
    cursor: pointer;
    border: 2px solid
      ${mode === 'light'
        ? theme.palette.primary.main
        : theme.colorSchemes.dark.palette.text.primary};
    border-radius: ${theme.shape.borderRadius}px;
    padding: 0.5rem;
    display: flex;
    width: fit-content;
    align-items: center;
    gap: 0.5rem;
    background-color: ${mode === 'light' ? theme.palette.primary.main : 'transparent'};

    &:hover {
      ${mode !== 'light' &&
      css`
        color: ${theme.palette.primary.main};
        border-color: ${theme.palette.primary.main};
      `}
    }
  `}
`

export const DarkTheme = styled(Box)`
  ${({ theme, mode }) => css`
    color: ${mode === 'dark'
      ? theme.palette.common.white
      : theme.colorSchemes.light.palette.text.primary};
    font-size: 1rem;
    cursor: pointer;
    border: 2px solid ${mode === 'dark' ? theme.palette.primary.main : theme.palette.text.primary};
    border-radius: ${theme.shape.borderRadius}px;
    padding: 0.5rem;
    display: flex;
    width: fit-content;
    align-items: center;
    gap: 0.5rem;
    background-color: ${mode === 'dark' ? theme.palette.primary.main : 'transparent'};

    &:hover {
      ${mode !== 'dark' &&
      css`
        color: ${theme.palette.primary.main};
        border-color: ${theme.palette.primary.main};
      `}
    }
  `}
`

export const ColorsPickerContainer = styled(Box)`
  display: flex;
  gap: 1rem;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`
