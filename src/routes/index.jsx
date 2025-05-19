import { Route, Routes as RoutesContainer } from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../pages/Layout'
import { NotFound } from '../pages/NotFound'

export function Routes() {
  return (
    <RoutesContainer>
      <Route
        path='*'
        element={
          <Layout>
            <NotFound />
          </Layout>
        }
      />
      <Route
        path='/'
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
    </RoutesContainer>
  )
}
