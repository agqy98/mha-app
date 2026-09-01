import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { AppThemeProvider } from './theme/AppThemeProvider.tsx'
import AppRouter from './routes/AppRouter.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider>
      <AppRouter />
    </AppThemeProvider>
  </StrictMode>,
)
