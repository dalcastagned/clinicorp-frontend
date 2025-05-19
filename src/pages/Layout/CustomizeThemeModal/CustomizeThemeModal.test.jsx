import { ThemeProvider, createTheme } from '@mui/material/styles'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import CustomizeThemeModal from '.'
import { primaryColorsArray } from '../../../utils/colors'

function defaultModalMockImplementation({
  children,
  open,
  title,
  submitText,
  handleSubmit,
  handleClose,
}) {
  if (!open) return null
  return (
    <div data-testid='default-modal' aria-label={title}>
      <h2 id='default-modal-title'>{title}</h2>
      <div>{children}</div>
      {handleSubmit && <button onClick={handleSubmit}>{submitText}</button>}
      {handleClose && (
        <button aria-label='Close Default Modal' onClick={handleClose}>
          X
        </button>
      )}
    </div>
  )
}

jest.mock('../../../components/DefaultModal', () => ({
  DefaultModal: jest.fn(defaultModalMockImplementation),
}))

import { DefaultModal as MockedDefaultModal } from '../../../components/DefaultModal'

const mockSetMode = jest.fn()
const mockHandleChangePrimaryColor = jest.fn()

jest.mock('@mui/material', () => {
  const actualMui = jest.requireActual('@mui/material')
  return {
    ...actualMui,
    useColorScheme: jest.fn(() => ({ mode: 'light', setMode: mockSetMode })),
    Typography: actualMui.Typography,
    Box: actualMui.Box,
  }
})

jest.mock('./ColorPicker', () => {
  return jest.fn(props => (
    <button
      data-testid={`color-picker-${props.color}`}
      aria-label={`Color picker for ${props.color}`}
      onClick={() => mockHandleChangePrimaryColor(props.color)}
    >
      {props.color}
    </button>
  ))
})

jest.mock('react-icons/fa', () => ({
  FaSun: () => <svg data-testid='fa-sun-icon' />,
  FaMoon: () => <svg data-testid='fa-moon-icon' />,
}))

const mockMuiUserTheme = createTheme({
  palette: {
    common: { white: '#ffffff', black: '#000000' },
    primary: { main: '#1976d2' },
    text: { primary: '#212121' },
  },
  shape: { borderRadius: 4 },
  colorSchemes: {
    light: {
      palette: {
        text: { primary: '#212121' },
        primary: { main: '#1976d2' },
        divider: 'rgba(0,0,0,0.12)',
      },
    },
    dark: {
      palette: {
        text: { primary: '#ffffff' },
        primary: { main: '#90caf9' },
        divider: 'rgba(255,255,255,0.12)',
      },
    },
  },
})

const AllTheProviders = ({ children }) => {
  return <ThemeProvider theme={mockMuiUserTheme}>{children}</ThemeProvider>
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

describe('CustomizeThemeModal', () => {
  const mockHandleClose = jest.fn()
  const mockMuiUseColorScheme = jest.requireMock('@mui/material').useColorScheme

  beforeEach(() => {
    jest.clearAllMocks()
    MockedDefaultModal.mockClear()
    mockMuiUseColorScheme.mockReturnValue({ mode: 'light', setMode: mockSetMode })
  })

  const defaultModalProps = {
    open: true,
    handleClose: mockHandleClose,
  }

  test('renders theme and color section titles', () => {
    customRender(<CustomizeThemeModal {...defaultModalProps} />)
    expect(screen.getByRole('heading', { name: 'Tema', level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Cor principal', level: 3 })).toBeInTheDocument()
  })

  test('renders theme selection buttons with icons', () => {
    customRender(<CustomizeThemeModal {...defaultModalProps} />)
    expect(screen.getByRole('radio', { name: 'Tema claro' })).toBeInTheDocument()
    expect(screen.getByTestId('fa-sun-icon')).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Tema escuro' })).toBeInTheDocument()
    expect(screen.getByTestId('fa-moon-icon')).toBeInTheDocument()
  })

  test('calls setMode with "light" when light theme button is clicked', () => {
    customRender(<CustomizeThemeModal {...defaultModalProps} />)
    const lightThemeButton = screen.getByRole('radio', { name: 'Tema claro' })
    fireEvent.click(lightThemeButton)
    expect(mockSetMode).toHaveBeenCalledWith('light')
  })

  test('calls setMode with "dark" when dark theme button is clicked', () => {
    customRender(<CustomizeThemeModal {...defaultModalProps} />)
    const darkThemeButton = screen.getByRole('radio', { name: 'Tema escuro' })
    fireEvent.click(darkThemeButton)
    expect(mockSetMode).toHaveBeenCalledWith('dark')
  })

  test('renders ColorPicker for each primary color from actual utils', () => {
    customRender(<CustomizeThemeModal {...defaultModalProps} />)
    primaryColorsArray.forEach(color => {
      expect(screen.getByTestId(`color-picker-${color}`)).toBeInTheDocument()
    })
    const colorPickerMocks = screen.getAllByRole('button', { name: /Color picker for/i })
    expect(colorPickerMocks).toHaveLength(primaryColorsArray.length)
  })

  test('theme and color sections have correct ARIA group roles and labels', () => {
    customRender(<CustomizeThemeModal {...defaultModalProps} />)
    const themeGroup = screen.getByRole('group', { name: 'Tema' })
    const colorGroup = screen.getByRole('group', { name: 'Cor principal' })
    expect(themeGroup).toBeInTheDocument()
    expect(colorGroup).toBeInTheDocument()

    const themeRadioGroup = themeGroup.querySelector('[role="radiogroup"]')
    const colorRadioGroup = colorGroup.querySelector('[role="radiogroup"]')
    expect(themeRadioGroup).toHaveAttribute('aria-labelledby', 'theme-group-label')
    expect(colorRadioGroup).toHaveAttribute('aria-labelledby', 'color-group-label')
  })
})
