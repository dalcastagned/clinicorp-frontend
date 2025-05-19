import { Box, Paper, styled } from '@mui/material'

export const Card = styled(Paper)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
`

export const FormContainer = styled(Box)`
  display: flex;
  gap: 1rem;
  width: 100%;

  @media (max-width: 840px) {
    flex-direction: column;
  }
`

export const FormTitleContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
