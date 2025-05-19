import React from 'react'

import { CircularProgress, Table, TableBody, TableHead, TableRow } from '@mui/material'
import { GrInProgress } from 'react-icons/gr'
import { IoMdDoneAll } from 'react-icons/io'
import { RiTodoLine } from 'react-icons/ri'

import * as S from './styles'

const Content = ({ data, loading }) => {
  const StatusIcon = ({ status }) => {
    switch (status) {
      case 'todo':
        return <RiTodoLine />
      case 'doing':
        return <GrInProgress />
      case 'done':
        return <IoMdDoneAll />
    }
  }

  const StatusTitle = ({ status }) => {
    switch (status) {
      case 'todo':
        return 'A fazer'
      case 'doing':
        return 'Fazendo'
      case 'done':
        return 'Concluídas'
    }
  }

  return (
    <S.Container>
      {loading && (
        <S.LoadingContainer>
          <CircularProgress size={50} sx={{ svg: { color: 'primary.main' } }} />
        </S.LoadingContainer>
      )}
      {!!data.length && !loading && (
        <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
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
              <TableRow key={row.id} sx={{ 'td, th': { border: 0 } }}>
                <S.TableCell title={row.description}>{row.description}</S.TableCell>
                <S.TableCell title={row.responsable}>{row.responsable}</S.TableCell>
                <S.TableCell title={row.computer}>{row.computer}</S.TableCell>
                <S.TableCell align='center' title={StatusTitle({ status: row.status })}>
                  {StatusIcon({ status: row.status })}
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
