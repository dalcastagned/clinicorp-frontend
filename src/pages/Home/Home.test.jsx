import { ThemeProvider, createTheme } from '@mui/material/styles'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import toast from 'react-hot-toast'
import Home from '.'
import { api } from '../../api'

jest.mock('../../api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}))

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
  success: jest.fn(),
}))

jest.mock('./Header', () => jest.fn(() => <div data-testid='header-mock'>Header</div>))
jest.mock('./Content', () =>
  jest.fn(({ loading, data }) => (
    <div data-testid='content-mock' data-loading={loading}>
      {data ? `${data.length} items` : 'No data'}
    </div>
  )),
)

const mockInternalAddTaskModalSubmit = jest.fn()
const mockInternalAddTaskModalClose = jest.fn()
jest.mock('./AddTaskModal', () => {
  return jest.fn(({ open, handleClose, handleSubmit }) => {
    if (!open) return null
    mockInternalAddTaskModalClose.mockImplementation(handleClose)
    mockInternalAddTaskModalSubmit.mockImplementation(handleSubmit)
    return (
      <div data-testid='add-task-modal-mock'>
        <button
          data-testid='add-task-modal-submit-trigger'
          onClick={async () => {
            try {
              await handleSubmit([])
            } catch {
              // Handle error
            }
          }}
        >
          Simulate Modal Submit
        </button>
        <button data-testid='add-task-modal-close-trigger' onClick={handleClose}>
          Simulate Modal Close
        </button>
      </div>
    )
  })
})

import ContentMock from './Content'
import HeaderMock from './Header'

jest.mock('react-icons/ci', () => ({
  CiCirclePlus: () => <svg data-testid='ci-circle-plus-icon' />,
}))

let currentGlobalMode = 'light'
const mockGlobalSetMode = jest.fn()
jest.mock('@mui/material', () => {
  const actualMui = jest.requireActual('@mui/material')
  return {
    ...actualMui,
    useColorScheme: jest.fn(() => ({ mode: currentGlobalMode, setMode: mockGlobalSetMode })),
  }
})

const mockMuiUserTheme = createTheme({
  palette: {
    common: { white: '#ffffff', black: '#000000' },
    primary: { main: '#1976d2' },
    text: { primary: '#212121', secondary: 'rgba(0,0,0,0.6)' },
    divider: 'rgba(0,0,0,0.12)',
    background: { paper: '#fff', default: '#fff' },
    error: { main: '#d32f2f' },
  },
  shape: { borderRadius: 4 },
  typography: {
    h5: { fontSize: '1.5rem' },
    h6: { fontSize: '1.25rem' },
    body1: { fontSize: '1rem' },
    caption: { fontSize: '0.75rem' },
  },
  colorSchemes: {
    light: {
      palette: {
        divider: 'rgba(0,0,0,0.12)',
        primary: { main: '#1976d2' },
        text: { primary: '#000' },
        background: { paper: '#fff', default: '#fff' },
      },
    },
    dark: {
      palette: {
        divider: 'rgba(255,255,255,0.12)',
        primary: { main: '#90caf9' },
        text: { primary: '#fff' },
        background: { paper: '#121212', default: '#121212' },
      },
    },
  },
  zIndex: { appBar: 1100 },
})

const AllTheProviders = ({ children }) => {
  return <ThemeProvider theme={mockMuiUserTheme}>{children}</ThemeProvider>
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

const MAIN_HEADER_ID = 'task-list-main-title'
const ADD_TASK_MODAL_ID = 'add-task-modal-dialog'

const mockTasksData = [
  { id: '1', status: 'todo', description: 'Task 1', responsable: 'User A', computer: 'PC1' },
  { id: '2', status: 'doing', description: 'Task 2', responsable: 'User B', computer: 'PC2' },
  { id: '3', status: 'done', description: 'Task 3', responsable: 'User C', computer: 'PC3' },
]

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    api.get.mockResolvedValue({ data: [] })
    api.post.mockResolvedValue({ data: {} })
    currentGlobalMode = 'light'
  })

  test('renders initial layout and calls handleGetData on mount', async () => {
    api.get.mockResolvedValue({ data: mockTasksData })
    customRender(<Home />)

    expect(screen.getByTestId('header-mock')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /adicionar tarefas/i })).toBeInTheDocument()
    expect(screen.getByTestId('content-mock')).toBeInTheDocument()
    expect(api.get).toHaveBeenCalledWith('get-tasks')
    await waitFor(() => {
      expect(ContentMock).toHaveBeenCalledWith({ loading: false, data: mockTasksData }, undefined)
      expect(HeaderMock).toHaveBeenCalledWith({ todo: 1, doing: 1, done: 1 }, undefined)
    })
  })

  test('handles error during initial data fetch', async () => {
    api.get.mockRejectedValueOnce(new Error('API Error'))
    customRender(<Home />)

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Erro ao buscar tarefas'))
    await waitFor(() => {
      expect(ContentMock).toHaveBeenCalledWith({ loading: false, data: [] }, undefined)
      expect(HeaderMock).toHaveBeenCalledWith({ todo: 0, doing: 0, done: 0 }, undefined)
    })
  })

  test('handles successful task addition via AddTaskModal', async () => {
    api.get.mockResolvedValueOnce({ data: [] })
    customRender(<Home />)
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1))

    const addTaskButton = screen.getByRole('button', { name: /adicionar tarefas/i })
    fireEvent.click(addTaskButton)
    await screen.findByTestId('add-task-modal-mock')

    api.post.mockResolvedValueOnce({ data: { message: 'Success' } })
    api.get.mockResolvedValueOnce({ data: mockTasksData })

    const simulateModalSubmitButton = screen.getByTestId('add-task-modal-submit-trigger')
    fireEvent.click(simulateModalSubmitButton)

    await waitFor(() => expect(api.post).toHaveBeenCalledWith('insert-tasks', expect.anything()))
    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith('Tarefa(s) adicionada(s) com sucesso'),
    )
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(2))
    await waitFor(() => {
      expect(HeaderMock).toHaveBeenLastCalledWith({ todo: 1, doing: 1, done: 1 }, undefined)
    })
  })

  test('handles failed task addition via AddTaskModal', async () => {
    customRender(<Home />)
    const addTaskButton = screen.getByRole('button', { name: /adicionar tarefas/i })
    fireEvent.click(addTaskButton)
    await screen.findByTestId('add-task-modal-mock')

    api.post.mockRejectedValueOnce(new Error('Failed to add'))

    const simulateModalSubmitButton = screen.getByTestId('add-task-modal-submit-trigger')
    fireEvent.click(simulateModalSubmitButton)

    await waitFor(() => expect(api.post).toHaveBeenCalledWith('insert-tasks', expect.anything()))
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Erro ao adicionar tarefa(s)'))
    expect(api.get).toHaveBeenCalledTimes(1)
  })

  test('main container has correct ARIA attributes', () => {
    customRender(<Home />)
    const mainContainer = screen.getByRole('main')
    expect(mainContainer).toHaveAttribute('aria-labelledby', MAIN_HEADER_ID)
  })

  test('add task button has correct ARIA attributes', () => {
    customRender(<Home />)
    const addTaskButton = screen.getByRole('button', { name: /adicionar tarefas/i })
    expect(addTaskButton).toHaveAttribute('aria-controls', ADD_TASK_MODAL_ID)
    expect(addTaskButton).toHaveAttribute('aria-haspopup', 'dialog')
  })
})
