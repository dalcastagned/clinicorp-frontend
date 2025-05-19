import * as muiMaterial from '@mui/material'
import { render } from '@testing-library/react'
import React from 'react'
import DynamicLogo from '.'

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useTheme: jest.fn(),
}))

describe('DynamicLogo Component', () => {
  const mockUseTheme = muiMaterial.useTheme

  beforeEach(() => {
    mockUseTheme.mockClear()
  })

  test('deve renderizar o elemento SVG', () => {
    const testColor = '#123456'
    mockUseTheme.mockReturnValue({
      palette: {
        primary: {
          main: testColor,
        },
      },
    })

    const { container } = render(<DynamicLogo />)
    const svgElement = container.querySelector('svg')
    expect(svgElement).toBeInTheDocument()
  })

  test('deve aplicar a cor primária principal do tema ao atributo fill do elemento g', () => {
    const testColor = '#abcdef'
    mockUseTheme.mockReturnValue({
      palette: {
        primary: {
          main: testColor,
        },
      },
    })

    const { container } = render(<DynamicLogo />)
    const gElement = container.querySelector('svg > g')

    expect(gElement).toBeInTheDocument()
    expect(gElement).toHaveAttribute('fill', testColor)
  })

  test('deve usar uma cor de tema diferente se fornecida', () => {
    const anotherTestColor = '#ff00ff'
    mockUseTheme.mockReturnValue({
      palette: {
        primary: {
          main: anotherTestColor,
        },
      },
    })

    const { container } = render(<DynamicLogo />)
    const gElement = container.querySelector('svg > g')

    expect(gElement).toBeInTheDocument()
    expect(gElement).toHaveAttribute('fill', anotherTestColor)
  })

  test('deve ter os atributos viewBox e preserveAspectRatio corretos no SVG', () => {
    mockUseTheme.mockReturnValue({
      palette: { primary: { main: '#000000' } },
    })

    const { container } = render(<DynamicLogo />)
    const svgElement = container.querySelector('svg')

    expect(svgElement).toHaveAttribute('viewBox', '0 0 600 600')
    expect(svgElement).toHaveAttribute('preserveAspectRatio', 'xMidYMid meet')
  })

  test('o elemento g deve ter o atributo transform correto', () => {
    mockUseTheme.mockReturnValue({
      palette: { primary: { main: '#000000' } },
    })

    const { container } = render(<DynamicLogo />)
    const gElement = container.querySelector('svg > g')

    expect(gElement).toHaveAttribute('transform', 'translate(0,600) scale(0.1,-0.1)')
  })
})
