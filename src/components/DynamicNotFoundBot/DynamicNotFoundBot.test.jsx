import * as muiMaterial from '@mui/material'
import { render } from '@testing-library/react'
import React from 'react'
import DynamicNotFoundBot from '.'

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useTheme: jest.fn(),
}))

describe('DynamicNotFoundBot Component', () => {
  const mockUseTheme = muiMaterial.useTheme

  beforeEach(() => {
    mockUseTheme.mockClear()
  })

  test('deve renderizar o elemento SVG com a role correta', () => {
    mockUseTheme.mockReturnValue({
      palette: {
        primary: {
          main: '#000000',
        },
      },
    })

    const { getByRole } = render(<DynamicNotFoundBot />)
    const svgElement = getByRole('img')
    expect(svgElement).toBeInTheDocument()
    expect(svgElement.tagName).toBe('svg')
  })

  test('deve aplicar a cor primária principal do tema ao primeiro elemento path', () => {
    const testColor = '#abcdef'
    mockUseTheme.mockReturnValue({
      palette: {
        primary: {
          main: testColor,
        },
      },
    })

    const { container } = render(<DynamicNotFoundBot />)
    const firstPathElement = container.querySelector('svg > path:first-of-type')

    expect(firstPathElement).toBeInTheDocument()
    expect(firstPathElement).toHaveAttribute('fill', testColor)
  })

  test('deve usar uma cor de tema diferente se fornecida ao primeiro path', () => {
    const anotherTestColor = '#ff00ff'
    mockUseTheme.mockReturnValue({
      palette: {
        primary: {
          main: anotherTestColor,
        },
      },
    })

    const { container } = render(<DynamicNotFoundBot />)
    const firstPathElement = container.querySelector('svg > path:first-of-type')

    expect(firstPathElement).toBeInTheDocument()
    expect(firstPathElement).toHaveAttribute('fill', anotherTestColor)
  })

  test('deve ter os atributos viewBox, width e height corretos no SVG', () => {
    mockUseTheme.mockReturnValue({
      palette: { primary: { main: '#000000' } },
    })

    const { getByRole } = render(<DynamicNotFoundBot />)
    const svgElement = getByRole('img')

    expect(svgElement).toHaveAttribute('viewBox', '0 0 672.5315 738.39398')
    expect(svgElement).toHaveAttribute('width', '672.5315')
    expect(svgElement).toHaveAttribute('height', '738.39398')
  })

  test('o segundo elemento path deve ter a cor de preenchimento estática correta', () => {
    mockUseTheme.mockReturnValue({
      palette: { primary: { main: '#000000' } },
    })

    const { container } = render(<DynamicNotFoundBot />)
    const secondPathInG = container.querySelector('svg > g > path')
    const thirdPathOverall = container.querySelectorAll('svg > path')[1]

    expect(secondPathInG).toBeInTheDocument()
    expect(secondPathInG).toHaveAttribute('fill', '#fff')

    expect(thirdPathOverall).toBeInTheDocument()
    expect(thirdPathOverall).toHaveAttribute('fill', '#3f3d56')
  })

  test('o grupo g deve ter a opacidade correta', () => {
    mockUseTheme.mockReturnValue({
      palette: { primary: { main: '#000000' } },
    })

    const { container } = render(<DynamicNotFoundBot />)
    const gElement = container.querySelector('svg > g')

    expect(gElement).toBeInTheDocument()
    expect(gElement).toHaveAttribute('opacity', '0.1')
  })
})
