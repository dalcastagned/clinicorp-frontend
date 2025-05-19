import { darken, lighten } from '@mui/material/styles'
import { act, renderHook } from '@testing-library/react'
import React from 'react'
import { primaryColorsArray } from '../../utils/colors'
import { ThemeProviderCustom, useTheme } from '../useTheme'

const defaultTestColor = primaryColorsArray[primaryColorsArray.length - 1]

describe('ThemeProviderCustom and useTheme Hook', () => {
  const primaryColorKey = 'mui-color-scheme-primary-color'

  const wrapper = ({ children }) => <ThemeProviderCustom>{children}</ThemeProviderCustom>

  test('deve inicializar com a cor primária padrão se o localStorage estiver vazio', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(window.localStorage.getItem).toHaveBeenCalledWith(primaryColorKey)
    expect(result.current.primaryColor).toBe(defaultTestColor)
    expect(window.localStorage.setItem).toHaveBeenCalledWith(primaryColorKey, defaultTestColor)
    expect(result.current.theme.colorSchemes.light.palette.primary.main).toBe(defaultTestColor)
    expect(result.current.theme.colorSchemes.dark.palette.primary.main).toBe(defaultTestColor)
  })

  test('deve inicializar com a cor primária do localStorage se existir', () => {
    const storedColor = '#123456'
    window.localStorage.setItem(primaryColorKey, storedColor)

    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(window.localStorage.getItem).toHaveBeenCalledWith(primaryColorKey)
    expect(result.current.primaryColor).toBe(storedColor)
    expect(window.localStorage.setItem).toHaveBeenCalledWith(primaryColorKey, storedColor)
    expect(result.current.theme.colorSchemes.light.palette.primary.main).toBe(storedColor)
  })

  test('handleChangePrimaryColor deve atualizar a cor primária, localStorage e o tema', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    const newColor = '#abcdef'

    act(() => {
      result.current.handleChangePrimaryColor(newColor)
    })

    expect(result.current.primaryColor).toBe(newColor)
    expect(window.localStorage.setItem).toHaveBeenCalledWith(primaryColorKey, newColor)
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(2)
    expect(result.current.theme.colorSchemes.light.palette.primary.main).toBe(newColor)
    expect(result.current.theme.colorSchemes.dark.palette.primary.main).toBe(newColor)
    expect(result.current.theme.colorSchemes.light.palette.primary.light).toBe(
      lighten(newColor, 0.5),
    )
    expect(result.current.theme.colorSchemes.dark.palette.primary.dark).toBe(darken(newColor, 0.5))
  })

  test('deve prover a função handleChangePrimaryColor no contexto', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(typeof result.current.handleChangePrimaryColor).toBe('function')
  })

  test('o tema deve ter as configurações de MuiCssBaseline e shape corretas', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.theme.components.MuiCssBaseline.styleOverrides.html.scrollBehavior).toBe(
      'smooth',
    )
    expect(result.current.theme.shape.borderRadius).toBe(16)
  })

  test('o tema deve usar defaultMode "dark" no ThemeProvider do MUI', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.theme.colorSchemes.light).toBeDefined()
    expect(result.current.theme.colorSchemes.dark).toBeDefined()
    expect(result.current.theme.colorSchemes.dark.palette.background.default).toBe('#121212')
  })
})
