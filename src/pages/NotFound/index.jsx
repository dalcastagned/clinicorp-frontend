import { useNavigate } from 'react-router-dom'

import { Button, Typography } from '@mui/material'

import DynamicNotFoundBot from '../../components/DynamicNotFoundBot'
import * as S from './styles'

export function NotFound() {
  const navigate = useNavigate()
  return (
    <S.Container>
      <DynamicNotFoundBot />
      <Typography variant='h5' align='center'>
        Página não encontrada
      </Typography>
      <Button onClick={() => navigate('/')} variant='contained' color='primary'>
        Voltar para o início
      </Button>
    </S.Container>
  )
}
