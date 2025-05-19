import { ThemeProvider, createTheme } from '@mui/material/styles'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import ColorPicker from '.'
import * as useThemeHook from '../../../../hooks/useTheme'

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useColorScheme: jest.fn(),
}))

jest.mock('../../../../hooks/useTheme', () => ({
  useTheme: jest.fn(),
}))

jest.mock('react-icons/fa', () => ({
  FaCheck: () => <svg data-testid='facheck-icon' />,
}))

const mockMuiUserTheme = createTheme({
  palette: {
    common: {
      white: '#ffffff',
      black: '#000000',
    },
  },
})

const AllTheProviders = ({ children }) => {
  return <ThemeProvider theme={mockMuiUserTheme}>{children}</ThemeProvider>
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

describe('ColorPicker Component', () => {
  const mockHandleChangePrimaryColor = jest.fn()
  const mockMuiUseColorScheme = jest.requireMock('@mui/material').useColorScheme
  const mockAppUseTheme = useThemeHook.useTheme

  const testColor = '#ff0000'

  beforeEach(() => {
    jest.clearAllMocks()
    mockMuiUseColorScheme.mockReturnValue({
      mode: 'light',
      setMode: jest.fn(),
    })
    mockAppUseTheme.mockReturnValue({
      primaryColor: '#0000ff',
      handleChangePrimaryColor: mockHandleChangePrimaryColor,
    })
  })

  test('renders the picker with correct initial ARIA attributes and background color', () => {
    customRender(<ColorPicker color={testColor} />)
    const pickerButton = screen.getByRole('radio', { name: `Selecionar cor ${testColor}` })
    expect(pickerButton).toBeInTheDocument()
    expect(pickerButton).toHaveAttribute('aria-checked', 'false')
    expect(pickerButton).toHaveStyle(`background-color: ${testColor}`)
  })

  test('displays check icon and sets aria-checked to true when selected', () => {
    mockAppUseTheme.mockReturnValue({
      primaryColor: testColor,
      handleChangePrimaryColor: mockHandleChangePrimaryColor,
    })
    customRender(<ColorPicker color={testColor} />)
    const pickerButton = screen.getByRole('radio', { name: `Selecionar cor ${testColor}` })
    expect(pickerButton).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByTestId('facheck-icon')).toBeInTheDocument()
  })

  test('does not display check icon and sets aria-checked to false when not selected', () => {
    mockAppUseTheme.mockReturnValue({
      primaryColor: '#00ff00',
      handleChangePrimaryColor: mockHandleChangePrimaryColor,
    })
    customRender(<ColorPicker color={testColor} />)
    const pickerButton = screen.getByRole('radio', { name: `Selecionar cor ${testColor}` })
    expect(pickerButton).toHaveAttribute('aria-checked', 'false')
    expect(screen.queryByTestId('facheck-icon')).not.toBeInTheDocument()
  })

  test('calls handleChangePrimaryColor with its color prop when clicked', () => {
    customRender(<ColorPicker color={testColor} />)
    const pickerButton = screen.getByRole('radio', { name: `Selecionar cor ${testColor}` })
    fireEvent.click(pickerButton)
    expect(mockHandleChangePrimaryColor).toHaveBeenCalledWith(testColor)
    expect(mockHandleChangePrimaryColor).toHaveBeenCalledTimes(1)
  })

  test('correctly reflects dark mode in its props for styling (implicitly tested by S.Picker)', () => {
    mockMuiUseColorScheme.mockReturnValue({
      mode: 'dark',
      setMode: jest.fn(),
    })
    mockAppUseTheme.mockReturnValue({
      primaryColor: testColor,
      handleChangePrimaryColor: mockHandleChangePrimaryColor,
    })

    customRender(<ColorPicker color={testColor} />)
    const pickerButton = screen.getByRole('radio', { name: `Selecionar cor ${testColor}` })
    expect(pickerButton).toBeInTheDocument()
  })
})
