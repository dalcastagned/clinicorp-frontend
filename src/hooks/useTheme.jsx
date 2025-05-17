import { createTheme, darken, lighten, ThemeProvider } from '@mui/material'
import { createContext, useContext, useMemo, useState } from 'react'
import { primaryColorsArray } from '../utils/colors'

const ThemeContext = createContext({
  theme: createTheme(),
  primaryColor: primaryColorsArray[primaryColorsArray.length - 1],
  handleChangePrimaryColor: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProviderCustom = ({ children }) => {
  const primaryColorKey = 'mui-color-scheme-primary-color'
  const [primaryColor, setPrimaryColor] = useState(() => {
    const color = localStorage.getItem(primaryColorKey)
    return color || primaryColorsArray[primaryColorsArray.length - 1]
  })

  const handleChangePrimaryColor = color => {
    setPrimaryColor(color)
  }

  const theme = useMemo(() => {
    localStorage.setItem(primaryColorKey, primaryColor)

    return createTheme({
      colorSchemes: {
        light: {
          palette: {
            primary: {
              light: lighten(primaryColor, 0.5),
              main: primaryColor,
              dark: darken(primaryColor, 0.5),
            },
            background: {
              default: '#dcdcdc',
              paper: '#dcdcdc',
            },
          },
        },
        dark: {
          palette: {
            primary: {
              light: lighten(primaryColor, 0.5),
              main: primaryColor,
              dark: darken(primaryColor, 0.5),
            },
            background: {
              default: '#121212',
              paper: lighten('#121212', 0.1),
            },
          },
        },
      },
      cssVariables: {
        colorSchemeSelector: 'class',
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            html: {
              scrollBehavior: 'smooth',
              height: '100dvh',
              margin: 0,
              '& .MuiTypography-root': {
                textTransform: 'none',
              },
              '& .MuiFormHelperText-root': {
                marginLeft: 0,
              },
              '& .MuiButton-root': {
                fontSize: 14,
                textTransform: 'none',
                height: 40,
              },
              '& .MuiTab-root': {
                fontSize: 14,
                textTransform: 'none',
              },
              '.pac-container': {
                zIndex: 10000,
              },
            },
            body: {
              margin: 0,
              height: '100dvh',
            },
          },
        },
      },
      shape: {
        borderRadius: 16,
      },
    })
  }, [primaryColor])

  return (
    <ThemeContext.Provider value={{ theme, primaryColor, handleChangePrimaryColor }}>
      <ThemeProvider theme={theme} defaultMode='dark'>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
