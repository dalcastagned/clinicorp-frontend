import { useColorScheme } from '@mui/material'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import * as S from './styles'

const Footer = () => {
  const { mode } = useColorScheme()

  return (
    <S.Footer mode={mode}>
      Feito por Daniel Dalcastagne
      <S.LinkStyled href='https://www.linkedin.com/in/daniel-dalcastagne/' target='_blank'>
        <FaLinkedin />
      </S.LinkStyled>
      <S.LinkStyled href='https://github.com/dalcastagned' target='_blank'>
        <FaGithub />
      </S.LinkStyled>
    </S.Footer>
  )
}

export default Footer
