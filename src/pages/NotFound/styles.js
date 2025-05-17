import { Box, styled } from '@mui/material'

export const Container = styled(Box)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  height: 100%;

  svg {
    width: 100%;
    max-width: 45rem;
    height: auto;
  }
`
