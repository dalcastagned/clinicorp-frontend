import { Box, css, styled, TableCell as TableCellMUI } from '@mui/material'

export const Container = styled(Box)`
  padding: 0 1rem 0 1rem;
  height: 100%;
  width: 100%;
`

export const ItemContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const TableCell = styled(TableCellMUI)`
  ${({ width, fontWeight }) => {
    return css`
      width: ${width ? width : 'auto'};
      font-weight: ${fontWeight ? fontWeight : 'normal'};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `
  }}
`

export const LoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`
