import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { NotFound } from '.'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

jest.mock('../../components/DynamicNotFoundBot', () => {
  return function MockDynamicNotFoundBot() {
    return <div data-testid='dynamic-not-found-bot-mock'>DynamicNotFoundBotMock</div>
  }
})

describe('NotFound Page', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  const renderWithRouter = ui => {
    return render(ui, { wrapper: MemoryRouter })
  }

  test('renders DynamicNotFoundBot component', () => {
    renderWithRouter(<NotFound />)
    expect(screen.getByTestId('dynamic-not-found-bot-mock')).toBeInTheDocument()
    expect(screen.getByText('DynamicNotFoundBotMock')).toBeInTheDocument()
  })

  test('renders the "Página não encontrada" message as a heading', () => {
    renderWithRouter(<NotFound />)
    expect(
      screen.getByRole('heading', { name: /página não encontrada/i, level: 5 }),
    ).toBeInTheDocument()
  })

  test('renders the "Voltar para o início" button', () => {
    renderWithRouter(<NotFound />)
    expect(screen.getByRole('button', { name: /voltar para o início/i })).toBeInTheDocument()
  })

  test('calls navigate with "/" when the "Voltar para o início" button is clicked', () => {
    renderWithRouter(<NotFound />)
    const backButton = screen.getByRole('button', { name: /voltar para o início/i })
    fireEvent.click(backButton)
    expect(mockNavigate).toHaveBeenCalledWith('/')
    expect(mockNavigate).toHaveBeenCalledTimes(1)
  })
})
