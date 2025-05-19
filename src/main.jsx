import { CssBaseline } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProviderCustom } from './hooks/useTheme.jsx'
import { Routes } from './routes/index.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProviderCustom>
        <Toaster
          position='top-right'
          toastOptions={{
            duration: 1500,
          }}
          containerStyle={{
            top: 80,
          }}
        />
        <>
          <CssBaseline />
          <Routes />
        </>
      </ThemeProviderCustom>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
