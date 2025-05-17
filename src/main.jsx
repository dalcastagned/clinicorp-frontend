import { CssBaseline } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProviderCustom } from './hooks/useTheme.jsx'
import { Routes } from './routes/index.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProviderCustom>
        <>
          <CssBaseline />
          <Routes />
        </>
      </ThemeProviderCustom>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
