import { Box, styled } from '@mui/material'

// Container principal do cabeçalho
export const HeaderContainer = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  border-bottom: ${({ theme }) => `0.125rem solid ${theme.palette.primary.main}`};
`

export const Title = styled(Box)`
  font-size: ${({ theme }) => theme.typography.h5.fontSize};
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  text-align: center;
`

export const CountersList = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 0;
  padding: 0;
`

export const CounterItemWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export const CounterTerm = styled(Box)`
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  margin-bottom: 0.25rem;
`

export const CounterDetails = styled(Box)`
  font-size: ${({ theme }) => theme.typography.h6.fontSize};
  font-weight: bold;
  margin-left: 0;
`
