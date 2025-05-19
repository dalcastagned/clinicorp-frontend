import { ThemeProvider, createTheme } from '@mui/material/styles' // Adicionado
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { DefaultModal } from '.'

jest.mock('@mui/material', () => {
  const actualMui = jest.requireActual('@mui/material')
  return {
    ...actualMui,
    useColorScheme: jest.fn(),
  }
})

jest.mock('react-icons/md', () => ({
  MdClose: () => <svg data-testid='md-close-icon' />,
}))

// Definição do tema mockado com a estrutura esperada
const mockMuiTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Cor primária para S.Children
    },
    // divider: 'rgba(0, 0, 0, 0.12)', // Se S.Footer acessasse theme.palette.divider diretamente
  },
  shape: {
    borderRadius: 4, // Para S.Children
  },
  colorSchemes: {
    // Essencial para S.Footer
    light: {
      palette: {
        divider: 'rgba(0, 0, 0, 0.12)',
        primary: { main: '#1976d2' }, // Adicionado para consistência se S.Children usar modo
      },
    },
    dark: {
      palette: {
        divider: 'rgba(255, 255, 255, 0.12)',
        primary: { main: '#90caf9' }, // Adicionado para consistência
      },
    },
  },
})

// Componente Wrapper para fornecer o tema
const AllTheProviders = ({ children }) => {
  return <ThemeProvider theme={mockMuiTheme}>{children}</ThemeProvider>
}

describe('DefaultModal', () => {
  const mockHandleClose = jest.fn()
  const mockHandleSubmit = jest.fn()
  const mockUseColorScheme = jest.requireMock('@mui/material').useColorScheme

  const defaultProps = {
    open: true,
    handleClose: mockHandleClose,
    title: 'Test Modal Title',
    handleSubmit: mockHandleSubmit,
    submitText: 'Test Submit',
    children: <div>Modal Content</div>,
    submitLoading: false,
    disableSubmit: false,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseColorScheme.mockReturnValue({
      mode: 'light',
      setMode: jest.fn(),
    })
  })

  test('renders nothing when open is false', () => {
    render(<DefaultModal {...defaultProps} open={false} />, { wrapper: AllTheProviders })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.queryByText(defaultProps.title)).not.toBeInTheDocument()
  })

  test('renders correctly with required props when open is true', () => {
    render(<DefaultModal {...defaultProps} />, { wrapper: AllTheProviders })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: defaultProps.title, level: 2 })).toBeInTheDocument()
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Test Submit' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Fechar modal' })).toBeInTheDocument()
  })

  test('displays the correct custom title', () => {
    render(<DefaultModal {...defaultProps} title='A Different Title' />, {
      wrapper: AllTheProviders,
    })
    expect(screen.getByRole('heading', { name: 'A Different Title', level: 2 })).toBeInTheDocument()
  })

  test('renders children content correctly', () => {
    render(<DefaultModal {...defaultProps} children={<p>Unique children content</p>} />, {
      wrapper: AllTheProviders,
    })
    expect(screen.getByText('Unique children content')).toBeInTheDocument()
  })

  describe('Close Button functionality', () => {
    test('renders close button and calls handleClose on click when handleClose is provided', () => {
      render(<DefaultModal {...defaultProps} />, { wrapper: AllTheProviders })
      const closeButton = screen.getByRole('button', { name: 'Fechar modal' })
      expect(closeButton).toBeInTheDocument()
      fireEvent.click(closeButton)
      expect(mockHandleClose).toHaveBeenCalledTimes(1)
    })

    test('does not render close button if handleClose is not provided', () => {
      render(<DefaultModal {...defaultProps} handleClose={undefined} />, {
        wrapper: AllTheProviders,
      })
      expect(screen.queryByRole('button', { name: 'Fechar modal' })).not.toBeInTheDocument()
    })

    test('Dialog onClose prop (e.g., Escape key) calls handleClose', () => {
      render(<DefaultModal {...defaultProps} />, { wrapper: AllTheProviders })
      const dialog = screen.getByRole('dialog')
      fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' })
      expect(mockHandleClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('Footer and Submit Button functionality', () => {
    test('renders footer and submit button when handleSubmit is provided', () => {
      render(<DefaultModal {...defaultProps} />, { wrapper: AllTheProviders })
      expect(screen.getByRole('button', { name: 'Test Submit' })).toBeInTheDocument()
    })

    test('does not render footer and submit button if handleSubmit is not provided', () => {
      render(<DefaultModal {...defaultProps} handleSubmit={undefined} />, {
        wrapper: AllTheProviders,
      })
      expect(screen.queryByRole('button', { name: 'Test Submit' })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Salvar' })).not.toBeInTheDocument()
    })

    test('submit button displays default text "Salvar" if submitText is not provided', () => {
      render(<DefaultModal {...defaultProps} submitText={undefined} />, {
        wrapper: AllTheProviders,
      })
      expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument()
    })

    test('calls handleSubmit on submit button click', () => {
      render(<DefaultModal {...defaultProps} />, { wrapper: AllTheProviders })
      const submitButton = screen.getByRole('button', { name: 'Test Submit' })
      fireEvent.click(submitButton)
      expect(mockHandleSubmit).toHaveBeenCalledTimes(1)
    })

    test('submit button is disabled when disableSubmit is true', () => {
      render(<DefaultModal {...defaultProps} disableSubmit={true} />, { wrapper: AllTheProviders })
      const submitButton = screen.getByRole('button', { name: 'Test Submit' })
      expect(submitButton).toBeDisabled()
    })

    test('submit button is enabled when disableSubmit and submitLoading are false', () => {
      render(<DefaultModal {...defaultProps} />, { wrapper: AllTheProviders })
      const submitButton = screen.getByRole('button', { name: 'Test Submit' })
      expect(submitButton).toBeEnabled()
    })
  })

  describe('Submit Button Loading State functionality', () => {
    test('displays CircularProgress, correct aria-label, and disables button when submitLoading is true', () => {
      render(<DefaultModal {...defaultProps} submitLoading={true} />, { wrapper: AllTheProviders })
      expect(screen.queryByText(defaultProps.submitText)).not.toBeInTheDocument()

      const circularProgress = screen.getByLabelText('Salvando dados')
      expect(circularProgress).toBeInTheDocument()

      const submitButton = circularProgress.closest('button')
      expect(submitButton).not.toBeNull()

      expect(submitButton).toBeDisabled()
      expect(submitButton).toHaveAttribute('aria-busy', 'true')
    })

    test('displays submitText, enables button, and correct aria-busy when submitLoading is false', () => {
      render(<DefaultModal {...defaultProps} submitLoading={false} />, { wrapper: AllTheProviders })
      const submitButton = screen.getByRole('button', { name: 'Test Submit' })

      expect(screen.getByText('Test Submit')).toBeInTheDocument()
      expect(screen.queryByLabelText('Salvando dados')).not.toBeInTheDocument()
      expect(submitButton).toBeEnabled()
      expect(submitButton).toHaveAttribute('aria-busy', 'false')
    })
  })

  test('renders correctly when mode is dark', () => {
    mockUseColorScheme.mockReturnValue({ mode: 'dark', setMode: jest.fn() })
    render(<DefaultModal {...defaultProps} />, { wrapper: AllTheProviders })
    expect(screen.getByRole('button', { name: 'Test Submit' })).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
