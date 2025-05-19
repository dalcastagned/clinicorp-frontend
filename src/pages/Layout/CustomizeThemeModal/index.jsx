import { Typography, useColorScheme } from '@mui/material'

import { FaMoon, FaSun } from 'react-icons/fa'
import { DefaultModal } from '../../../components/DefaultModal'
import { primaryColorsArray } from '../../../utils/colors'
import ColorPicker from './ColorPicker'
import * as S from './styles'

const CustomizeThemeModal = ({ open, handleClose }) => {
  const { mode, setMode } = useColorScheme()

  const themeGroupId = 'theme-group-label'
  const colorGroupId = 'color-group-label'

  return (
    <DefaultModal
      handleClose={handleClose}
      open={open}
      title='Customizar tema'
      handleSubmit={handleClose}
      submitText='Fechar'
    >
      <S.ContentContainer>
        <S.ItemContainer role='group' aria-labelledby={themeGroupId}>
          <Typography variant='body1' fontWeight={700} id={themeGroupId} component='h3'>
            Tema
          </Typography>
          <S.ThemeContainer role='radiogroup' aria-labelledby={themeGroupId}>
            <S.LightTheme
              onClick={() => setMode('light')}
              mode={mode}
              component='button'
              aria-label='Tema claro'
              role='radio'
            >
              <FaSun /> Claro
            </S.LightTheme>
            <S.DarkTheme
              onClick={() => setMode('dark')}
              mode={mode}
              component='button'
              aria-label='Tema escuro'
              role='radio'
            >
              <FaMoon /> Escuro
            </S.DarkTheme>
          </S.ThemeContainer>
        </S.ItemContainer>
        <S.ItemContainer role='group' aria-labelledby={colorGroupId}>
          <Typography variant='body1' fontWeight={700} id={colorGroupId} component='h3'>
            Cor principal
          </Typography>
          <S.ColorsPickerContainer role='radiogroup' aria-labelledby={colorGroupId}>
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
