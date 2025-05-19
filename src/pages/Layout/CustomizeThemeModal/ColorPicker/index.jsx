import { useColorScheme } from '@mui/material'

import { useTheme } from '../../../../hooks/useTheme'
import * as S from './styles'

const ColorPicker = ({ color }) => {
  const { primaryColor, handleChangePrimaryColor } = useTheme()
  const { mode } = useColorScheme()

  return (
    <S.Picker
      color={color}
      selected={primaryColor === color}
      onClick={() => handleChangePrimaryColor(color)}
      mode={mode}
    >
      {primaryColor === color && <S.CheckIcon />}
    </S.Picker>
  )
}

export default ColorPicker
