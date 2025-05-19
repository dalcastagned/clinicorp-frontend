import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Routes as AppRoutes } from '.'

jest.mock('../pages/Home', () => {
  return function MockHome() {
    return <div data-testid='home-page'>HomePageMock</div>
  }
})

jest.mock('../pages/Layout', () => {
  return function MockLayout({ children }) {
    return <div data-testid='layout-mock'>{children}</div>
  }
})

jest.mock('../pages/NotFound', () => ({
  NotFound: function MockNotFound() {
    return <div data-testid='not-found-page'>NotFoundPageMock</div>
  },
}))

describe('AppRoutes Component', () => {
  const renderWithInitialEntry = (ui, { initialEntries = ['/'] } = {}) => {
    return render(ui, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      ),
    })
  }

  test('renders Home page for the root path ("/")', () => {
    renderWithInitialEntry(<AppRoutes />, { initialEntries: ['/'] })

    expect(screen.getByTestId('layout-mock')).toBeInTheDocument()
    expect(screen.getByTestId('home-page')).toBeInTheDocument()
    expect(screen.getByText('HomePageMock')).toBeInTheDocument()
    expect(screen.queryByTestId('not-found-page')).not.toBeInTheDocument()
  })

  test('renders NotFound page for an undefined path', () => {
    renderWithInitialEntry(<AppRoutes />, { initialEntries: ['/some/random/path'] })

    expect(screen.getByTestId('layout-mock')).toBeInTheDocument()
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument()
    expect(screen.getByText('NotFoundPageMock')).toBeInTheDocument()
    expect(screen.queryByTestId('home-page')).not.toBeInTheDocument()
  })

  test('renders NotFound page for another undefined path using the catch-all route', () => {
    renderWithInitialEntry(<AppRoutes />, { initialEntries: ['/another-undefined-route'] })

    expect(screen.getByTestId('layout-mock')).toBeInTheDocument()
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument()
    expect(screen.getByText('NotFoundPageMock')).toBeInTheDocument()
  })
})
