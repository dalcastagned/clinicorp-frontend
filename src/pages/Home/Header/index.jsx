import React from 'react'

import * as S from './styles'

const Header = ({ todo, doing, done }) => {
  return (
    <S.HeaderGridContainer>
      <S.TopRowItem>Sua lista de tarefas</S.TopRowItem>
      <S.ItemCountContainer>
        A fazer <span>{todo}</span>
      </S.ItemCountContainer>
      <S.ItemCountContainer>
        Fazendo <span>{doing}</span>
      </S.ItemCountContainer>
      <S.ItemCountContainer>
        Concluídas <span>{done}</span>
      </S.ItemCountContainer>
    </S.HeaderGridContainer>
  )
}

export default Header
