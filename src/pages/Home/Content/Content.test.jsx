import { ThemeProvider, createTheme } from '@mui/material/styles'
import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import React from 'react'
import Content from '.'

jest.mock('react-icons/ri', () => ({
  RiTodoLine: () => <svg data-testid='ri-todo-line-icon' />,
}))
jest.mock('react-icons/gr', () => ({
  GrInProgress: () => <svg data-testid='gr-inprogress-icon' />,
}))
jest.mock('react-icons/io', () => ({
  IoMdDoneAll: () => <svg data-testid='io-done-all-icon' />,
}))

const mockMuiTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    text: {
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
    common: {
      black: '#000',
      white: '#fff',
    },
  },
  typography: {
    body2: { fontSize: '0.875rem' },
    fontWeightBold: 700,
  },
  shape: {
    borderRadius: 4,
  },
})

const AllTheProviders = ({ children }) => {
  return <ThemeProvider theme={mockMuiTheme}>{children}</ThemeProvider>
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

const mockData = [
  {
    id: '1',
    description: 'Tarefa 1',
    responsable: 'Alice',
    status: 'done',
    computer: 'PC-01',
  },
  {
    id: '2',
    description: 'Tarefa 2',
    responsable: 'Bob',
    status: 'doing',
    computer: 'PC-02',
  },
  {
    id: '3',
    description: 'Tarefa 3',
    responsable: 'Charlie',
    status: 'todo',
    computer: 'PC-03',
  },
  {
    id: '4',
    description: 'Tarefa com status desconhecido',
    responsable: 'Dave',
    status: 'unknown_status',
    computer: 'PC-04',
  },
]

describe('Content Component', () => {
  test('renders loading state correctly', () => {
    customRender(<Content data={[]} loading={true} />)
    expect(screen.getByRole('status', { name: 'Carregando dados das tarefas' })).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    expect(screen.queryByText(/nenhuma tarefa encontrada/i)).not.toBeInTheDocument()
  })

  test('renders "no data" message when not loading and data is empty', () => {
    customRender(<Content data={[]} loading={false} />)
    expect(screen.getByText(/nenhuma tarefa encontrada/i)).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  test('renders table with data and correct status icons/aria-labels', () => {
    customRender(<Content data={mockData} loading={false} />)

    const table = screen.getByRole('table', { name: /lista de tarefas cadastradas/i })
    expect(table).toBeInTheDocument()

    const tableHeaders = within(table).getAllByRole('columnheader')
    expect(tableHeaders[0]).toHaveTextContent('Descrição')
    expect(tableHeaders[1]).toHaveTextContent('Responsável')
    expect(tableHeaders[2]).toHaveTextContent('Computador')
    expect(tableHeaders[3]).toHaveTextContent('Status')

    const rows = within(table).getAllByRole('row')
    expect(rows).toHaveLength(mockData.length + 1)

    mockData.forEach((task, index) => {
      const currentRow = rows[index + 1]
      const cells = within(currentRow).getAllByRole('cell')
      const statusCell = cells[3]

      expect(within(cells[0]).getByText(task.description)).toBeInTheDocument()
      expect(within(cells[1]).getByText(task.responsable)).toBeInTheDocument()
      expect(within(cells[2]).getByText(task.computer)).toBeInTheDocument()

      if (task.status === 'done') {
        expect(within(statusCell).getByTestId('io-done-all-icon')).toBeInTheDocument()
        expect(within(statusCell).getByRole('img', { name: 'Concluída' })).toBeInTheDocument()
      } else if (task.status === 'doing') {
        expect(within(statusCell).getByTestId('gr-inprogress-icon')).toBeInTheDocument()
        expect(within(statusCell).getByRole('img', { name: 'Fazendo' })).toBeInTheDocument()
      } else if (task.status === 'todo') {
        expect(within(statusCell).getByTestId('ri-todo-line-icon')).toBeInTheDocument()
        expect(within(statusCell).getByRole('img', { name: 'A fazer' })).toBeInTheDocument()
      } else if (task.status === 'unknown_status') {
        expect(statusCell.textContent).toBe('')
        expect(within(statusCell).queryByRole('img')).not.toBeInTheDocument()
      }
    })
  })

  test('renders table caption correctly', () => {
    customRender(<Content data={mockData} loading={false} />)
    const table = screen.getByRole('table')
    const caption = within(table).getByText('Lista de Tarefas Cadastradas')
    expect(caption.tagName).toBe('CAPTION')
  })

  test('container has aria-live polite', () => {
    const { container } = customRender(<Content data={[]} loading={false} />)
    expect(container.firstChild).toHaveAttribute('aria-live', 'polite')
  })
})
