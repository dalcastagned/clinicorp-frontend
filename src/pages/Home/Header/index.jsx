import React from 'react'
import * as S from './styles'

const Header = ({ todo, doing, done }) => {
  const titleId = 'task-list-main-title'

  return (
    <S.HeaderContainer component='section' aria-labelledby={titleId}>
      <S.Title component='h2' id={titleId}>
        Sua lista de tarefas
      </S.Title>

      <S.CountersList component='dl' role='group' aria-label='Resumo das contagens de tarefas'>
        <S.CounterItemWrapper>
          <S.CounterTerm component='dt'>A fazer</S.CounterTerm>
          <S.CounterDetails component='dd'>{todo}</S.CounterDetails>
        </S.CounterItemWrapper>

        <S.CounterItemWrapper>
          <S.CounterTerm component='dt'>Fazendo</S.CounterTerm>
          <S.CounterDetails component='dd'>{doing}</S.CounterDetails>
        </S.CounterItemWrapper>

        <S.CounterItemWrapper>
          <S.CounterTerm component='dt'>Concluídas</S.CounterTerm>
          <S.CounterDetails component='dd'>{done}</S.CounterDetails>
        </S.CounterItemWrapper>
      </S.CountersList>
    </S.HeaderContainer>
  )
}

export default Header
