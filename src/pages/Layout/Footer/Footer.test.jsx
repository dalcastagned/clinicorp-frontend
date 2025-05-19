import * as muiMaterial from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import Footer from '.'

const mockSetMode = jest.fn()
let currentMode = 'light'

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useColorScheme: jest.fn(() => ({ mode: currentMode, setMode: mockSetMode })),
}))

jest.mock('react-icons/fa', () => ({
  FaLinkedin: jest.fn(props => <svg data-testid='linkedin-icon' {...props} />),
  FaGithub: jest.fn(props => <svg data-testid='github-icon' {...props} />),
}))

import { FaGithub as MockedFaGithub, FaLinkedin as MockedFaLinkedin } from 'react-icons/fa'

const mockMuiUserTheme = createTheme({
  palette: {
    common: { white: '#ffffff', black: '#000000' },
    primary: { main: '#1976d2' },
    text: { primary: '#212121' },
    divider: 'rgba(0,0,0,0.12)',
    background: { paper: '#fff', default: '#f5f5f5' },
  },
  shape: { borderRadius: 4 },
  colorSchemes: {
    light: {
      palette: {
        text: { primary: '#212121' },
        primary: { main: '#1976d2' },
        divider: 'rgba(0,0,0,0.12)',
        background: { paper: '#fff', default: '#f5f5f5' },
        common: { white: '#ffffff', black: '#000000' },
      },
    },
    dark: {
      palette: {
        text: { primary: '#ffffff' },
        primary: { main: '#90caf9' },
        divider: 'rgba(255,255,255,0.12)',
        background: { paper: '#121212', default: '#000000' },
        common: { white: '#ffffff', black: '#000000' },
      },
    },
  },
})

const AllTheProviders = ({ children }) => {
  return <ThemeProvider theme={mockMuiUserTheme}>{children}</ThemeProvider>
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

describe('Footer Component', () => {
  const mockMuiUseColorScheme = muiMaterial.useColorScheme

  beforeEach(() => {
    jest.clearAllMocks()
    currentMode = 'light'
    mockMuiUseColorScheme.mockReturnValue({ mode: currentMode, setMode: mockSetMode })
  })

  test('renders the static text content', () => {
    customRender(<Footer />)
    expect(screen.getByText(/feito por daniel dalcastagne/i)).toBeInTheDocument()
  })

  test('renders as a footer HTML element', () => {
    customRender(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  describe('LinkedIn Link', () => {
    test('renders LinkedIn link with correct href, target, rel, and aria-label', () => {
      customRender(<Footer />)
      const linkedInLink = screen.getByRole('link', {
        name: /linkedin de daniel dalcastagne/i,
      })
      expect(linkedInLink).toBeInTheDocument()
      expect(linkedInLink).toHaveAttribute(
        'href',
        'https://www.linkedin.com/in/daniel-dalcastagne/',
      )
      expect(linkedInLink).toHaveAttribute('target', '_blank')
      expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    test('renders LinkedIn icon with correct accessibility attributes passed', () => {
      customRender(<Footer />)
      expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument()
      expect(MockedFaLinkedin).toHaveBeenCalledWith(
        {
          'aria-hidden': 'true',
          focusable: 'false',
        },
        undefined,
      )
    })
  })

  describe('GitHub Link', () => {
    test('renders GitHub link with correct href, target, rel, and aria-label', () => {
      customRender(<Footer />)
      const githubLink = screen.getByRole('link', {
        name: /github de daniel dalcastagne/i,
      })
      expect(githubLink).toBeInTheDocument()
      expect(githubLink).toHaveAttribute('href', 'https://github.com/dalcastagned')
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    test('renders GitHub icon with correct accessibility attributes passed', () => {
      customRender(<Footer />)
      expect(screen.getByTestId('github-icon')).toBeInTheDocument()
      expect(MockedFaGithub).toHaveBeenCalledWith(
        {
          'aria-hidden': 'true',
          focusable: 'false',
        },
        undefined,
      )
    })
  })

  test('calls useColorScheme and implicitly passes mode to S.Footer', () => {
    customRender(<Footer />)
    expect(mockMuiUseColorScheme).toHaveBeenCalled()
  })

  test('renders correctly when mode is dark', () => {
    currentMode = 'dark'
    mockMuiUseColorScheme.mockReturnValue({ mode: currentMode, setMode: mockSetMode })
    customRender(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(mockMuiUseColorScheme).toHaveBeenCalled()
  })
})
