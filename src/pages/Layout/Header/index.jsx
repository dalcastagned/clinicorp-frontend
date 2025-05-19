import { useState } from 'react'

import { IconButton, Typography, useColorScheme } from '@mui/material'
import { BsFillGearFill } from 'react-icons/bs'
import { MdOutlineColorLens } from 'react-icons/md'

import DynamicLogo from '../../../components/DynamicLogo'
import CustomizeThemeModal from '../CustomizeThemeModal'
import * as S from './styles'

const Header = () => {
  const { mode } = useColorScheme()
  const [openCustomizeThemeModal, setOpenCustomizeThemeModal] = useState(false)
  const [anchorConfigMenu, setAnchorConfigMenu] = useState(null)
  const openConfigMenu = Boolean(anchorConfigMenu)

  const handleClickConfigMenu = event => {
    setAnchorConfigMenu(event.currentTarget)
  }

  const handleOpenCustomizeThemeModal = () => {
    setAnchorConfigMenu(null)
    setOpenCustomizeThemeModal(true)
  }

  const handleClose = () => {
    setAnchorConfigMenu(null)
  }

  const handleCloseCustomizeThemeModal = () => setOpenCustomizeThemeModal(false)

  return (
    <S.Header mode={mode}>
      <S.LogoContainer>
        <DynamicLogo />
        <Typography variant='h5' fontWeight='bold'>
          TO-DO List
        </Typography>
      </S.LogoContainer>
      <IconButton onClick={handleClickConfigMenu}>
        <BsFillGearFill />
      </IconButton>
      <S.MenuStyled
        mode={mode}
        anchorEl={anchorConfigMenu}
        open={openConfigMenu}
        onClose={handleClose}
      >
        <Typography variant='body2' color='textSecondary' pb='0.5rem' pl='1rem'>
          Configurações
        </Typography>
        <S.MenuItemStyled onClick={handleOpenCustomizeThemeModal}>
          <MdOutlineColorLens />
          Customizar tema
        </S.MenuItemStyled>
      </S.MenuStyled>
      <CustomizeThemeModal
        open={openCustomizeThemeModal}
        handleClose={handleCloseCustomizeThemeModal}
      />
    </S.Header>
  )
}

export default Header
