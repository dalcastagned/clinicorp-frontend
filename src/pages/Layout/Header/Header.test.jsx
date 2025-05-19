import * as muiMaterial from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import Header from '.'
import CustomizeThemeModalAsMock from '../CustomizeThemeModal'

let currentMode = 'light'
const mockSetMode = jest.fn()

jest.mock('@mui/material', () => {
  const actualMui = jest.requireActual('@mui/material')
  return {
    ...actualMui,
    useColorScheme: jest.fn(() => ({ mode: currentMode, setMode: mockSetMode })),
    Menu: jest.fn(({ children, open, onClose, anchorEl }) => {
      if (!open || !anchorEl) return null
      return (
        <div data-testid='menu-styled-mock' data-open={open}>
          {children}
          <button data-testid='menu-onclose-trigger' onClick={onClose}>
            SimulateMenuClose
          </button>
        </div>
      )
    }),
    MenuItem: jest.fn(({ children, onClick }) => (
      <button data-testid='menuitem-styled-mock' onClick={onClick}>
        {children}
      </button>
    )),
  }
})

jest.mock('../../../components/DynamicLogo', () => {
  return function MockDynamicLogo() {
    return <div data-testid='dynamic-logo-mock'>DynamicLogoMock</div>
  }
})

const mockInternalCloseCustomizeModal = jest.fn()
jest.mock('../CustomizeThemeModal', () => {
  return jest.fn(({ open, handleClose }) => {
    if (!open) return null
    mockInternalCloseCustomizeModal.mockImplementation(handleClose)
    return (
      <div data-testid='customize-theme-modal-mock'>
        CustomizeThemeModalMock
        <button data-testid='close-customize-modal-button' onClick={handleClose}>
          CloseCustomizeModal
        </button>
      </div>
    )
  })
})

jest.mock('react-icons/bs', () => ({
  BsFillGearFill: () => <svg data-testid='bs-gear-icon' />,
}))

jest.mock('react-icons/md', () => ({
  MdOutlineColorLens: () => <svg data-testid='md-colorlens-icon' />,
}))

const mockMuiUserTheme = createTheme({
  palette: {
    common: { white: '#ffffff', black: '#000000' },
    primary: { main: '#1976d2' },
    text: { primary: '#212121', secondary: '#757575' },
    divider: 'rgba(0,0,0,0.12)',
    background: { paper: '#fff', default: '#f5f5f5' },
  },
  shape: { borderRadius: 4 },
  colorSchemes: {
    light: {
      palette: {
        text: { primary: '#212121', secondary: '#757575' },
        primary: { main: '#1976d2' },
        divider: 'rgba(0,0,0,0.12)',
        background: { paper: '#fff', default: '#f5f5f5', defaultChannel: '0 0 0' },
        common: { white: '#ffffff', black: '#000000' },
      },
    },
    dark: {
      palette: {
        text: { primary: '#ffffff', secondary: '#aaaaaa' },
        primary: { main: '#90caf9' },
        divider: 'rgba(255,255,255,0.12)',
        background: { paper: '#121212', default: '#000000', defaultChannel: '255 255 255' },
        common: { white: '#ffffff', black: '#000000' },
      },
    },
  },
  zIndex: {
    appBar: 1100,
  },
})

const AllTheProviders = ({ children }) => {
  return <ThemeProvider theme={mockMuiUserTheme}>{children}</ThemeProvider>
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

describe('Header Component', () => {
  const mockMuiUseColorScheme = muiMaterial.useColorScheme

  beforeEach(() => {
    jest.clearAllMocks()
    currentMode = 'light'
    mockMuiUseColorScheme.mockReturnValue({ mode: currentMode, setMode: mockSetMode })
    CustomizeThemeModalAsMock.mockClear()
  })

  test('renders logo, title, and settings button', () => {
    customRender(<Header />)
    expect(screen.getByTestId('dynamic-logo-mock')).toBeInTheDocument()
    expect(screen.getByText('TO-DO List')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '' })).toContainElement(
      screen.getByTestId('bs-gear-icon'),
    )
  })

  test('settings menu and customize theme modal are initially closed', () => {
    customRender(<Header />)
    expect(screen.queryByTestId('menu-styled-mock')).not.toBeInTheDocument()
    expect(screen.queryByTestId('customize-theme-modal-mock')).not.toBeInTheDocument()
  })

  describe('Settings Menu Interaction', () => {
    test('clicking gear icon opens the settings menu', () => {
      customRender(<Header />)
      const gearButton = screen.getByTestId('bs-gear-icon').closest('button')
      fireEvent.click(gearButton)
      expect(screen.getByTestId('menu-styled-mock')).toBeInTheDocument()
      expect(screen.getByText('Configurações')).toBeInTheDocument()
      expect(screen.getByText('Customizar tema')).toBeInTheDocument()
      expect(screen.getByTestId('md-colorlens-icon')).toBeInTheDocument()
    })

    test('menu onClose handler closes the menu', () => {
      customRender(<Header />)
      const gearButton = screen.getByTestId('bs-gear-icon').closest('button')
      fireEvent.click(gearButton)
      expect(screen.getByTestId('menu-styled-mock')).toBeInTheDocument()

      const menuCloseTrigger = screen.getByTestId('menu-onclose-trigger')
      fireEvent.click(menuCloseTrigger)
      expect(screen.queryByTestId('menu-styled-mock')).not.toBeInTheDocument()
    })
  })

  describe('CustomizeThemeModal Interaction', () => {
    test('CustomizeThemeModal handleClose callback closes the modal', () => {
      customRender(<Header />)
      const gearButton = screen.getByTestId('bs-gear-icon').closest('button')
      fireEvent.click(gearButton)
      const customizeThemeMenuItem = screen.getByTestId('menuitem-styled-mock')
      fireEvent.click(customizeThemeMenuItem)

      expect(screen.getByTestId('customize-theme-modal-mock')).toBeInTheDocument()

      const closeModalButton = screen.getByTestId('close-customize-modal-button')
      fireEvent.click(closeModalButton)

      expect(screen.queryByTestId('customize-theme-modal-mock')).not.toBeInTheDocument()
    })
  })

  test('passes mode to S.Header (implicitly tested by rendering without theme errors)', () => {
    currentMode = 'dark'
    mockMuiUseColorScheme.mockReturnValue({ mode: currentMode, setMode: mockSetMode })
    customRender(<Header />)
    expect(screen.getByText('TO-DO List')).toBeInTheDocument()
  })
})
