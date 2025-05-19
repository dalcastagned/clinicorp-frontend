import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import React from 'react'
import { GrInProgress } from 'react-icons/gr'
import { IoMdDoneAll } from 'react-icons/io'
import { RiTodoLine } from 'react-icons/ri'

import * as S from './styles'

const StatusIcon = ({ status }) => {
  let IconComponent
  let title
  switch (status) {
    case 'todo':
      IconComponent = RiTodoLine
      title = 'A fazer'
      break
    case 'doing':
      IconComponent = GrInProgress
      title = 'Fazendo'
      break
    case 'done':
      IconComponent = IoMdDoneAll
      title = 'Concluída'
      break
    default:
      return null
  }

  return (
    <Tooltip title={title} placement='top'>
      <Box component='span' aria-label={title} role='img'>
        <IconComponent />
      </Box>
    </Tooltip>
  )
}

const Content = ({ data, loading }) => {
  return (
    <S.Container aria-live='polite'>
      {loading && (
        <S.LoadingContainer role='status' aria-label='Carregando dados das tarefas'>
          <CircularProgress size={50} sx={{ svg: { color: 'primary.main' } }} aria-hidden='false' />
        </S.LoadingContainer>
      )}

      {!loading && data && !data.length && (
        <Box sx={{ p: 3 }}>
          <Typography variant='subtitle1'>
            Nenhuma tarefa encontrada. Adicione tarefas clicando no botão acima.
          </Typography>
        </Box>
      )}

      {!loading && data && !!data.length && (
        <Table sx={{ tableLayout: 'fixed', width: '100%' }} aria-labelledby='table-caption'>
          <caption
            id='table-caption'
            style={{ captionSide: 'top', padding: '8px', fontWeight: 'bold' }}
          >
            Lista de Tarefas Cadastradas
          </caption>
          <TableHead>
            <TableRow>
              <S.TableCell fontWeight='bold' title='Descrição'>
                Descrição
              </S.TableCell>
              <S.TableCell fontWeight='bold' title='Responsável'>
                Responsável
              </S.TableCell>
              <S.TableCell fontWeight='bold' title='Computador'>
                Computador
              </S.TableCell>
              <S.TableCell align='center' fontWeight='bold' width='5.5rem' title='Status'>
                Status
              </S.TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.id} sx={{ td: { border: 0 } }}>
                <S.TableCell title={row.description}>{row.description}</S.TableCell>
                <S.TableCell title={row.responsable}>{row.responsable}</S.TableCell>
                <S.TableCell title={row.computer}>{row.computer}</S.TableCell>
                <S.TableCell align='center'>
                  <StatusIcon status={row.status} />
                </S.TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </S.Container>
  )
}

export default Content
