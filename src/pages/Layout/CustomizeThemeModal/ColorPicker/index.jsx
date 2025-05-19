import { useColorScheme } from '@mui/material'

import { useTheme } from '../../../../hooks/useTheme'
import * as S from './styles'

const ColorPicker = ({ color }) => {
  const { primaryColor, handleChangePrimaryColor } = useTheme()
  const { mode } = useColorScheme()

  const isSelected = primaryColor === color

  return (
    <S.Picker
      component='button'
      role='radio'
      aria-checked={isSelected}
      aria-label={`Selecionar cor ${color}`}
      color={color}
      selected={isSelected}
      onClick={() => handleChangePrimaryColor(color)}
      mode={mode}
    >
      {isSelected && <S.CheckIcon />}
    </S.Picker>
  )
}

export default ColorPicker
