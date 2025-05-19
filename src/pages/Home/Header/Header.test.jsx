import { ThemeProvider, createTheme } from '@mui/material/styles'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import Header from '.'

const mockMuiTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
  typography: {
    h5: { fontSize: '1.5rem' },
    h6: { fontSize: '1.25rem' },
    body1: { fontSize: '1rem' },
  },
})

const AllTheProviders = ({ children }) => {
  return <ThemeProvider theme={mockMuiTheme}>{children}</ThemeProvider>
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

describe('Header Component (Task List)', () => {
  const defaultProps = {
    todo: 0,
    doing: 0,
    done: 0,
  }

  test('renders the main title "Sua lista de tarefas"', () => {
    customRender(<Header {...defaultProps} />)
    const titleElement = screen.getByRole('heading', { name: /sua lista de tarefas/i, level: 2 })
    expect(titleElement).toBeInTheDocument()
  })

  test('renders the counter labels "A fazer", "Fazendo", "Concluídas"', () => {
    customRender(<Header {...defaultProps} />)
    expect(screen.getByText('A fazer')).toBeInTheDocument()
    expect(screen.getByText('Fazendo')).toBeInTheDocument()
    expect(screen.getByText('Concluídas')).toBeInTheDocument()
  })

  test('displays the correct todo, doing, and done counts passed as props', () => {
    const props = {
      todo: 5,
      doing: 3,
      done: 10,
    }
    customRender(<Header {...props} />)

    const todoTerm = screen.getByText('A fazer')
    const doingTerm = screen.getByText('Fazendo')
    const doneTerm = screen.getByText('Concluídas')

    expect(todoTerm.nextElementSibling).toHaveTextContent(String(props.todo))
    expect(doingTerm.nextElementSibling).toHaveTextContent(String(props.doing))
    expect(doneTerm.nextElementSibling).toHaveTextContent(String(props.done))
  })

  test('displays "0" for counts when props are zero or not provided (defaults in component)', () => {
    customRender(<Header todo={0} doing={0} done={0} />)
    const todoTerm = screen.getByText('A fazer')
    const doingTerm = screen.getByText('Fazendo')
    const doneTerm = screen.getByText('Concluídas')

    expect(todoTerm.nextElementSibling).toHaveTextContent('0')
    expect(doingTerm.nextElementSibling).toHaveTextContent('0')
    expect(doneTerm.nextElementSibling).toHaveTextContent('0')
  })

  test('renders with correct ARIA attributes for accessibility', () => {
    customRender(<Header {...defaultProps} />)
    const mainTitle = screen.getByRole('heading', { name: /sua lista de tarefas/i, level: 2 })
    const headerSection = mainTitle.closest('section')
    const countersGroup = screen.getByRole('group', { name: /resumo das contagens de tarefas/i })

    expect(headerSection).toHaveAttribute('aria-labelledby', mainTitle.id)
    expect(countersGroup).toBeInTheDocument()
  })

  test('renders counter items with correct semantic elements (dt, dd)', () => {
    customRender(<Header todo={1} doing={2} done={3} />)

    const todoTerm = screen.getByText('A fazer')
    expect(todoTerm.tagName).toBe('DT')
    expect(todoTerm.nextElementSibling.tagName).toBe('DD')
    expect(todoTerm.nextElementSibling).toHaveTextContent('1')

    const doingTerm = screen.getByText('Fazendo')
    expect(doingTerm.tagName).toBe('DT')
    expect(doingTerm.nextElementSibling.tagName).toBe('DD')
    expect(doingTerm.nextElementSibling).toHaveTextContent('2')

    const doneTerm = screen.getByText('Concluídas')
    expect(doneTerm.tagName).toBe('DT')
    expect(doneTerm.nextElementSibling.tagName).toBe('DD')
    expect(doneTerm.nextElementSibling).toHaveTextContent('3')
  })
})
