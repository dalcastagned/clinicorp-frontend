import { ThemeProvider, createTheme } from '@mui/material/styles'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import Layout from '.'

jest.mock('./Header', () => {
  return function MockHeader() {
    return <div data-testid='header-mock'>HeaderMock</div>
  }
})

jest.mock('./Footer', () => {
  return function MockFooter() {
    return <div data-testid='footer-mock'>FooterMock</div>
  }
})

const mockMuiTheme = createTheme()

const AllTheProviders = ({ children }) => {
  return <ThemeProvider theme={mockMuiTheme}>{children}</ThemeProvider>
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

describe('Layout Component', () => {
  test('renders Header, Footer, and children content', () => {
    const childrenText = 'Main Content Area'
    customRender(
      <Layout>
        <p>{childrenText}</p>
      </Layout>,
    )

    expect(screen.getByTestId('header-mock')).toBeInTheDocument()
    expect(screen.getByText('HeaderMock')).toBeInTheDocument()

    expect(screen.getByText(childrenText)).toBeInTheDocument()

    expect(screen.getByTestId('footer-mock')).toBeInTheDocument()
    expect(screen.getByText('FooterMock')).toBeInTheDocument()
  })

  test('renders correctly with different children', () => {
    customRender(
      <Layout>
        <section>
          <h1>Another Title</h1>
          <span>Some other content</span>
        </section>
      </Layout>,
    )

    expect(screen.getByTestId('header-mock')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Another Title' })).toBeInTheDocument()
    expect(screen.getByText('Some other content')).toBeInTheDocument()
    expect(screen.getByTestId('footer-mock')).toBeInTheDocument()
  })
})
