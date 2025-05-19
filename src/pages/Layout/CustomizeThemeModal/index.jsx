import { Typography, useColorScheme } from '@mui/material'

import { FaMoon, FaSun } from 'react-icons/fa'
import { DefaultModal } from '../../../components/DefaultModal'
import { primaryColorsArray } from '../../../utils/colors'
import ColorPicker from './ColorPicker'
import * as S from './styles'

const CustomizeThemeModal = ({ open, handleClose }) => {
  const { mode, setMode } = useColorScheme()

  return (
    <DefaultModal
      handleClose={handleClose}
      open={open}
      title='Customizar tema'
      handleSubmit={handleClose}
      submitText='Fechar'
    >
      <S.ContentContainer>
        <S.ItemContainer>
          <Typography variant='body1' fontWeight={700}>
            Tema
          </Typography>
          <S.ThemeContainer>
            <S.LightTheme onClick={() => setMode('light')} mode={mode}>
              <FaSun /> Claro
            </S.LightTheme>
            <S.DarkTheme onClick={() => setMode('dark')} mode={mode}>
              <FaMoon /> Escuro
            </S.DarkTheme>
          </S.ThemeContainer>
        </S.ItemContainer>
        <S.ItemContainer>
          <Typography variant='body1' fontWeight={700}>
            Cor principal
          </Typography>
          <S.ColorsPickerContainer>
            {primaryColorsArray.map(color => (
              <ColorPicker color={color} key={color} />
            ))}
          </S.ColorsPickerContainer>
        </S.ItemContainer>
      </S.ContentContainer>
    </DefaultModal>
  )
}

export default CustomizeThemeModal
