import { Box, styled } from '@mui/material'

export const HeaderGridContainer = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  box-sizing: border-box;
  height: 15rem;
`

export const TopRowItem = styled(Box)`
  grid-column: 1 / -1;
  font-size: ${({ theme }) => theme.typography.h5.fontSize};
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ItemCountContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  font-weight: bold;
`
