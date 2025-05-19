import { Box, css, styled } from '@mui/material'
import { FaCheck } from 'react-icons/fa'

export const Picker = styled(Box)`
  ${({ theme, color, selected, mode }) => css`
    background-color: ${color};
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 2px solid
      ${selected
        ? mode === 'dark'
          ? theme.palette.common.white
          : theme.palette.common.black
        : 'transparent'};
    cursor: pointer;
    position: relative;

    &:hover {
      border-color: ${mode === 'dark' ? theme.palette.common.white : theme.palette.common.black};
    }
  `}
`

export const CheckIcon = styled(FaCheck)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.palette.common.white};
`
