import { Route, Routes as RoutesContainer } from 'react-router-dom'
import Home from '../pages/Home'
import { NotFound } from '../pages/NotFound'

export function Routes() {
  return (
    <RoutesContainer>
      <Route path='*' element={<NotFound />} />
      <Route path='/' element={<Home />} />
    </RoutesContainer>
  )
}
