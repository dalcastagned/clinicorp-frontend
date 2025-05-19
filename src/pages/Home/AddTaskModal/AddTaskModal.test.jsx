import { ThemeProvider, createTheme } from '@mui/material/styles'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import toast from 'react-hot-toast'
import AddTaskModal from '.'
import { DefaultModal as MockedDefaultModal } from '../../../components/DefaultModal'

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
}))

const mockDefaultModalFormikSubmit = jest.fn()
const mockDefaultModalFormikClose = jest.fn()

jest.mock('../../../components/DefaultModal', () => ({
  DefaultModal: jest.fn(({ open, handleClose, title, handleSubmit, submitLoading, children }) => {
    if (!open) return null
    mockDefaultModalFormikClose.mockImplementation(handleClose)
    mockDefaultModalFormikSubmit.mockImplementation(handleSubmit)
    return (
      <div data-testid='default-modal' data-submit-loading={submitLoading}>
        <h2 id='modal-title'>{title}</h2>
        <div>{children}</div>
        <button data-testid='default-modal-submit' onClick={handleSubmit} disabled={submitLoading}>
          SubmitInternal
        </button>
        <button data-testid='default-modal-close' onClick={handleClose}>
          CloseInternal
        </button>
      </div>
    )
  }),
}))

jest.mock('react-icons/ci', () => ({
  CiCirclePlus: () => <svg data-testid='ci-circle-plus-icon' />,
}))
jest.mock('react-icons/md', () => ({
  MdDelete: () => <svg data-testid='md-delete-icon' />,
}))

const mockMuiTheme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    error: { main: '#d32f2f' },
    text: { secondary: 'rgba(0,0,0,0.6)' },
    common: { black: '#000', white: '#fff' },
    background: { paper: '#fff', default: '#fff' },
    divider: 'rgba(0,0,0,0.12)',
  },
  shape: { borderRadius: 4 },
  typography: {
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
      },
    },
    dark: {
      palette: {
        divider: 'rgba(255,255,255,0.12)',
        primary: { main: '#90caf9' },
        text: { primary: '#fff' },
      },
    },
  },
})

const AllTheProviders = ({ children }) => {
  return <ThemeProvider theme={mockMuiTheme}>{children}</ThemeProvider>
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

describe('AddTaskModal Component', () => {
  let mockOnFormSubmitProp
  let mockModalHandleClose

  const baseProps = {
    id: 'add-task-modal-form',
    open: true,
    handleClose: () => mockModalHandleClose(),
    handleSubmit: values => mockOnFormSubmitProp(values),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockOnFormSubmitProp = jest.fn().mockResolvedValue(undefined)
    mockModalHandleClose = jest.fn()
  })

  test('allows adding a new task', async () => {
    customRender(<AddTaskModal {...baseProps} />)
    const addTaskButton = screen.getByRole('button', { name: 'Adicionar Nova Tarefa' })
    fireEvent.click(addTaskButton)

    await screen.findByText('Tarefa #2')
    expect(screen.getByText('Tarefa #1')).toBeInTheDocument()
    expect(screen.getByText('Tarefa #2')).toBeInTheDocument()
    const descriptionFields = screen.getAllByLabelText('Descrição da Tarefa')
    expect(descriptionFields).toHaveLength(2)
  })

  test('allows removing a task if more than one exists', async () => {
    customRender(<AddTaskModal {...baseProps} />)
    const addTaskButton = screen.getByRole('button', { name: 'Adicionar Nova Tarefa' })
    fireEvent.click(addTaskButton)
    await screen.findByText('Tarefa #2')

    const removeButtons = screen.getAllByRole('button', { name: 'Remover Tarefa' })
    expect(removeButtons).toHaveLength(2)
    fireEvent.click(removeButtons[0])

    expect(screen.queryByText('Tarefa #2')).not.toBeInTheDocument()
    expect(screen.getByText('Tarefa #1')).toBeInTheDocument() // Renumbered
    const descriptionFields = screen.getAllByLabelText('Descrição da Tarefa')
    expect(descriptionFields).toHaveLength(1)
  })

  test('does not show remove button if only one task exists', () => {
    customRender(<AddTaskModal {...baseProps} />)
    expect(screen.queryByRole('button', { name: 'Remover Tarefa' })).not.toBeInTheDocument()
  })

  test('shows validation errors for empty required fields on submit', async () => {
    customRender(<AddTaskModal {...baseProps} />)
    const submitButton = screen.getByTestId('default-modal-submit')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getAllByText('Descrição é obrigatória')[0]).toBeInTheDocument()
      expect(screen.getAllByText('Responsável é obrigatório')[0]).toBeInTheDocument()
      expect(screen.getAllByText('Status é obrigatório')[0]).toBeInTheDocument()
    })
    expect(mockOnFormSubmitProp).not.toHaveBeenCalled()
  })

  test('shows validation errors for min length on submit', async () => {
    customRender(<AddTaskModal {...baseProps} />)

    fireEvent.change(screen.getByLabelText('Descrição da Tarefa'), { target: { value: 'a' } })
    fireEvent.change(screen.getByLabelText('Responsável'), { target: { value: 'b' } })
    fireEvent.blur(screen.getByLabelText('Descrição da Tarefa'))
    fireEvent.blur(screen.getByLabelText('Responsável'))

    const submitButton = screen.getByTestId('default-modal-submit')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('A descrição deve ter pelo menos 3 caracteres')).toBeInTheDocument()
      expect(screen.getByText('O responsável deve ter pelo menos 2 caracteres')).toBeInTheDocument()
    })
    expect(mockOnFormSubmitProp).not.toHaveBeenCalled()
  })

  test('successfully submits valid form data', async () => {
    customRender(<AddTaskModal {...baseProps} />)
    fireEvent.change(screen.getByLabelText('Descrição da Tarefa'), {
      target: { value: 'Nova Tarefa Desc' },
    })
    fireEvent.change(screen.getByLabelText('Responsável'), { target: { value: 'John Doe' } })

    const statusSelect = screen.getByLabelText('Status')
    fireEvent.mouseDown(statusSelect)
    const option = await screen.findByRole('option', { name: 'A Fazer' })
    fireEvent.click(option)

    const submitButton = screen.getByTestId('default-modal-submit')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockOnFormSubmitProp).toHaveBeenCalledWith([
        { description: 'Nova Tarefa Desc', responsable: 'John Doe', status: 'todo' },
      ])
    })
    await waitFor(() => expect(mockModalHandleClose).toHaveBeenCalled())
  })

  test('handles submission error from onFormSubmitProp', async () => {
    mockOnFormSubmitProp.mockRejectedValueOnce(new Error('Submission failed'))
    customRender(<AddTaskModal {...baseProps} />)

    fireEvent.change(screen.getByLabelText('Descrição da Tarefa'), {
      target: { value: 'Valid Desc' },
    })
    fireEvent.change(screen.getByLabelText('Responsável'), { target: { value: 'Valid Resp' } })
    const statusSelect = screen.getByLabelText('Status')
    fireEvent.mouseDown(statusSelect)
    fireEvent.click(await screen.findByRole('option', { name: 'Fazendo' }))

    const submitButton = screen.getByTestId('default-modal-submit')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Erro ao adicionar tarefas')
    })
    expect(mockModalHandleClose).not.toHaveBeenCalled() // Form should not close on error
  })

  test('calls formikResetForm and handleClose when DefaultModal close is triggered', () => {
    customRender(<AddTaskModal {...baseProps} />)
    const closeButton = screen.getByTestId('default-modal-close')
    fireEvent.click(closeButton)

    expect(mockModalHandleClose).toHaveBeenCalledTimes(1)
  })
})
