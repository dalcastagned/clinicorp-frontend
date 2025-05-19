import { useColorScheme } from '@mui/material'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import * as S from './styles'

const Footer = () => {
  const { mode } = useColorScheme()

  return (
    <S.Footer component='footer' mode={mode}>
      Feito por Daniel Dalcastagne
      <S.LinkStyled
        href='https://www.linkedin.com/in/daniel-dalcastagne/'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='LinkedIn de Daniel Dalcastagne (abre em nova aba)'
      >
        <FaLinkedin aria-hidden='true' focusable='false' />
      </S.LinkStyled>
      <S.LinkStyled
        href='https://github.com/dalcastagned'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='GitHub de Daniel Dalcastagne (abre em nova aba)'
      >
        <FaGithub aria-hidden='true' focusable='false' />
      </S.LinkStyled>
    </S.Footer>
  )
}

export default Footer
